import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Cell } from "../types/crossword";

type Props = {
  cell: Cell;
  selected: boolean;
  highlighted: boolean;
  onPress: () => void;
};

export default function CrosswordCell({ cell, selected, highlighted, onPress }: Props) {
  if (!cell.letter) return <TouchableOpacity disabled style={styles.empty} />;

  const filled = cell.value.length > 0;
  const correct = filled && cell.value === cell.letter;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.cell,
        highlighted && styles.highlighted,
        selected && styles.selected,
        correct && styles.correct
      ]}
    >
      {cell.number !== undefined && <Text style={styles.number}>{cell.number}</Text>}
      <Text style={[styles.letter, correct && styles.letterCorrect]}>{cell.value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 34,
    height: 34,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    alignItems: "center",
    justifyContent: "center"
  },
  highlighted: { backgroundColor: "#bfdbfe" },
  selected: { backgroundColor: "#fde68a", borderColor: "#f59e0b", borderWidth: 2 },
  correct: { backgroundColor: "#bbf7d0" },
  empty: { width: 34, height: 34, backgroundColor: "transparent" },
  letter: { fontSize: 18, fontWeight: "900", color: "#0f172a" },
  letterCorrect: { color: "#166534" },
  number: {
    position: "absolute",
    top: 1,
    left: 2,
    fontSize: 8,
    fontWeight: "700",
    color: "#64748b"
  }
});
