import {
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { Cell } from "../types/crossword";

type Props = {
  cell: Cell;
  selected: boolean;
  highlighted: boolean;
  onPress: () => void;
};

export default function CrosswordCell({
  cell,
  selected,
  highlighted,
  onPress
}: Props) {
  // Célula preta/vazia do crossword
  if (!cell.letter) {
    return (
      <TouchableOpacity
        disabled
        style={styles.empty}
      />
    );
  }

  const filled = cell.value.length > 0;

  const correct =
    filled &&
    cell.value.toUpperCase() ===
      cell.letter.toUpperCase();

  const incorrect = filled && !correct;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.cell,

        // Palavra atualmente selecionada
        highlighted && styles.highlighted,

        // Célula atualmente selecionada
        selected && styles.selected,

        // Resposta correta
        correct && styles.correct,

        // Resposta incorreta
        incorrect && styles.incorrect
      ]}
    >
      {cell.number !== undefined && (
        <Text style={styles.number}>
          {cell.number}
        </Text>
      )}

      <Text
        style={[
          styles.letter,

          correct && styles.letterCorrect,

          incorrect && styles.letterIncorrect
        ]}
      >
        {cell.value}
      </Text>
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

  // Células pertencentes à palavra ativa
  highlighted: {
    backgroundColor: "#bfdbfe"
  },

  // Célula atualmente selecionada
  selected: {
    backgroundColor: "#fde68a",
    borderColor: "#f59e0b",
    borderWidth: 2
  },

  // Letra correta
  correct: {
    backgroundColor: "#bbf7d0",
    borderColor: "#86efac"
  },

  // Letra incorreta
  incorrect: {
    backgroundColor: "#fecaca",
    borderColor: "#f87171"
  },

  // Célula que não faz parte da grade
  empty: {
    width: 34,
    height: 34,
    backgroundColor: "transparent"
  },

  letter: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0f172a"
  },

  letterCorrect: {
    color: "#166534"
  },

  letterIncorrect: {
    color: "#b91c1c"
  },

  number: {
    position: "absolute",
    top: 1,
    left: 2,
    fontSize: 8,
    fontWeight: "700",
    color: "#64748b"
  }
});