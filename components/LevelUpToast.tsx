import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

type Props = {
  /** Nível alcançado. null = escondido. */
  level: number | null;
  onDone: () => void;
};

export default function LevelUpToast({ level, onDone }: Props) {
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (level === null) return;

    slide.setValue(0);
    const animation = Animated.sequence([
      Animated.spring(slide, {
        toValue: 1,
        friction: 6,
        tension: 90,
        useNativeDriver: true
      }),
      Animated.delay(2200),
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
  }, [level, slide, onDone]);

  if (level === null) return null;

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
      <Text style={styles.title}>🎉 LEVEL UP!</Text>
      <Text style={styles.subtitle}>You reached level {level}</Text>
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
    fontSize: 18,
    letterSpacing: 1
  },
  subtitle: {
    color: "#e2e8f0",
    fontWeight: "700",
    fontSize: 13,
    marginTop: 2
  }
});
