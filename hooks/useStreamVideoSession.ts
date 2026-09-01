import { fetchStreamSession } from "@/lib/stream";
import { useAuth, useUser } from "@clerk/expo";
import { StreamVideoClient, type User } from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";

/**
 * Creates the app-wide Stream Video client for the signed-in Clerk user. The token comes
 * from /api/stream/token, which derives the Stream user id from the Clerk session itself
 * (never a client-supplied id) — see lib/stream-server.ts.
 */
export function useStreamVideoSession() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [client, setClient] = useState<StreamVideoClient>();
  const [error, setError] = useState<string>();

  const userId = user?.id;

  useEffect(() => {
    if (!user || !userId) return;

    let cancelled = false;
    let current: StreamVideoClient | undefined;

    (async () => {
      try {
        const session = await fetchStreamSession(getToken);
        if (cancelled) return;

        const streamUser: User = {
          id: session.userId,
          name: user.fullName ?? user.username ?? session.userId,
          image: user.imageUrl,
        };

        const tokenProvider = async () => (await fetchStreamSession(getToken)).token;

        current = StreamVideoClient.getOrCreateInstance({
          apiKey: session.apiKey,
          user: streamUser,
          token: session.token,
          tokenProvider,
        });
        setClient(current);
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to start Stream Video session", err);
          setError(err instanceof Error ? err.message : "Failed to connect");
        }
      }
    })();

    return () => {
      cancelled = true;
      current?.disconnectUser().catch((err) => console.error(err));
      setClient(undefined);
    };
    // Re-run only when the signed-in user actually changes — `user` and `getToken` are
    // read fresh inside the effect, not tracked, to avoid reconnecting on every re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return { client, error };
}
