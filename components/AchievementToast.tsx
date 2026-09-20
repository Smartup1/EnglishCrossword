import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

export type Toast = { id: number; title: string; subtitle: string };

type Props = {
  /** Aviso a mostrar. null = escondido. */
  toast: Toast | null;
  onDone: () => void;
};

/** Aviso que desce do topo (subiu de nível, meta do dia cumprida...). */
export default function AchievementToast({ toast, onDone }: Props) {
  const slide = useRef(new Animated.Value(0)).current;
  const id = toast?.id;

  useEffect(() => {
    if (id === undefined) return;

    slide.setValue(0);
    const animation = Animated.sequence([
      Animated.spring(slide, {
        toValue: 1,
        friction: 6,
        tension: 90,
        useNativeDriver: true
      }),
      Animated.delay(2400),
      Animated.timing(slide, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      })
    ]);
    animation.start(({ finished }) => {
      if (finished) onDone();
    });

    return () => animation.stop();
  }, [id, slide, onDone]);

  if (!toast) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.toast,
        {
          opacity: slide,
          transform: [
            { translateY: slide.interpolate({ inputRange: [0, 1], outputRange: [-70, 0] }) },
            { scale: slide.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) }
          ]
        }
      ]}
    >
      <Text style={styles.title}>{toast.title}</Text>
      <Text style={styles.subtitle}>{toast.subtitle}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    backgroundColor: "#182033",
    borderWidth: 2,
    borderColor: "#facc15",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 26,
    alignItems: "center"
  },
  title: {
    color: "#facc15",
    fontWeight: "900",
    fontSize: 17,
    letterSpacing: 1
  },
  subtitle: {
    color: "#e2e8f0",
    fontWeight: "700",
    fontSize: 13,
    marginTop: 2,
    textAlign: "center"
  }
});
