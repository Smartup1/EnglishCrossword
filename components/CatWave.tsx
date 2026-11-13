import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View } from "react-native";

// Gatinho acenando (assets/video/gato.mp4). O vídeo tem fundo branco, então ele
// aparece como um "adesivo" arredondado em cima do card escuro.
export default function CatWave({ size = 200 }: { size?: number }) {
  const player = useVideoPlayer(require("../assets/video/gato.mp4"), (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  return (
    <View
      accessible
      accessibilityLabel="Gatinho dando tchau"
      style={[styles.box, { width: size, height: size }]}
    >
      <VideoView
        player={player}
        nativeControls={false}
        contentFit="cover"
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderRadius: 24, overflow: "hidden", backgroundColor: "#fff", marginTop: 12 }
});
