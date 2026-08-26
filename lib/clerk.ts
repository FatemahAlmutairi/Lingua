import type { useClerk } from "@clerk/expo";

/**
 * Clerk rejects any new sign-up/sign-in/SSO attempt with `session_exists` if a session is
 * already present on the device, even if it was never activated (e.g. an interrupted flow).
 * Signing out clears that stale session so the user's retry succeeds.
 */
export async function resolveClerkAuthError(
  err: unknown,
  signOut: ReturnType<typeof useClerk>["signOut"]
): Promise<string> {
  const clerkError = err as { code?: string; longMessage?: string; message?: string } | undefined;

  if (clerkError?.code === "session_exists") {
    await signOut();
    return "You were still signed in from a previous session. Please try again.";
  }

  return clerkError?.longMessage ?? clerkError?.message ?? "Something went wrong. Please try again.";
}
