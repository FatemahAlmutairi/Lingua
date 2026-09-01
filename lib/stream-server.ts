import { verifyToken } from "@clerk/backend";
import { StreamClient } from "@stream-io/node-sdk";

let serverClient: StreamClient | undefined;

/** Server-only Stream client. Never import this file from client code. */
export function getStreamServerClient() {
  if (!serverClient) {
    const apiKey = process.env.STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new Error("Add STREAM_API_KEY and STREAM_API_SECRET to your .env file");
    }

    serverClient = new StreamClient(apiKey, apiSecret);
  }

  return serverClient;
}

/**
 * Derives the Stream user id from the request's own Clerk session token, never from a
 * client-supplied param — a client-supplied user id would let any signed-in user mint a
 * token or join a call as anyone else.
 */
export async function requireClerkUserId(request: Request): Promise<string> {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : undefined;
  const secretKey = process.env.CLERK_SECRET_KEY;

  if (!token || !secretKey) {
    throw new Response("Unauthorized", { status: 401 });
  }

  try {
    const verified = await verifyToken(token, { secretKey });
    return verified.sub;
  } catch {
    throw new Response("Unauthorized", { status: 401 });
  }
}
