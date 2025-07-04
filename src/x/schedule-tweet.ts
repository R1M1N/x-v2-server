import { scheduleJob } from "node-schedule";
import { TwitterService } from './services.js';

export async function scheduleTweet(text: string, runAt: string) {
  const date = new Date(runAt);
  if (isNaN(date.valueOf())) {
    throw new Error("Invalid runAt timestamp");
  }
  const twitterService = TwitterService.getInstance();
  scheduleJob(date, async () => {
    try {
      await twitterService.postTweet(text);
    } catch (e) {
      console.error("Scheduled tweet failed:", e);
    }
  });
  return { success: true, scheduledFor: runAt };
}
