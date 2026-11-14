import { useEffect } from "react";
import { scheduleStreakReminder } from "../services/streakNotifications";

export default function StreakNotificationSetup() {
  useEffect(() => {
    void scheduleStreakReminder();
  }, []);

  return null;
}
