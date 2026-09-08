import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useRouter } from "expo-router";

import CrosswordGrid from "../components/CrosswordGrid";
import ClueList from "../components/ClueList";
import Keyboard from "../components/Keyboard";
import WordLearnedCard from "../components/WordLearnedCard";
import { useCrosswordGame } from "../hooks/useCrosswordGame";

export default function GameScreen() {
  const router = useRouter();
  const game = useCrosswordGame();

  const hintDisabled =
    game.complete ||
    !game.activeWord ||
    game.coins < 20;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.level}>
            LEVEL {game.level}
          </Text>

          <Text style={styles.xp}>
            ⭐ {game.xp} XP
            {"  ·  "}
            🪙 {game.coins}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.headerButton}
          onPress={game.useHint}
          disabled={hintDisabled}
        >
          <Text
            style={[
              styles.hint,
              hintDisabled && styles.hintDisabled
            ]}
          >
            💡
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* COMPLETE */}
        {game.complete && (
          <View style={styles.completeBox}>
            <Text style={styles.completeEmoji}>
              🎉
            </Text>

            <View>
              <Text style={styles.complete}>
                PUZZLE COMPLETE!
              </Text>

              <Text style={styles.completeSubtext}>
                Great job! You completed the crossword.
              </Text>
            </View>
          </View>
        )}

        {/* ACTIVE CLUE */}
        {!game.complete && game.activeWord && (
          <View style={styles.activeClue}>
            <View style={styles.activeClueHeader}>
              <Text
                style={styles.activeClueDirection}
              >
                {game.activeWord.number}.
                {" "}
                {game.activeWord.direction.toUpperCase()}
              </Text>

              <Text style={styles.activeClueHint}>
                {game.activeWord.answer.length} letters
              </Text>
            </View>

            <Text style={styles.activeClueText}>
              {game.activeWord.clue}
            </Text>
          </View>
        )}

        {/* GRID */}
        <View style={styles.gridContainer}>
          <CrosswordGrid
            grid={game.grid}
            selected={game.selected}
            highlightedCells={game.activeWordCells}
            onSelect={game.selectCell}
          />
        </View>

        {/* CLUES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            CLUES
          </Text>

          <ClueList
            words={game.words}
            activeWordId={game.activeWord?.id}
            completedWordIds={game.completedWordIds}
            onSelectWord={game.selectWord}
          />
        </View>

        {/* KEYBOARD */}
        {!game.complete && (
          <View style={styles.keyboardSection}>
            <Keyboard
              onPress={game.typeLetter}
              onErase={game.erase}
            />
          </View>
        )}
      </ScrollView>

      {/* WORD LEARNED MODAL */}
      <WordLearnedCard
        word={game.learnedWord}
        onDismiss={game.dismissLearnedWord}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101522"
  },

  header: {
    paddingTop: 58,
    paddingHorizontal: 16,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#182033",
    borderBottomWidth: 1,
    borderBottomColor: "#26324a"
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#26324a"
  },

  back: {
    color: "#ffffff",
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "300"
  },

  headerCenter: {
    alignItems: "center",
    justifyContent: "center"
  },

  level: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 0.5
  },

  xp: {
    color: "#facc15",
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 4
  },

  hint: {
    fontSize: 22
  },

  hintDisabled: {
    opacity: 0.3
  },

  content: {
    padding: 18,
    paddingBottom: 30,
    alignItems: "center"
  },

  completeBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#052e16",
    borderWidth: 1,
    borderColor: "#166534",
    borderRadius: 16,
    padding: 14,
    marginBottom: 18
  },

  completeEmoji: {
    fontSize: 28,
    marginRight: 12
  },

  complete: {
    fontSize: 17,
    fontWeight: "900",
    color: "#22c55e"
  },

  completeSubtext: {
    color: "#bbf7d0",
    fontSize: 12,
    marginTop: 3
  },

  activeClue: {
    width: "100%",
    backgroundColor: "#182033",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#26324a"
  },

  activeClueHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5
  },

  activeClueDirection: {
    color: "#7dd3fc",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1
  },

  activeClueHint: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "700"
  },

  activeClueText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 21
  },

  gridContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20
  },

  section: {
    width: "100%",
    marginBottom: 8
  },

  sectionTitle: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 8
  },

  keyboardSection: {
    width: "100%",
    marginTop: 4
  }
});