import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ENGLISH</Text>
      <Text style={styles.title}>CROSSWORD</Text>
      <Text style={styles.subtitle}>Learn English. One word at a time.</Text>

      <TouchableOpacity style={styles.playButton} onPress={() => router.push("/game")}>
        <Text style={styles.playText}>▶ PLAY</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondary}>
        <Text style={styles.secondaryText}>📅 DAILY CHALLENGE</Text>
      </TouchableOpacity>

      <View style={styles.stats}>
        <View><Text style={styles.statNumber}>1</Text><Text style={styles.statLabel}>LEVEL</Text></View>
        <View><Text style={styles.statNumber}>0</Text><Text style={styles.statLabel}>WORDS</Text></View>
        <View><Text style={styles.statNumber}>0</Text><Text style={styles.statLabel}>XP</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#101522",alignItems:"center",justifyContent:"center",padding:24},
  logo:{fontSize:18,fontWeight:"900",letterSpacing:6,color:"#7dd3fc"},
  title:{fontSize:38,fontWeight:"900",letterSpacing:2,color:"#fff",marginTop:4},
  subtitle:{color:"#94a3b8",marginTop:12,fontSize:15},
  playButton:{backgroundColor:"#22c55e",paddingVertical:18,borderRadius:16,width:"100%",alignItems:"center",marginTop:48},
  playText:{fontSize:20,fontWeight:"900",color:"#052e16",letterSpacing:1},
  secondary:{borderWidth:1,borderColor:"#334155",paddingVertical:16,borderRadius:16,width:"100%",alignItems:"center",marginTop:12},
  secondaryText:{fontWeight:"800",color:"#e2e8f0"},
  stats:{flexDirection:"row",gap:38,marginTop:52},
  statNumber:{fontSize:24,fontWeight:"900",color:"#fff",textAlign:"center"},
  statLabel:{fontSize:11,fontWeight:"700",letterSpacing:1,color:"#64748b",marginTop:4}
});