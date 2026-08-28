import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import CrosswordGrid from "../components/CrosswordGrid";
import ClueList from "../components/ClueList";
import Keyboard from "../components/Keyboard";
import { useCrosswordGame } from "../hooks/useCrosswordGame";

export default function GameScreen() {
  const router = useRouter();
  const game = useCrosswordGame();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.back}>←</Text></TouchableOpacity>
        <View>
          <Text style={styles.level}>LEVEL 1</Text>
          <Text style={styles.xp}>⭐ 0 XP</Text>
        </View>
        <TouchableOpacity onPress={() => Alert.alert("Hint", "Try reading the clues carefully!")}>
          <Text style={styles.hint}>💡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {game.complete && <Text style={styles.complete}>🎉 PUZZLE COMPLETE!</Text>}

        <CrosswordGrid
          grid={game.grid}
          selected={game.selected}
          onSelect={game.selectCell}
        />

        <ClueList words={game.words} />

        <Keyboard onPress={game.typeLetter} onErase={game.erase} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#101522"},
  header:{paddingTop:58,paddingHorizontal:20,paddingBottom:16,flexDirection:"row",alignItems:"center",justifyContent:"space-between",backgroundColor:"#182033"},
  back:{fontSize:30,color:"#fff"},
  level:{color:"#fff",fontSize:18,fontWeight:"900",textAlign:"center"},
  xp:{color:"#facc15",fontWeight:"700",textAlign:"center",marginTop:3},
  hint:{fontSize:24},
  content:{padding:18,gap:24,alignItems:"center"},
  complete:{fontSize:20,fontWeight:"900",color:"#22c55e",marginTop:6}
});