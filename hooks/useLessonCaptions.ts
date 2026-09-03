import type { Call } from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";

export type LiveCaption = {
  /** Stable per utterance (the first chunk's message id) so re-renders don't remount it. */
  id: string;
  speakerId: string;
  text: string;
};

/** Payload shape sent by CaptionBroadcaster in vision-agent/main.py. */
type CaptionEventPayload = {
  type?: string;
  message_id?: string;
  speaker_id?: string;
  text?: string;
  seq?: number;
};

/**
 * Listens for the AI teacher's realtime transcript, broadcast as call custom events (see
 * CaptionBroadcaster in vision-agent/main.py), and returns the 2 most recent captions,
 * updating live as each one grows word by word.
 *
 * Custom events ride the call's own connection instead of a separate Stream Chat channel —
 * cheaper to set up, and each delta is sent independently rather than queued behind the
 * previous one, so captions don't fall further and further behind on fast speech.
 */
export function useLessonCaptions(call: Call | undefined): LiveCaption[] {
  const [captions, setCaptions] = useState<LiveCaption[]>([]);

  useEffect(() => {
    if (!call) {
      setCaptions([]);
      return;
    }

    // Most recent 2 utterances, oldest first — mirrors Stream's own closed-caption queue.
    const order: string[] = [];
    const byId = new Map<string, LiveCaption>();
    // Concurrent, unserialized sends can resolve out of order — drop anything older than
    // what's already rendered for a given utterance.
    const lastSeq = new Map<string, number>();

    const unsubscribe = call.on("custom", (event) => {
      const payload = event.custom as CaptionEventPayload | undefined;
      if (payload?.type !== "caption") return;

      const { message_id: messageId, speaker_id: speakerId, text, seq } = payload;
      if (!messageId || !speakerId || !text) return;

      if (typeof seq === "number") {
        const lastSeenSeq = lastSeq.get(messageId) ?? -1;
        if (seq <= lastSeenSeq) return;
        lastSeq.set(messageId, seq);
      }

      byId.set(messageId, { id: messageId, speakerId, text });

      const existingIndex = order.indexOf(messageId);
      if (existingIndex !== -1) order.splice(existingIndex, 1);
      order.push(messageId);
      while (order.length > 2) {
        const evicted = order.shift()!;
        byId.delete(evicted);
        lastSeq.delete(evicted);
      }

      setCaptions(order.map((id) => byId.get(id)).filter((c): c is LiveCaption => !!c));
    });

    return () => {
      unsubscribe();
      setCaptions([]);
    };
  }, [call]);

  return captions;
}
