import { View, StyleSheet } from "react-native";
import CrosswordCell from "./CrosswordCell";
import { Cell } from "../types/crossword";

type Props = {
  grid: Cell[][];
  selected: { row: number; col: number } | null;
  onSelect: (row: number, col: number) => void;
};

export default function CrosswordGrid({ grid, selected, onSelect }: Props) {
  return (
    <View style={styles.grid}>
      {grid.map((row, r) => (
        <View key={r} style={styles.row}>
          {row.map((cell, c) => (
            <CrosswordCell
              key={`${r}-${c}`}
              cell={cell}
              selected={selected?.row === r && selected?.col === c}
              onPress={() => onSelect(r, c)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid:{alignSelf:"center"},
  row:{flexDirection:"row"}
});