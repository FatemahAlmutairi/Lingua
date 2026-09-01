import { requireClerkUserId } from "@/lib/stream-server";

/** Server-only: keeps the vision-agent service's address off the client. */
function getVisionAgentUrl(): string {
  const url = process.env.VISION_AGENT_URL;
  if (!url) {
    throw new Response("Add VISION_AGENT_URL to your .env file", { status: 500 });
  }
  return url;
}

export async function POST(request: Request) {
  try {
    await requireClerkUserId(request);
    const body = await request.json().catch(() => null);
    const callId = typeof body?.callId === "string" ? body.callId : undefined;
    const callType = typeof body?.callType === "string" ? body.callType : "default";

    if (!callId) {
      return Response.json({ error: "callId is required" }, { status: 400 });
    }

    const response = await fetch(`${getVisionAgentUrl()}/calls/${encodeURIComponent(callId)}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ call_type: callType }),
    });

    if (!response.ok) {
      const detail = await response.json().catch(() => null);
      return Response.json(
        { error: detail?.detail ?? "Failed to start agent session" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return Response.json({ sessionId: data.session_id, callId: data.call_id });
  } catch (err) {
    if (err instanceof Response) return err;
    console.error("Failed to start agent session", err);
    return Response.json({ error: "Failed to start agent session" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireClerkUserId(request);
    const body = await request.json().catch(() => null);
    const callId = typeof body?.callId === "string" ? body.callId : undefined;
    const sessionId = typeof body?.sessionId === "string" ? body.sessionId : undefined;

    if (!callId || !sessionId) {
      return Response.json({ error: "callId and sessionId are required" }, { status: 400 });
    }

    const response = await fetch(
      `${getVisionAgentUrl()}/calls/${encodeURIComponent(callId)}/sessions/${encodeURIComponent(sessionId)}`,
      { method: "DELETE" },
    );

    if (!response.ok && response.status !== 404) {
      return Response.json({ error: "Failed to stop agent session" }, { status: response.status });
    }

    return Response.json({ ok: true });
  } catch (err) {
    if (err instanceof Response) return err;
    console.error("Failed to stop agent session", err);
    return Response.json({ error: "Failed to stop agent session" }, { status: 500 });
  }
}
