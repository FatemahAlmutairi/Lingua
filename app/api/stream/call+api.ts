import { getLessonById } from "@/data/lessons";
import { getStreamServerClient, requireClerkUserId } from "@/lib/stream-server";

export async function POST(request: Request) {
  try {
    const userId = await requireClerkUserId(request);
    const body = await request.json().catch(() => null);
    const lessonId = typeof body?.lessonId === "string" ? body.lessonId : undefined;

    if (!lessonId) {
      return Response.json({ error: "lessonId is required" }, { status: 400 });
    }

    // Only confirm the lesson exists here — the full lesson content (goals, vocabulary,
    // phrases, AI teacher prompt) is packed into the call's custom data client-side, right
    // after joining (see app/lesson/[id].tsx), since the app already bundles this same
    // hardcoded lesson data locally.
    const lesson = getLessonById(lessonId);
    if (!lesson) {
      return Response.json({ error: "Unknown lessonId" }, { status: 404 });
    }

    const callType = "default";
    const callId = `lesson-${lesson.id}-${userId}`;

    const call = getStreamServerClient().video.call(callType, callId);
    await call.getOrCreate({
      data: {
        created_by_id: userId,
        members: [{ user_id: userId }],
      },
    });

    return Response.json({ callId, callType });
  } catch (err) {
    if (err instanceof Response) return err;
    console.error("Failed to create Stream call", err);
    return Response.json({ error: "Failed to create Stream call" }, { status: 500 });
  }
}
