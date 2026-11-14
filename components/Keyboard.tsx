import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type Props = {
  onPress: (letter: string) => void;
  onErase: () => void;
};

export default function Keyboard({
  onPress,
  onErase
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.keys}>
        {letters.map(letter => (
          <TouchableOpacity
            key={letter}
            activeOpacity={0.7}
            style={styles.key}
            onPress={() => onPress(letter)}
          >
            <Text style={styles.text}>
              {letter}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.key, styles.erase]}
          onPress={onErase}
        >
          <Text style={styles.eraseText}>
            ⌫
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 4,
    paddingVertical: 8
  },

  keys: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6
  },

  key: {
    width: 32,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#26324a",
    alignItems: "center",
    justifyContent: "center",

    // Pequena sombra para dar sensação de tecla
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2
  },

  erase: {
    width: 50,
    backgroundColor: "#475569"
  },

  text: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900"
  },

  eraseText: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "900"
  }
});