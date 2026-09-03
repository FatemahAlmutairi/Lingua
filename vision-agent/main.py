import asyncio
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
    "in English, then stop and wait for the student to repeat it back before moving on."
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
        "This is a live back-and-forth conversation, not a monologue or a script to recite. "
        "Say ONE short thing — a single word, a single question, or a single correction — and "
        "then STOP TALKING and wait for the student to respond out loud. Never chain multiple "
        "vocabulary words, phrases, or explanations together in one turn, and never move on to "
        "the next word until the student has actually said something back.\n\n"
        "When the student responds, actually react to what they said before doing anything "
        "else: if they got it right, acknowledge it specifically and naturally (not a canned "
        "'great job' every time); if they mispronounced or misused it, repeat the correct form "
        "slowly and ask them to try again; if they said something unrelated or confused, address "
        "that directly instead of pushing ahead with your plan. Only introduce the next word or "
        "phrase once the current one has been practiced.\n\n"
        "Keep every turn short and conversational, like a real tutor speaking out loud — no "
        "markdown, lists, or special characters. Be patient and encouraging, and treat silence "
        "from the student as them still thinking, not as your cue to keep talking."
    )


class CaptionBroadcaster:
    """Wraps the agent's Stream Chat conversation so every transcript delta ALSO goes out
    as a call custom event, alongside (not instead of) the normal chat sync.

    The SDK's StreamConversation persists each delta with its own REST call to Stream Chat,
    and those calls are serialized one at a time per channel (see
    StreamConversation._sync_with_lock in the vision_agents package) — on fast speech, a
    slow update blocks every update behind it, so captions built from chat messages
    visibly fall further behind the longer a sentence runs. Call custom events go out over
    the call's own connection instead, fired independently per delta, so nothing queues.
    """

    def __init__(self, conversation, agent: Agent):
        self._conversation = conversation
        self._agent = agent
        self._seq = 0
        # asyncio only holds a weak reference to a task started via create_task,
        # so without keeping a strong reference here the task can be garbage
        # collected mid-flight; the done callback prunes it once it finishes.
        self._background_tasks: set[asyncio.Task] = set()

    def __getattr__(self, name):
        return getattr(self._conversation, name)

    async def upsert_message(self, **kwargs):
        message = await self._conversation.upsert_message(**kwargs)
        self._seq += 1
        task = asyncio.create_task(
            self._broadcast(message, kwargs.get("completed", True), self._seq)
        )
        self._background_tasks.add(task)
        task.add_done_callback(self._background_tasks.discard)
        return message

    async def _broadcast(self, message, completed: bool, seq: int) -> None:
        try:
            await self._agent.send_custom_event(
                {
                    "type": "caption",
                    "message_id": message.id,
                    "speaker_id": message.user_id,
                    "text": message.content,
                    "completed": completed,
                    # Concurrent sends can resolve out of order — the client drops any
                    # event whose seq is behind what it already rendered for this message.
                    "seq": seq,
                }
            )
        except Exception:
            logger.warning("Failed to broadcast caption event", exc_info=True)


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
        # Rebind onto the wrapper on both consumers — `agent.join()` already set the raw
        # StreamConversation on each a moment ago, and both just store the reference, so
        # calling their setters again is safe.
        agent.conversation = CaptionBroadcaster(agent.conversation, agent)
        agent._flow.set_conversation(agent.conversation)
        agent.llm.set_conversation(agent.conversation)

        greeting = (
            f"Greet the student now using this introduction, then stop talking and wait for "
            f"them to respond before teaching anything else: {intro_message}"
            if intro_message
            else "Greet the student, ask if they're ready to start, then stop talking and wait "
            "for them to respond."
        )
        await agent.simple_response(text=greeting)
        await agent.finish()


runner = Runner(AgentLauncher(create_agent=create_agent, join_call=join_call))


if __name__ == "__main__":
    runner.cli()
