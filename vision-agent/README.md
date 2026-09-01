# vision-agent

The AI language teacher: a voice-only [Vision Agents](https://visionagents.ai) service
that joins the Stream call the Expo app creates (`app/api/stream/call+api.ts`) and
speaks with the student using OpenAI's Realtime API (speech-to-speech, no separate
STT/TTS) over Stream's edge network.

The teacher always speaks English and teaches the selected language through English.
The language is parsed straight from the call id, e.g. `lesson-es-l1-user_abc123` →
Spanish, taught by "Luna" (see `LANGUAGES` in `main.py`, kept in sync with
`data/languages.ts` / `data/lessons.ts`). Unrecognized call ids fall back to Spanish.

## Setup

```bash
cd vision-agent
python3.12 -m venv .venv
source .venv/bin/activate
pip install "vision-agents[getstream,openai]" python-dotenv
```

(If you have [uv](https://docs.astral.sh/uv/) installed, `uv sync` reads
`pyproject.toml` and does the same thing.)

Copy `.env.example` to `.env` and fill in `OPENAI_API_KEY`. `STREAM_API_KEY` /
`STREAM_API_SECRET` are intentionally not duplicated here — `main.py` loads
them from the parent app's `../.env`.

## Run

```bash
source .venv/bin/activate
python main.py run          # console mode: joins a call, opens a demo UI link
python main.py serve        # HTTP server: POST /calls/{call_id}/sessions to start a session
```

`serve` is what the Expo app talks to in `app/api/agent-session+api.ts` (via the
server-only `VISION_AGENT_URL` env var, e.g. `http://localhost:8000`).
