import { Image, StyleSheet, View } from "react-native";

// Gatinho triste (assets/image/GatoEnglishTriste.jpg), mostrado quando o
// jogador tenta sair no meio da cruzadinha. Proporção original: 458x598.
export default function CatSad({ size = 200 }: { size?: number }) {
  return (
    <View
      accessible
      accessibilityLabel="Gatinho triste"
      style={[styles.box, { width: size * 0.77, height: size }]}
    >
      <Image
        source={require("../assets/image/GatoEnglishTriste.jpg")}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderRadius: 24, overflow: "hidden", backgroundColor: "#f5eefa", marginTop: 12 }
});
