import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
  Text as SvgText
} from "react-native-svg";

/**
 * Lexi, a coruja mascote, desenhada em SVG e animada com Reanimated.
 *
 *  happy      respira/quica de leve e pisca
 *  think      balança a cabeça, com um "?" ao lado
 *  celebrate  pula com as asas para cima
 *  sad        chora: lágrimas escorrendo, corpinho balançando
 *  wave       acena de tchau com a asa direita
 */
export type LexiMood = "happy" | "think" | "celebrate" | "sad" | "wave";

const INK = "#2b2440";
const G1 = "#8fbb6b";
const G2 = "#a9cf85";
const G3 = "#dcebc2";
const G4 = "#6f9a4f";
const TEAR = "#cfe7f5";
const TEAR_EDGE = "#8fb9d4";

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const AnimatedPath = Animated.createAnimatedComponent(Path);

// Asa = elipse girada em volta do "ombro". Em vez de rotacionar o elemento SVG
// (que não é uma propriedade nativa animável), o contorno é recalculado a cada
// quadro: só a propriedade `d` do Path muda, e isso o Reanimated anima bem.
function wingPath(side: "L" | "R", deg: number): string {
  "worklet";
  const pcx = side === "L" ? 100 : 300;
  const pcy = 262;
  const cx = side === "L" ? 96 : 304;
  const cy = 296;
  const rx = 26;
  const ry = 62;
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  const tx = pcx + (cx - pcx) * c - (cy - ry - pcy) * s;
  const ty = pcy + (cx - pcx) * s + (cy - ry - pcy) * c;
  const bx = pcx + (cx - pcx) * c - (cy + ry - pcy) * s;
  const by = pcy + (cx - pcx) * s + (cy + ry - pcy) * c;
  return `M${tx} ${ty}A${rx} ${ry} ${deg} 1 1 ${bx} ${by}A${rx} ${ry} ${deg} 1 1 ${tx} ${ty}Z`;
}

type Motion = {
  bodyY: SharedValue<number>;
  bodyRot: SharedValue<number>;
  lid: SharedValue<number>;
  tearL: SharedValue<number>;
  tearR: SharedValue<number>;
  wingL: SharedValue<number>;
  wingR: SharedValue<number>;
};

function useLexiMotion(mood: LexiMood): Motion {
  const reduced = useReducedMotion();
  const bodyY = useSharedValue(0);
  const bodyRot = useSharedValue(0);
  const lid = useSharedValue(0);
  const tearL = useSharedValue(0);
  const tearR = useSharedValue(0);
  const wingL = useSharedValue(6);
  const wingR = useSharedValue(-6);

  useEffect(() => {
    const all = [bodyY, bodyRot, lid, tearL, tearR, wingL, wingR];
    all.forEach(cancelAnimation);
    bodyY.value = 0;
    bodyRot.value = 0;
    lid.value = 0;
    tearL.value = 0.5;
    tearR.value = 0.15;
    wingL.value = 6;
    wingR.value = -6;
    // Quem ativou "reduzir movimento" no celular vê a Lexi parada.
    if (reduced) return;

    const ease = Easing.inOut(Easing.quad);
    const yoyo = (to: number, duration: number) =>
      withRepeat(withTiming(to, { duration, easing: ease }), -1, true);

    // Pisca de vez em quando (só aparece nos olhos abertos).
    lid.value = withRepeat(
      withSequence(withDelay(2400, withTiming(38, { duration: 90 })), withTiming(0, { duration: 130 })),
      -1
    );

    if (mood === "happy") {
      bodyY.value = yoyo(-5, 900);
    } else if (mood === "think") {
      bodyRot.value = -4;
      bodyRot.value = yoyo(4, 1800);
    } else if (mood === "celebrate") {
      bodyY.value = withRepeat(
        withSequence(
          withTiming(-18, { duration: 280, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 280, easing: Easing.in(Easing.quad) })
        ),
        -1
      );
      wingL.value = 40;
      wingR.value = -40;
      wingL.value = yoyo(115, 280);
      wingR.value = yoyo(-115, 280);
    } else if (mood === "sad") {
      bodyRot.value = -2.5;
      bodyRot.value = yoyo(2.5, 1500);
      // soluço: um tremidinho de tempos em tempos
      bodyY.value = withRepeat(
        withSequence(
          withDelay(1300, withTiming(-5, { duration: 110 })),
          withTiming(0, { duration: 150 }),
          withTiming(-3, { duration: 110 }),
          withTiming(0, { duration: 150 })
        ),
        -1
      );
      const fall = () =>
        withRepeat(withTiming(1, { duration: 1700, easing: Easing.in(Easing.quad) }), -1);
      tearR.value = fall();
      tearL.value = withDelay(800, fall());
    } else if (mood === "wave") {
      bodyRot.value = -1.5;
      bodyRot.value = yoyo(1.5, 1400);
      wingR.value = -95;
      wingR.value = yoyo(-140, 340);
    }

    return () => all.forEach(cancelAnimation);
  }, [mood, reduced]);

  return { bodyY, bodyRot, lid, tearL, tearR, wingL, wingR };
}

