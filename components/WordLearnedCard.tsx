import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PlacedWord } from "../types/crossword";
import Confetti from "./Confetti";

type Props = {
  word: PlacedWord | null;
  onDismiss: () => void;
};

// Categorias do banco de palavras (em inglês) mostradas em português.
const CATEGORY_PT: Record<string, string> = {
  education: "educação",
  food: "comida",
  home: "casa",
  travel: "viagem",
  family: "família",
  feelings: "sentimentos",
  technology: "tecnologia",
  business: "negócios",
  movies: "filmes"
};

export default function WordLearnedCard({ word, onDismiss }: Props) {
  if (!word) return null;

  return (
    <Modal transparent animationType="fade" visible={!!word} onRequestClose={onDismiss}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.badge}>✓ PALAVRA COMPLETA +10 XP</Text>
          {/* As duas línguas, sempre na mesma ordem, não importa a direção do jogo */}
          <Text style={styles.answer}>
            🇺🇸 {(word.english ?? word.answer).toUpperCase()}
          </Text>
          <Text style={styles.translation}>
            🇧🇷 {word.portuguese ?? word.translation}
          </Text>
          {word.pronunciation && <Text style={styles.pronunciation}>{word.pronunciation}</Text>}
          {word.category && <Text style={styles.category}>#{CATEGORY_PT[word.category] ?? word.category}</Text>}

          {word.example && (
            <View style={styles.exampleBox}>
              <Text style={styles.exampleLabel}>EXEMPLO</Text>
              <Text style={styles.example}>{word.example}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={onDismiss}>
            <Text style={styles.buttonText}>CONTINUAR ▶</Text>
          </TouchableOpacity>
        </View>

        {/* Confete dentro do Modal, senão ele ficaria escondido atrás dele */}
        <Confetti
          burstKey={1}
          mode="burst"
          count={45}
          origins={[{ x: 0.5, y: 0.5, aim: -90, spread: 360 }]}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.75)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  card: {
    backgroundColor: "#182033",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    gap: 6
  },
  badge: { color: "#22c55e", fontWeight: "900", letterSpacing: 1, marginBottom: 8 },
  answer: { color: "#fff", fontSize: 28, fontWeight: "900", letterSpacing: 1 },
  translation: { color: "#facc15", fontSize: 18, fontWeight: "700", marginTop: 2 },
  pronunciation: { color: "#94a3b8", fontSize: 14, marginTop: 2 },
  category: { color: "#7dd3fc", fontSize: 12, fontWeight: "700", marginTop: 6 },
  exampleBox: {
    backgroundColor: "#101522",
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
    width: "100%"
  },
  exampleLabel: { color: "#7dd3fc", fontSize: 11, fontWeight: "900", letterSpacing: 1, marginBottom: 4 },
  example: { color: "#e2e8f0", fontSize: 14, fontStyle: "italic" },
  button: {
    backgroundColor: "#22c55e",
    paddingVertical: 14,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    marginTop: 18
  },
  buttonText: { color: "#052e16", fontWeight: "900", letterSpacing: 1 }
});
