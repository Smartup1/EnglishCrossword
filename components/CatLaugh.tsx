import LottieView from "lottie-react-native";
import { View } from "react-native";

// Gato gargalhando: a emoção de alegria do jogo (palavra e cruzadinha completas).
// A animação original é um quadrado de 500×500 com o gato ocupando só uma faixa
// no meio; aqui a área vazia é cortada para ele aparecer grande na tela.
const SRC = 500;
const CROP = { x: 40, y: 160, w: 420, h: 236 };

export default function CatLaugh({ width = 220 }: { width?: number }) {
  const k = width / CROP.w;
  return (
    <View
      accessible
      accessibilityLabel="Gato gargalhando"
      style={{ width, height: CROP.h * k, overflow: "hidden", alignSelf: "center" }}
    >
      <LottieView
        source={require("../assets/lottie/cat_laugh.json")}
        autoPlay
        loop
        style={{
          position: "absolute",
          width: SRC * k,
          height: SRC * k,
          left: -CROP.x * k,
          top: -CROP.y * k
        }}
      />
    </View>
  );
}
