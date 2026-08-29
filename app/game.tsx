import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import CrosswordGrid from "../components/CrosswordGrid";
import ClueList from "../components/ClueList";
import Keyboard from "../components/Keyboard";
import WordLearnedCard from "../components/WordLearnedCard";
import { useCrosswordGame } from "../hooks/useCrosswordGame";

export default function GameScreen() {
  const router = useRouter();
  const game = useCrosswordGame();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.level}>LEVEL 1</Text>
          <Text style={styles.xp}>⭐ {game.xp} XP · 🪙 {game.coins}</Text>
        </View>
        <TouchableOpacity onPress={game.useHint} disabled={!game.activeWord || game.coins < 20}>
          <Text style={[styles.hint, (!game.activeWord || game.coins < 20) && styles.hintDisabled]}>💡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {game.complete && <Text style={styles.complete}>🎉 PUZZLE COMPLETE!</Text>}

        {game.activeWord && (
          <View style={styles.activeClue}>
            <Text style={styles.activeClueDirection}>
              {game.activeWord.number}. {game.activeWord.direction.toUpperCase()}
            </Text>
            <Text style={styles.activeClueText}>{game.activeWord.clue}</Text>
          </View>
        )}

        <CrosswordGrid
          grid={game.grid}
          selected={game.selected}
          highlightedCells={game.activeWordCells}
          onSelect={game.selectCell}
        />

        <ClueList
          words={game.words}
          activeWordId={game.activeWord?.id}
          completedWordIds={game.completedWordIds}
          onSelectWord={game.selectWord}
        />

        <Keyboard onPress={game.typeLetter} onErase={game.erase} />
      </ScrollView>

      <WordLearnedCard word={game.learnedWord} onDismiss={game.dismissLearnedWord} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#101522" },
  header: {
    paddingTop: 58,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#182033"
  },
  back: { fontSize: 30, color: "#fff" },
  level: { color: "#fff", fontSize: 18, fontWeight: "900", textAlign: "center" },
  xp: { color: "#facc15", fontWeight: "700", textAlign: "center", marginTop: 3 },
  hint: { fontSize: 24 },
  hintDisabled: { opacity: 0.3 },
  content: { padding: 18, gap: 20, alignItems: "center" },
  complete: { fontSize: 20, fontWeight: "900", color: "#22c55e", marginTop: 6 },
  activeClue: {
    backgroundColor: "#182033",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: "100%"
  },
  activeClueDirection: { color: "#7dd3fc", fontWeight: "900", fontSize: 12, letterSpacing: 1, marginBottom: 4 },
  activeClueText: { color: "#fff", fontWeight: "700", fontSize: 15 }
});