function Eye({ cx, cy, dx = 0, dy = 0, lid }: { cx: number; cy: number; dx?: number; dy?: number; lid: SharedValue<number> }) {
  const lidProps = useAnimatedProps(() => ({ ry: lid.value }));
  return (
    <>
      <Ellipse cx={cx} cy={cy} rx={31} ry={35} fill={INK} />
      <Ellipse cx={cx + dx} cy={cy + dy} rx={25} ry={29} fill="url(#iris)" />
      <Circle cx={cx + dx - 9} cy={cy + dy - 12} r={9} fill="#fff" />
      <Circle cx={cx + dx + 10} cy={cy + dy + 11} r={4.5} fill="#fff" opacity={0.9} />
      <Circle cx={cx + dx + 13} cy={cy + dy - 4} r={2} fill="#fff" opacity={0.8} />
      {/* pálpebra: cresce por cima do olho e some, formando o piscar */}
      <AnimatedEllipse cx={cx} cy={cy} rx={34} ry={0} fill={G3} animatedProps={lidProps} />
    </>
  );
}

function ClosedEye({ cx, cy }: { cx: number; cy: number }) {
  return (
    <Path
      d={`M${cx - 24} ${cy + 6} Q${cx} ${cy - 26} ${cx + 24} ${cy + 6}`}
      fill="none"
      stroke={INK}
      strokeWidth={7}
      strokeLinecap="round"
    />
  );
}

function Brow({ d }: { d: string }) {
  return <Path d={d} fill="none" stroke={G4} strokeWidth={6} strokeLinecap="round" />;
}

function Tear({ x, t }: { x: number; t: SharedValue<number> }) {
  const props = useAnimatedProps(() => ({
    cy: 214 + t.value * 80,
    opacity: interpolate(t.value, [0, 0.12, 0.8, 1], [0, 1, 1, 0])
  }));
  return (
    <AnimatedEllipse cx={x} cy={214} rx={6} ry={9} fill={TEAR} stroke={TEAR_EDGE} strokeWidth={2} animatedProps={props} />
  );
}

const CONFETTI: [number, number, number, string][] = [
  [60, 60, 20, "#f4c430"], [120, 20, -15, "#e5566d"], [280, 24, 30, "#4aa3df"],
  [340, 70, -25, "#7bc86c"], [40, 150, 10, "#b07cd8"], [360, 150, -10, "#f4c430"],
  [200, 14, 45, "#e5566d"], [330, 10, 0, "#4aa3df"], [70, 10, 60, "#7bc86c"]
];

type Props = { mood?: LexiMood; size?: number };

