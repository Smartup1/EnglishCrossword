import { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";

import { loadProgress, PlayerProgress } from "../services/progressStorage";
import { DEFAULT_MODE, GameMode } from "../game/wordModes";

const MODES: { key: GameMode; label: string; sub: string }[] = [
  { key: "pt-en", label: "🇧🇷 → 🇺🇸", sub: "PT → EN" },
  { key: "en-pt", label: "🇺🇸 → 🇧🇷", sub: "EN → PT" },
  { key: "mixed", label: "🔀", sub: "MISTO" }
];

const EMPTY_PROGRESS: PlayerProgress = { xp: 0, coins: 0, level: 1, wordsLearned: [] };

export default function HomeScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState<PlayerProgress>(EMPTY_PROGRESS);
  const [mode, setMode] = useState<GameMode>(DEFAULT_MODE);

  const play = () => router.push({ pathname: "/game", params: { mode } });

  // Re-reads progress every time this screen becomes active again, so XP/level
  // earned in a puzzle show up here right after the player goes back.
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      loadProgress().then(loaded => {
        if (!cancelled) setProgress(loaded);
      });
      return () => {
        cancelled = true;
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ENGLISH</Text>
      <Text style={styles.title}>CROSSWORD</Text>
      <Text style={styles.subtitle}>Aprenda inglês. Uma palavra por vez.</Text>

      <Text style={styles.modeTitle}>TRADUZIR</Text>
      <View style={styles.modes}>
        {MODES.map(m => (
          <TouchableOpacity
            key={m.key}
            activeOpacity={0.8}
            style={[styles.modeChip, mode === m.key && styles.modeChipActive]}
            onPress={() => setMode(m.key)}
          >
            <Text style={styles.modeLabel}>{m.label}</Text>
            <Text style={[styles.modeSub, mode === m.key && styles.modeSubActive]}>{m.sub}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.playButton} onPress={play}>
        <Text style={styles.playText}>▶ JOGAR</Text>
      </TouchableOpacity>

      {/*
        TODO (Fase 6 do roadmap): hoje isso abre o mesmo gerador aleatório do
        botão PLAY. Um "daily challenge" de verdade precisa de um puzzle fixo
        por dia (seed determinística pela data) + streak — ainda não implementado.
      */}
      <TouchableOpacity style={styles.secondary} onPress={play}>
        <Text style={styles.secondaryText}>📅 DESAFIO DIÁRIO</Text>
      </TouchableOpacity>

      <View style={styles.stats}>
        <View><Text style={styles.statNumber}>{progress.level}</Text><Text style={styles.statLabel}>NÍVEL</Text></View>
        <View><Text style={styles.statNumber}>{progress.wordsLearned.length}</Text><Text style={styles.statLabel}>PALAVRAS</Text></View>
        <View><Text style={styles.statNumber}>{progress.xp}</Text><Text style={styles.statLabel}>XP</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#101522",alignItems:"center",justifyContent:"center",padding:24},
  logo:{fontSize:18,fontWeight:"900",letterSpacing:6,color:"#7dd3fc"},
  title:{fontSize:38,fontWeight:"900",letterSpacing:2,color:"#fff",marginTop:4},
  subtitle:{color:"#94a3b8",marginTop:12,fontSize:15},
  modeTitle:{color:"#64748b",fontSize:11,fontWeight:"800",letterSpacing:2,marginTop:40},
  modes:{flexDirection:"row",gap:10,width:"100%",marginTop:10},
  modeChip:{flex:1,alignItems:"center",paddingVertical:12,borderRadius:14,borderWidth:1,borderColor:"#334155",backgroundColor:"#182033"},
  modeChipActive:{borderColor:"#22c55e",backgroundColor:"#12301f"},
  modeLabel:{fontSize:18},
  modeSub:{color:"#64748b",fontSize:11,fontWeight:"800",letterSpacing:1,marginTop:4},
  modeSubActive:{color:"#22c55e"},
  playButton:{backgroundColor:"#22c55e",paddingVertical:18,borderRadius:16,width:"100%",alignItems:"center",marginTop:20},
  playText:{fontSize:20,fontWeight:"900",color:"#052e16",letterSpacing:1},
  secondary:{borderWidth:1,borderColor:"#334155",paddingVertical:16,borderRadius:16,width:"100%",alignItems:"center",marginTop:12},
  secondaryText:{fontWeight:"800",color:"#e2e8f0"},
  stats:{flexDirection:"row",gap:38,marginTop:52},
  statNumber:{fontSize:24,fontWeight:"900",color:"#fff",textAlign:"center"},
  statLabel:{fontSize:11,fontWeight:"700",letterSpacing:1,color:"#64748b",marginTop:4}
});