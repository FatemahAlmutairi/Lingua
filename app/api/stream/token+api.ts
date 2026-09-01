import { getStreamServerClient, requireClerkUserId } from "@/lib/stream-server";

export async function GET(request: Request) {
  try {
    const userId = await requireClerkUserId(request);
    const apiKey = process.env.STREAM_API_KEY!;

    const token = getStreamServerClient().generateUserToken({
      user_id: userId,
      validity_in_seconds: 60 * 60 * 4,
    });

    return Response.json({ apiKey, token, userId });
  } catch (err) {
    if (err instanceof Response) return err;
    console.error("Failed to generate Stream token", err);
    return Response.json({ error: "Failed to generate Stream token" }, { status: 500 });
  }
}
