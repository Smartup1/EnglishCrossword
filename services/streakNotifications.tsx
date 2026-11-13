import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const SCHEDULED_ID_KEY = "@englishcrossword/streak-notification-id";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/** Agenda um lembrete diário sem apagar notificações de outras funcionalidades. */
export async function scheduleStreakReminder(): Promise<void> {
  try {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("streak-reminders", {
        name: "Ofensiva diária",
        importance: Notifications.AndroidImportance.DEFAULT,
        sound: "default",
      });
    }

    const permission = await Notifications.getPermissionsAsync();
    let granted = permission.granted;

    if (!granted && permission.canAskAgain) {
      granted = (await Notifications.requestPermissionsAsync()).granted;
    }
    if (!granted) return;

    const previousId = await AsyncStorage.getItem(SCHEDULED_ID_KEY);
    if (previousId) {
      await Notifications.cancelScheduledNotificationAsync(previousId).catch(() => undefined);
    }

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔥 Não perca sua ofensiva!",
        body: "Pratique inglês hoje e mantenha sua sequência no EnglishCrossword.",
        sound: "default",
        data: { type: "streak-reminder" },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 19,
        minute: 0,
        ...(Platform.OS === "android" ? { channelId: "streak-reminders" } : {}),
      },
    });

    await AsyncStorage.setItem(SCHEDULED_ID_KEY, id);
  } catch (error) {
    // Uma falha de notificação não deve impedir a abertura do jogo.
    console.warn("Não foi possível configurar o lembrete de ofensiva:", error);
  }
}
