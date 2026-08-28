import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Cell } from "../types/crossword";

type Props = { cell: Cell; selected: boolean; onPress: () => void };

export default function CrosswordCell({ cell, selected, onPress }: Props) {
  if (!cell.letter) return <TouchableOpacity disabled style={styles.empty} />;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.cell, selected && styles.selected]}>
      <Text style={styles.letter}>{cell.value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell:{width:38,height:38,backgroundColor:"#f8fafc",borderWidth:1,borderColor:"#cbd5e1",alignItems:"center",justifyContent:"center"},
  selected:{backgroundColor:"#fde68a",borderColor:"#f59e0b",borderWidth:2},
  empty:{width:38,height:38,backgroundColor:"transparent"},
  letter:{fontSize:20,fontWeight:"900",color:"#0f172a"}
});