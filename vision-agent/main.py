import logging
from pathlib import Path

from dotenv import load_dotenv
from getstream.models import MemberRequest
from vision_agents.core import Agent, Runner, User
from vision_agents.core.agents import AgentLauncher
from vision_agents.core.instructions import Instructions
from vision_agents.plugins import gemini, getstream

# Load this service's own secrets (OPENAI_API_KEY) first, then fall back to
# the parent Expo app's .env, which already holds STREAM_API_KEY /
# STREAM_API_SECRET — reused here instead of duplicated.
load_dotenv(Path(__file__).resolve().parent / ".env")
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

logger = logging.getLogger(__name__)

# Fallback only — used if a call is ever started without the custom data that
# app/lesson/[id].tsx normally attaches right after joining (lessonTitle,
# languageName, teacherName, goals, vocabulary, phrases, systemPrompt, introMessage).
DEFAULT_LANGUAGE_NAME = "Spanish"
DEFAULT_SYSTEM_PROMPT = (
    "You are a warm and encouraging AI language teacher. You always speak English, and you "
    "teach through English: introduce one new word or phrase at a time, explain what it means "
    "in English, then ask the student to repeat it back before moving on."
)


def build_instructions(custom: dict) -> str:
    """Turns the lesson data packed into the call's custom fields (see
    app/lesson/[id].tsx) into the AI teacher's system prompt."""
    lesson_title = custom.get("lessonTitle") or "today's lesson"
    language_name = custom.get("languageName") or DEFAULT_LANGUAGE_NAME
    system_prompt = custom.get("systemPrompt") or DEFAULT_SYSTEM_PROMPT

    goals = custom.get("goals") or []
    vocabulary = custom.get("vocabulary") or []
    phrases = custom.get("phrases") or []

    goal_lines = "\n".join(f"- {g.get('description')}" for g in goals if g.get("description"))
    vocab_lines = "\n".join(
        f"- {v.get('term')} = {v.get('translation')}" for v in vocabulary if v.get("term")
    )
    phrase_lines = "\n".join(
        f"- {p.get('phrase')} = {p.get('translation')}" for p in phrases if p.get("phrase")
    )

    return (
        f"{system_prompt}\n\n"
        "This is a voice-only conversation with no video, so never refer to gestures, "
        "images, or anything visual.\n\n"
        f"Today's lesson is \"{lesson_title}\" ({language_name}). Your goals for this session:\n"
        f"{goal_lines or '- Have a natural practice conversation'}\n\n"
        f"Vocabulary to teach:\n{vocab_lines or '- (none provided — improvise from the goals above)'}\n\n"
        f"Key phrases to practice:\n{phrase_lines or '- (none provided)'}\n\n"
        "Introduce one new word or phrase at a time, explain what it means in English, then ask "
        "the student to repeat it back before moving on. Keep replies short and conversational, "
        "like a real tutor speaking out loud — no markdown, lists, or special characters. Be "
        "patient and encouraging: if the student mispronounces or misuses something, gently "
        "correct them in English and repeat the correct form."
    )


async def create_agent(**kwargs) -> Agent:
    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name="AI Language Teacher", id="ai-teacher"),
        instructions=DEFAULT_SYSTEM_PROMPT,
        # Realtime handles speech in and out directly — zero stt/tts config. Its default
        # config is audio-only (response_modalities=[AUDIO]), so no video is ever sent.
        # Reads GOOGLE_API_KEY from the environment.
        llm=gemini.Realtime(),
    )


async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    call = await agent.create_call(call_type, call_id)

    # Explicitly re-fetch rather than trusting create_call()'s snapshot — the student writes
    # the lesson context onto the call (via call.update()) right after joining, which can
    # happen after this service's own get_or_create, so we re-read before building instructions.
    call_response = await call.get()
    custom = call_response.data.call.custom or {}

    # The LLM snapshots instructions when the Agent is constructed, before we know which
    # lesson we're joining — re-set them now that the call's custom data tells us the
    # lesson, language, and teacher persona.
    instructions = build_instructions(custom)
    agent.instructions = Instructions(input_text=instructions)
    agent.llm.set_instructions(agent.instructions)

    # Grant the agent's own user the "admin" call role. This is a no-op capability-wise on
    # the "default" call type (already permissive), but is what would let the agent publish
    # audio and bypass backstage if the call type is ever switched to something more
    # restrictive, like "audio_room".
    try:
        await call.update_call_members(
            update_members=[MemberRequest(user_id=agent.agent_user.id, role="admin")]
        )
    except Exception:
        logger.warning("Failed to grant admin role on call %s", call_id, exc_info=True)

    # Similarly a no-op for "default" (which isn't backstage-gated); needed for call types
    # like "audio_room" where nothing is heard until the call goes live.
    try:
        await call.go_live()
    except Exception:
        logger.warning("Failed to go live on call %s — it may already be live", call_id, exc_info=True)

    intro_message = custom.get("introMessage")

    # participant_wait_timeout covers both cases: if the student is already
    # in the call it returns immediately, otherwise it waits (up to the
    # timeout) for them to join before the agent starts talking.
    async with agent.join(call, participant_wait_timeout=60.0):
        greeting = (
            f"Greet the student now using this introduction: {intro_message}"
            if intro_message
            else "Greet the student and start today's lesson."
        )
        await agent.simple_response(text=greeting)
        await agent.finish()


runner = Runner(AgentLauncher(create_agent=create_agent, join_call=join_call))


if __name__ == "__main__":
    runner.cli()
