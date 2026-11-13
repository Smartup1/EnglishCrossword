import { Stack } from "expo-router";
import StreakNotificationSetup from "../components/StreakNotificationSetup";

export default function RootLayout() {
  return (
    <>
      <StreakNotificationSetup />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="game" />
      </Stack>
    </>
  );
}
