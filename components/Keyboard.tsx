import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Keyboard({ onPress, onErase }: { onPress: (letter: string) => void; onErase: () => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.keys}>
        {letters.map(letter => (
          <TouchableOpacity key={letter} style={styles.key} onPress={() => onPress(letter)}>
            <Text style={styles.text}>{letter}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.key, styles.erase]} onPress={onErase}>
          <Text style={styles.text}>⌫</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{width:"100%"},
  keys:{flexDirection:"row",flexWrap:"wrap",justifyContent:"center",gap:6},
  key:{width:32,height:38,borderRadius:8,backgroundColor:"#26324a",alignItems:"center",justifyContent:"center"},
  erase:{width:50},
  text:{color:"#fff",fontWeight:"900"}
});