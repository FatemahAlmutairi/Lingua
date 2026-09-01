/** Stream user id for the AI teacher. Must match `agent_user.id` in vision-agent/main.py. */
export const AI_TEACHER_USER_ID = "ai-teacher";

export type StreamSession = {
  apiKey: string;
  token: string;
  userId: string;
};

export type StreamLessonCall = {
  callId: string;
  callType: string;
};

export type AgentSession = {
  sessionId: string;
  callId: string;
};

type GetToken = () => Promise<string | null>;

async function authedFetch(path: string, getToken: GetToken, init?: RequestInit) {
  const jwt = await getToken();
  if (!jwt) {
    throw new Error("Not signed in");
  }

  const response = await fetch(path, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `Request to ${path} failed (${response.status})`);
  }

  return response.json();
}

export async function fetchStreamSession(getToken: GetToken): Promise<StreamSession> {
  return authedFetch("/api/stream/token", getToken);
}

export async function fetchLessonCall(getToken: GetToken, lessonId: string): Promise<StreamLessonCall> {
  return authedFetch("/api/stream/call", getToken, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId }),
  });
}

/** Starts the AI teacher joining the given call. Callers should treat failure as
 * non-fatal — the lesson can continue without the agent. */
export async function startAgentSession(
  getToken: GetToken,
  callId: string,
  callType: string,
): Promise<AgentSession> {
  return authedFetch("/api/agent-session", getToken, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callId, callType }),
  });
}

export async function stopAgentSession(getToken: GetToken, callId: string, sessionId: string): Promise<void> {
  await authedFetch("/api/agent-session", getToken, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callId, sessionId }),
  });
}
