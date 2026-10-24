import { Animated, Image, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

// Gatinho triste (assets/image/GatoEnglishTriste.jpg), mostrado quando o
// jogador tenta sair no meio da cruzadinha. Proporção original: 458x598.
export default function CatSad({ size = 200 }: { size?: number }) {
  const floatY = useRef(new Animated.Value(0)).current;
  const tilt = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const swayX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(floatY, {
            toValue: -24,
            duration: 1500,
            useNativeDriver: true
          }),
          Animated.timing(floatY, {
            toValue: 16,
            duration: 1500,
            useNativeDriver: true
          }),
          Animated.timing(floatY, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: true
          })
        ]),
        Animated.sequence([
          Animated.timing(tilt, {
            toValue: -12,
            duration: 1800,
            useNativeDriver: true
          }),
          Animated.timing(tilt, {
            toValue: 7,
            duration: 1700,
            useNativeDriver: true
          }),
          Animated.timing(tilt, {
            toValue: 0,
            duration: 1400,
            useNativeDriver: true
          })
        ]),
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 0.92,
            duration: 1400,
            useNativeDriver: true
          }),
          Animated.timing(scale, {
            toValue: 1.08,
            duration: 1700,
            useNativeDriver: true
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 1400,
            useNativeDriver: true
          })
        ]),
        Animated.sequence([
          Animated.timing(swayX, {
            toValue: -8,
            duration: 2000,
            useNativeDriver: true
          }),
          Animated.timing(swayX, {
            toValue: 8,
            duration: 2000,
            useNativeDriver: true
          }),
          Animated.timing(swayX, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true
          })
        ])
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [floatY, tilt, scale, swayX]);

  const rotate = tilt.interpolate({
    inputRange: [-12, 0, 7],
    outputRange: ["-12deg", "0deg", "7deg"]
  });

  return (
    <Animated.View
      accessible
      accessibilityLabel="Gatinho triste"
      style={[
        styles.box,
        {
          width: size * 0.77,
          height: size,
          transform: [{ translateY: floatY }, { translateX: swayX }, { rotate }, { scale }]
        }
      ]}
    >
      <Image
        source={require("../assets/image/GatoEnglishTriste.jpg")}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#f5eefa",
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4
  }
});
