import { ReactNode, useEffect, useRef } from "react";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Lexi, { LexiMood } from "./Lexi";

type Action = { label: string; onPress: () => void };

type Props = {
  visible: boolean;
  mood?: LexiMood;
  /** Se informado, aparece no lugar da Lexi (ex.: o gatinho). */
  art?: ReactNode;
  title: string;
  message: string;
  primary: Action;
  secondary?: Action;
  /** Botão "voltar" do Android. */
  onRequestClose: () => void;
};

export default function LexiModal({
  visible,
  mood = "sad",
  art,
  title,
  message,
  primary,
  secondary,
  onRequestClose
}: Props) {
  // A Lexi "pula" para dentro da tela toda vez que o modal abre.
  const scale = useRef(new Animated.Value(0.6)).current;
  useEffect(() => {
    if (!visible) return;
    scale.setValue(0.6);
    Animated.spring(scale, { toValue: 1, friction: 5, tension: 90, useNativeDriver: true }).start();
  }, [visible, scale]);

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Animated.View style={{ transform: [{ scale }] }}>
            {art ?? <Lexi mood={mood} size={190} />}
          </Animated.View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity activeOpacity={0.8} style={styles.primary} onPress={primary.onPress}>
            <Text style={styles.primaryText}>{primary.label}</Text>
          </TouchableOpacity>

          {secondary && (
            <TouchableOpacity activeOpacity={0.7} style={styles.secondary} onPress={secondary.onPress}>
              <Text style={styles.secondaryText}>{secondary.label}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.75)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  card: {
    backgroundColor: "#182033",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    gap: 6
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "900", textAlign: "center" },
  message: { color: "#94a3b8", fontSize: 15, textAlign: "center", lineHeight: 21 },
  primary: {
    backgroundColor: "#facc15",
    paddingVertical: 14,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    marginTop: 14
  },
  primaryText: { color: "#101522", fontWeight: "900", letterSpacing: 1 },
  secondary: {
    paddingVertical: 12,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
    marginTop: 4
  },
  secondaryText: { color: "#94a3b8", fontWeight: "700" }
});
