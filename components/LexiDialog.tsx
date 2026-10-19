import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Lexi, { LexiMood } from "./Lexi";

export type LexiDialogType =
  | "timeoutCoins"
  | "timeoutNoCoins"
  | "exit";

type Props = {
  visible: boolean;
  type: LexiDialogType;
  coins?: number;
  timeoutCost?: number;
  onPrimary: () => void;
  onSecondary?: () => void;
};

export default function LexiDialog({
  visible,
  type,
  coins = 0,
  timeoutCost = 5,
  onPrimary,
  onSecondary
}: Props) {
  if (!visible) return null;

  const config: Record<
    LexiDialogType,
    {
      mood: LexiMood;
      title: string;
      message: string;
      primary: string;
      secondary?: string;
    }
  > = {
    timeoutCoins: {
      mood: "crying",
      title: "Ops! 😢",
      message: `Cruzadinha reembaralhada, -${timeoutCost} 🪙`,
      primary: "Tentar de novo"
    },

    timeoutNoCoins: {
      mood: "crying",
      title: "Tempo esgotado! 😢",
      message: `Você precisa de ${timeoutCost} 🪙 para tentar novamente.`,
      primary: "Voltar ao início"
    },

    exit: {
      mood: "asking",
      title: "Já vai embora? 👀",
      message: "A cruzadinha ainda não terminou!",
      primary: "Continuar jogando",
      secondary: "Sair mesmo assim"
    }
  };

  const current = config[type];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onSecondary ?? onPrimary}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Lexi
            mood={current.mood}
            size={170}
          />

          <Text style={styles.title}>
            {current.title}
          </Text>

          <Text style={styles.message}>
            {current.message}
          </Text>

          {type === "timeoutCoins" && (
            <Text style={styles.balance}>
              Saldo restante: {coins} 🪙
            </Text>
          )}

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryButton}
            onPress={onPrimary}
          >
            <Text style={styles.primaryText}>
              {current.primary}
            </Text>
          </TouchableOpacity>

          {current.secondary && onSecondary && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.secondaryButton}
              onPress={onSecondary}
            >
              <Text style={styles.secondaryText}>
                {current.secondary}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.82)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },

  card: {
    width: "100%",
    maxWidth: 390,
    backgroundColor: "#182033",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10
    },
    elevation: 12
  },

  title: {
    color: "#ffffff",
    fontSize: 23,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 4
  },

  message: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 10
  },

  balance: {
    color: "#facc15",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 8
  },

  primaryButton: {
    width: "100%",
    backgroundColor: "#22c55e",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 22
  },

  primaryText: {
    color: "#052e16",
    fontSize: 15,
    fontWeight: "900"
  },

  secondaryButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10
  },

  secondaryText: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "800"
  }
});