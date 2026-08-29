import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PlacedWord } from "../types/crossword";

type Props = {
  words: PlacedWord[];
  activeWordId?: string;
  completedWordIds: Set<string>;
  onSelectWord: (word: PlacedWord) => void;
};

export default function ClueList({ words, activeWordId, completedWordIds, onSelectWord }: Props) {
  const across = words.filter(word => word.direction === "across");
  const down = words.filter(word => word.direction === "down");

  const renderGroup = (title: string, group: PlacedWord[]) => (
    <View style={styles.group}>
      <Text style={styles.title}>{title}</Text>
      {group.map(word => {
        const isActive = word.id === activeWordId;
        const isDone = completedWordIds.has(word.id);
        return (
          <TouchableOpacity
            key={word.id}
            style={[styles.item, isActive && styles.itemActive]}
            onPress={() => onSelectWord(word)}
          >
            <Text style={[styles.number, isDone && styles.numberDone]}>{word.number ?? ""}.</Text>
            <Text style={[styles.clue, isDone && styles.clueDone]}>{word.clue}</Text>
            {isDone && <Text style={styles.check}>✓</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.box}>
      {across.length > 0 && renderGroup("ACROSS", across)}
      {down.length > 0 && renderGroup("DOWN", down)}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { backgroundColor: "#182033", borderRadius: 18, padding: 18, width: "100%", gap: 16 },
  group: { gap: 4 },
  title: { color: "#7dd3fc", fontWeight: "900", letterSpacing: 2, marginBottom: 8 },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 6, borderRadius: 8 },
  itemActive: { backgroundColor: "#26324a", paddingHorizontal: 8 },
  number: { color: "#22c55e", fontWeight: "900", width: 26 },
  numberDone: { color: "#4b5563" },
  clue: { color: "#e2e8f0", flex: 1 },
  clueDone: { color: "#64748b", textDecorationLine: "line-through" },
  check: { color: "#22c55e", fontWeight: "900", marginLeft: 6 }
});
