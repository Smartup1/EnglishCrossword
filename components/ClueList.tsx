import { StyleSheet, Text, View } from "react-native";
import { CrosswordWord } from "../types/crossword";

export default function ClueList({ words }: { words: CrosswordWord[] }) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>CLUES</Text>
      {words.map((word, index) => (
        <View key={word.id} style={styles.item}>
          <Text style={styles.number}>{index + 1}.</Text>
          <Text style={styles.clue}>{word.clue}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box:{backgroundColor:"#182033",borderRadius:18,padding:18,width:"100%"},
  title:{color:"#7dd3fc",fontWeight:"900",letterSpacing:2,marginBottom:12},
  item:{flexDirection:"row",marginBottom:10},
  number:{color:"#22c55e",fontWeight:"900",width:26},
  clue:{color:"#e2e8f0",flex:1}
});