import { Animated, Image, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

// Gatinho triste (assets/image/GatoEnglishTriste.jpg), mostrado quando o
// jogador tenta sair no meio da cruzadinha. Proporção original: 458x598.
export default function CatSad({ size = 200 }: { size?: number }) {
  const floatY = useRef(new Animated.Value(0)).current;
  const tilt = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(floatY, {
            toValue: -10,
            duration: 1200,
            useNativeDriver: true
          }),
          Animated.timing(floatY, {
            toValue: 8,
            duration: 1200,
            useNativeDriver: true
          }),
          Animated.timing(floatY, {
            toValue: 0,
            duration: 900,
            useNativeDriver: true
          })
        ]),
        Animated.sequence([
          Animated.timing(tilt, {
            toValue: -4,
            duration: 1400,
            useNativeDriver: true
          }),
          Animated.timing(tilt, {
            toValue: 4,
            duration: 1400,
            useNativeDriver: true
          }),
          Animated.timing(tilt, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
          })
        ])
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [floatY, tilt]);

  const rotate = tilt.interpolate({
    inputRange: [-4, 0, 4],
    outputRange: ["-3deg", "0deg", "3deg"]
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
          transform: [{ translateY: floatY }, { rotate }]
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
  box: { borderRadius: 24, overflow: "hidden", backgroundColor: "#f5eefa", marginTop: 12 }
});
