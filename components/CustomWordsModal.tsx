import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {
  CustomWord,
  loadCustomWords,
  removeCustomWord,
  saveCustomWords,
  validateCustomWord
} from "../services/customWords";

type Props = {
  visible: boolean;
  onClose: () => void;
  /** Avisa a tela inicial quando a quantidade de palavras muda. */
  onCountChange?: (count: number) => void;
};

export default function CustomWordsModal({ visible, onClose, onCountChange }: Props) {
  const [words, setWords] = useState<CustomWord[]>([]);
  const [english, setEnglish] = useState("");
  const [portuguese, setPortuguese] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    loadCustomWords().then(list => {
      if (!cancelled) setWords(list);
    });
    setError(null);
    setJustAdded(null);
    return () => {
      cancelled = true;
    };
  }, [visible]);

  const commit = (next: CustomWord[]) => {
    setWords(next);
    onCountChange?.(next.length);
    void saveCustomWords(next);
  };

  const add = () => {
    const result = validateCustomWord(words, english, portuguese);
    if (!result.ok) {
      setError(result.message);
      setJustAdded(null);
      return;
    }
    commit([result.word, ...words]);
    setJustAdded(`${result.word.english} → ${result.word.portuguese}`);
    setError(null);
    setEnglish("");
    setPortuguese("");
  };

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.backdrop}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>➕ MINHAS PALAVRAS</Text>
          <Text style={styles.help}>
            Adicione as palavras que você quer aprender. Elas aparecem em toda cruzadinha e, no modo
            🔀 MISTO, nos dois sentidos (car → carro e carro → car).
          </Text>

          <Text style={styles.label}>🇺🇸 INGLÊS</Text>
          <TextInput
            style={styles.input}
            value={english}
            onChangeText={text => {
              setEnglish(text);
              setError(null);
            }}
            placeholder="ex.: car"
            placeholderTextColor="#475569"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={30}
            returnKeyType="next"
          />

          <Text style={styles.label}>🇧🇷 TRADUÇÃO EM PORTUGUÊS</Text>
          <TextInput
            style={styles.input}
            value={portuguese}
            onChangeText={text => {
              setPortuguese(text);
              setError(null);
            }}
            placeholder="ex.: carro"
            placeholderTextColor="#475569"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={30}
            returnKeyType="done"
            onSubmitEditing={add}
          />

          {error && <Text style={styles.error}>{error}</Text>}
          {justAdded && !error && <Text style={styles.success}>✓ Adicionada: {justAdded}</Text>}

          <TouchableOpacity activeOpacity={0.85} style={styles.addButton} onPress={add}>
            <Text style={styles.addText}>ADICIONAR</Text>
          </TouchableOpacity>

          <Text style={styles.listTitle}>SUAS PALAVRAS ({words.length})</Text>
          <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
            {words.length === 0 && <Text style={styles.empty}>Nenhuma ainda. Adicione a primeira!</Text>}
            {words.map(word => (
              <View key={word.id} style={styles.row}>
                <Text style={styles.rowText} numberOfLines={1}>
                  🇺🇸 {word.english} · 🇧🇷 {word.portuguese}
                </Text>
                <TouchableOpacity
                  accessibilityLabel={`Remover ${word.english}`}
                  hitSlop={10}
                  onPress={() => commit(removeCustomWord(words, word.id))}
                >
                  <Text style={styles.remove}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity activeOpacity={0.85} style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>FECHAR</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(2, 6, 23, 0.8)", alignItems: "center", justifyContent: "center", padding: 20 },
  card: { backgroundColor: "#182033", borderRadius: 20, padding: 20, width: "100%", maxWidth: 380, maxHeight: "92%" },
  title: { color: "#fff", fontSize: 18, fontWeight: "900", letterSpacing: 1 },
  help: { color: "#94a3b8", fontSize: 13, marginTop: 8, lineHeight: 18 },
  label: { color: "#64748b", fontSize: 11, fontWeight: "800", letterSpacing: 2, marginTop: 14 },
  input: { marginTop: 6, backgroundColor: "#101522", borderWidth: 1, borderColor: "#334155", borderRadius: 12, color: "#fff", fontSize: 17, paddingVertical: 10, paddingHorizontal: 14 },
  error: { color: "#f87171", fontSize: 13, marginTop: 10, fontWeight: "700" },
  success: { color: "#4ade80", fontSize: 13, marginTop: 10, fontWeight: "700" },
  addButton: { backgroundColor: "#22c55e", paddingVertical: 14, borderRadius: 14, alignItems: "center", marginTop: 14 },
  addText: { color: "#052e16", fontWeight: "900", fontSize: 16, letterSpacing: 1 },
  listTitle: { color: "#64748b", fontSize: 11, fontWeight: "800", letterSpacing: 2, marginTop: 18 },
  list: { marginTop: 8, maxHeight: 170 },
  empty: { color: "#64748b", fontSize: 13, paddingVertical: 8 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: "#26324a", gap: 10 },
  rowText: { color: "#e2e8f0", fontSize: 14, flex: 1 },
  remove: { color: "#f87171", fontSize: 18, fontWeight: "900", paddingHorizontal: 4 },
  closeButton: { borderWidth: 1, borderColor: "#334155", paddingVertical: 12, borderRadius: 14, alignItems: "center", marginTop: 14 },
  closeText: { color: "#e2e8f0", fontWeight: "800", letterSpacing: 1 }
});