export default function Lexi({ mood = "happy", size = 190 }: Props) {
  const m = useLexiMotion(mood);
  // Os shared values precisam ser variáveis soltas: dentro dos worklets, acessar
  // `m.bodyY.value` (objeto dentro de objeto) quebra no Reanimated 4.
  const { bodyY, bodyRot, wingL, wingR } = m;

  const bodyStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bodyY.value }, { rotate: `${bodyRot.value}deg` }]
  }));
  const wingLProps = useAnimatedProps(() => ({ d: wingPath("L", wingL.value) }));
  const wingRProps = useAnimatedProps(() => ({ d: wingPath("R", wingR.value) }));

  const closed = mood === "celebrate";
  const look: [number, number] = mood === "think" ? [6, -8] : mood === "sad" ? [0, 4] : [0, 0];

  const brows: [string, string] = {
    happy: ["M112 132 Q145 118 178 128", "M222 128 Q255 118 288 132"],
    think: ["M112 134 Q145 122 178 130", "M222 118 Q255 100 288 126"],
    celebrate: ["M114 136 Q146 120 178 130", "M222 130 Q254 120 286 136"],
    sad: ["M112 146 Q150 128 178 124", "M222 124 Q250 128 288 146"],
    wave: ["M112 144 Q148 130 178 126", "M222 126 Q252 130 288 144"]
  }[mood] as [string, string];

  return (
    <Animated.View
      style={[{ width: size, height: size }, bodyStyle]}
      accessible
      accessibilityLabel="Lexi, a coruja"
    >
      <Svg viewBox="0 0 400 400" width={size} height={size} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="iris" cx="45%" cy="40%" r="70%">
            <Stop offset="0" stopColor="#6fb1d8" />
            <Stop offset="1" stopColor="#22406e" />
          </RadialGradient>
          <LinearGradient id="beak" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#ffb04d" />
            <Stop offset="1" stopColor="#ee7d1f" />
          </LinearGradient>
        </Defs>

        {/* pés e corpo */}
        <Ellipse cx={165} cy={372} rx={20} ry={9} fill="#f08a24" />
        <Ellipse cx={235} cy={372} rx={20} ry={9} fill="#f08a24" />
        <Ellipse cx={200} cy={292} rx={102} ry={88} fill={G1} />
        <Ellipse cx={200} cy={306} rx={66} ry={70} fill={G3} />
        {[[170, 290], [200, 282], [230, 290], [185, 320], [215, 320], [200, 350]].map(([x, y]) => (
          <Path key={`${x}-${y}`} d={`M${x - 11} ${y} Q${x} ${y + 12} ${x + 11} ${y}`} fill="none" stroke={G2} strokeWidth={4} strokeLinecap="round" />
        ))}

        {/* asas animadas */}
        <AnimatedPath d={wingPath("L", 6)} fill={G4} animatedProps={wingLProps} />
        <AnimatedPath d={wingPath("R", -6)} fill={G4} animatedProps={wingRProps} />

        {/* orelhinhas e cabeça */}
        <Path d="M84 96 L96 40 L146 74 Z" fill={G4} stroke={G4} strokeWidth={8} strokeLinejoin="round" />
        <Path d="M316 96 L304 40 L254 74 Z" fill={G4} stroke={G4} strokeWidth={8} strokeLinejoin="round" />
        <Ellipse cx={200} cy={170} rx={134} ry={112} fill={G1} />
        {[[140, 88], [200, 74], [260, 88], [105, 130], [295, 130]].map(([x, y]) => (
          <Path key={`${x}-${y}`} d={`M${x - 10} ${y} Q${x} ${y - 9} ${x + 10} ${y}`} fill="none" stroke={G2} strokeWidth={4} strokeLinecap="round" />
        ))}
        <Ellipse cx={146} cy={176} rx={56} ry={58} fill={G3} />
        <Ellipse cx={254} cy={176} rx={56} ry={58} fill={G3} />
        <Circle cx={112} cy={222} r={14} fill="#f4a39a" opacity={0.45} />
        <Circle cx={288} cy={222} r={14} fill="#f4a39a" opacity={0.45} />

        {/* olhos e sobrancelhas */}
        {closed ? (
          <>
            <ClosedEye cx={146} cy={176} />
            <ClosedEye cx={254} cy={176} />
          </>
        ) : (
          <>
            <Eye cx={146} cy={176} dx={look[0]} dy={look[1]} lid={m.lid} />
            <Eye cx={254} cy={176} dx={look[0]} dy={look[1]} lid={m.lid} />
          </>
        )}
        <Brow d={brows[0]} />
        <Brow d={brows[1]} />

        {/* lágrimas */}
        {mood === "sad" && (
          <>
            <Tear x={130} t={m.tearL} />
            <Tear x={268} t={m.tearR} />
          </>
        )}

        {/* bico (aberto quando comemora) */}
        {closed && <Path d="M180 214 Q200 206 220 214 Q220 246 200 254 Q180 246 180 214 Z" fill="#c8454f" />}
        <Path d="M182 206 Q200 196 218 206 Q216 228 200 242 Q184 228 182 206 Z" fill="url(#beak)" stroke="#d8691a" strokeWidth={2.5} strokeLinejoin="round" />
        <Ellipse cx={194} cy={209} rx={6} ry={3} fill="#fff" opacity={0.45} />

        {/* extras */}
        {mood === "think" && (
          <G transform="translate(290 20)">
            <Circle cx={0} cy={60} r={5} fill="#fff" stroke={INK} strokeWidth={2.5} />
            <Circle cx={14} cy={38} r={8} fill="#fff" stroke={INK} strokeWidth={2.5} />
            <Ellipse cx={42} cy={-2} rx={38} ry={30} fill="#fff" stroke={INK} strokeWidth={2.5} />
            <SvgText x={42} y={14} fontSize={44} fontWeight="700" textAnchor="middle" fill="#e97b1e">?</SvgText>
          </G>
        )}
        {mood === "celebrate" &&
          CONFETTI.map(([x, y, r, color], i) => (
            <Rect key={i} x={x} y={y} width={12} height={7} rx={2} fill={color} transform={`rotate(${r} ${x} ${y})`} />
          ))}
      </Svg>
    </Animated.View>
  );
}
