import { useEffect, useMemo, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions
} from "react-native";

/**
 * Confete feito só com Animated (sem dependências extras).
 * Muda o `burstKey` (1, 2, 3...) para disparar de novo. 0 = desligado.
 *
 * mode="burst": canhões que disparam para cima e caem com gravidade
 * mode="rain" : chuva de confete caindo do topo da tela
 */

export type ConfettiOrigin = {
  /** posição horizontal, de 0 a 1 (fração da largura) */
  x: number;
  /** posição vertical, de 0 a 1 (fração da altura) */
  y: number;
  /** direção do disparo em graus (-90 = para cima) */
  aim: number;
  /** abertura do cone em graus (360 = em todas as direções) */
  spread: number;
};

type Props = {
  burstKey: number;
  mode?: "burst" | "rain";
  count?: number;
  origins?: ConfettiOrigin[];
};

const COLORS = [
  "#facc15",
  "#22c55e",
  "#38bdf8",
  "#f472b6",
  "#a78bfa",
  "#fb923c",
  "#f8fafc"
];

const CORNER_CANNONS: ConfettiOrigin[] = [
  { x: 0.05, y: 1, aim: -62, spread: 30 },
  { x: 0.95, y: 1, aim: -118, spread: 30 }
];

const STEPS = 12; // quadros-chave por peça
const INPUT = Array.from({ length: STEPS }, (_, i) => i / (STEPS - 1));

type Piece = {
  t: Animated.Value;
  x: number[];
  y: number[];
  flip: number[];
  rotation: number;
  color: string;
  w: number;
  h: number;
  duration: number;
  delay: number;
  round: boolean;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const rad = (deg: number) => (deg * Math.PI) / 180;

function makePieces(
  mode: "burst" | "rain",
  count: number,
  width: number,
  height: number,
  origins: ConfettiOrigin[]
): Piece[] {
  return Array.from({ length: count }, (_, index) => {
    const xs: number[] = [];
    const ys: number[] = [];
    const flips: number[] = [];
    let duration: number;
    let delay: number;

    const flipSpeed = rand(2, 6);
    const flipPhase = rand(0, Math.PI * 2);

    if (mode === "burst") {
      const origin = origins[index % origins.length];
      const angle = rad(origin.aim + rand(-origin.spread / 2, origin.spread / 2));
      const speed = height * rand(0.85, 1.5);
      const drag = 2.2;
      const gravity = height * 1.15;
      duration = rand(1800, 2800);
      delay = rand(0, 180);
      const seconds = duration / 1000;
      const ox = origin.x * width;
      const oy = origin.y * height;

      INPUT.forEach(p => {
        const tau = seconds * p;
        const travel = (1 - Math.exp(-drag * tau)) / drag;
        xs.push(ox + Math.cos(angle) * speed * travel);
        ys.push(oy + Math.sin(angle) * speed * travel + 0.5 * gravity * tau * tau);
        flips.push(Math.max(0.15, Math.abs(Math.cos(flipPhase + flipSpeed * tau))));
      });
    } else {
      duration = rand(2600, 4200);
      delay = rand(0, 1400);
      const startX = rand(0, width);
      const sway = rand(14, 42);
      const swayFreq = rand(1, 2.5);
      const swayPhase = rand(0, Math.PI * 2);
      const seconds = duration / 1000;

      INPUT.forEach(p => {
        xs.push(startX + sway * Math.sin(swayPhase + swayFreq * Math.PI * 2 * p));
        ys.push(-30 + (height + 60) * p);
        flips.push(Math.max(0.15, Math.abs(Math.cos(flipPhase + flipSpeed * seconds * p))));
      });
    }

    return {
      t: new Animated.Value(0),
      x: xs,
      y: ys,
      flip: flips,
      rotation: rand(240, 900) * (Math.random() < 0.5 ? -1 : 1),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      w: rand(7, 12),
      h: rand(10, 18),
      duration,
      delay,
      round: Math.random() < 0.25
    };
  });
}

export default function Confetti({
  burstKey,
  mode = "burst",
  count = 60,
  origins = CORNER_CANNONS
}: Props) {
  const { width, height } = useWindowDimensions();
  const [finishedKey, setFinishedKey] = useState(0);

  // Gera peças novas a cada disparo.
  const pieces = useMemo(
    () => (burstKey > 0 ? makePieces(mode, count, width, height, origins) : []),
    // origins/width/height de propósito fora: só recomeça quando burstKey muda
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [burstKey]
  );

  useEffect(() => {
    if (burstKey === 0 || pieces.length === 0) return;

    const animations = pieces.map(piece =>
      Animated.timing(piece.t, {
        toValue: 1,
        duration: piece.duration,
        delay: piece.delay,
        easing: Easing.linear,
        useNativeDriver: true
      })
    );
    animations.forEach(a => a.start());

    const longest = Math.max(...pieces.map(p => p.duration + p.delay));
    const timer = setTimeout(() => setFinishedKey(burstKey), longest + 100);

    return () => {
      clearTimeout(timer);
      animations.forEach(a => a.stop());
    };
  }, [burstKey, pieces]);

  if (burstKey === 0 || finishedKey === burstKey) return null;

  return (
    <Animated.View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {pieces.map((piece, i) => (
        <Animated.View
          key={i}
          style={[
            styles.piece,
            {
              width: piece.w,
              height: piece.round ? piece.w : piece.h,
              borderRadius: piece.round ? piece.w / 2 : 2,
              backgroundColor: piece.color,
              opacity: piece.t.interpolate({
                inputRange: [0, 0.72, 1],
                outputRange: [1, 1, 0]
              }),
              transform: [
                {
                  translateX: piece.t.interpolate({
                    inputRange: INPUT,
                    outputRange: piece.x
                  })
                },
                {
                  translateY: piece.t.interpolate({
                    inputRange: INPUT,
                    outputRange: piece.y
                  })
                },
                {
                  rotate: piece.t.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", `${piece.rotation}deg`]
                  })
                },
                {
                  scaleY: piece.t.interpolate({
                    inputRange: INPUT,
                    outputRange: piece.flip
                  })
                }
              ]
            }
          ]}
        />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  piece: {
    position: "absolute",
    top: 0,
    left: 0
  }
});
