import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import CrosswordGrid from "../components/CrosswordGrid";
import ClueList from "../components/ClueList";
import HiddenKeyboardInput from "../components/HiddenKeyboardInput";
import Confetti from "../components/Confetti";
import LevelUpToast from "../components/LevelUpToast";
import WordLearnedCard from "../components/WordLearnedCard";
import { useCrosswordGame } from "../hooks/useCrosswordGame";
import { PlacedWord } from "../types/crossword";
import { ALL_WORDS } from "../data/words";
import { parseMode, prepareWords } from "../game/wordModes";

export default function GameScreen() {
  // Cada rodada é uma tela nova: mudar a chave recria tudo e sorteia outra cruzadinha.
  const [round, setRound] = useState(0);
  return <GameRound key={round} onNextRound={() => setRound(r => r + 1)} />;
}

function GameRound({ onNextRound }: { onNextRound: () => void }) {
  const router = useRouter();
  // Direção da tradução escolhida na tela inicial (pt-en, en-pt ou mixed).
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const words = useMemo(() => prepareWords(ALL_WORDS, parseMode(mode)), [mode]);
  const game = useCrosswordGame(words);

  // Teclado do próprio celular: um TextInput invisível recebe o foco
  // sempre que o jogador toca em uma célula ou em uma pista.
  const inputRef = useRef<TextInput>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", e =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
      // No Android, o botão "voltar" fecha o teclado mas o campo continua
      // focado; sem o blur, o próximo focus() não reabriria o teclado.
      inputRef.current?.blur();
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const openKeyboard = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const { selectCell, selectWord, dismissLearnedWord } = game;

  const handleSelectCell = useCallback(
    (row: number, col: number) => {
      selectCell(row, col);
      openKeyboard();
    },
    [selectCell, openKeyboard]
  );

  const handleSelectWord = useCallback(
    (word: PlacedWord) => {
      selectWord(word);
      openKeyboard();
    },
    [selectWord, openKeyboard]
  );

  const handleDismissLearned = useCallback(() => {
    dismissLearnedWord();
    // O Modal tira o foco do campo; devolve depois que ele fecha.
    setTimeout(openKeyboard, 150);
  }, [dismissLearnedWord, openKeyboard]);

  // ---------- CELEBRAÇÕES ----------
  const [finishBurst, setFinishBurst] = useState(0); // puzzle completo
  const [levelBurst, setLevelBurst] = useState(0); // subiu de nível
  const [levelToast, setLevelToast] = useState<number | null>(null);
  const [pendingLevel, setPendingLevel] = useState<number | null>(null);

  // Puzzle completo: espera o card da última palavra fechar (o Modal fica
  // por cima da tela) e então solta o confete grande.
  const celebratedPuzzle = useRef(false);
  useEffect(() => {
    if (game.complete && !game.learnedWord && !celebratedPuzzle.current) {
      celebratedPuzzle.current = true;
      setFinishBurst(n => n + 1);
    }
  }, [game.complete, game.learnedWord]);

  // Subiu de nível. Enquanto nenhuma palavra foi concluída, só guardamos o
  // nível carregado do aparelho (evita "level up" falso ao abrir o app).
  const levelBaseline = useRef(game.level);
  useEffect(() => {
    if (game.completedWordIds.size === 0) {
      levelBaseline.current = game.level;
      return;
    }
    if (game.level > levelBaseline.current) {
      levelBaseline.current = game.level;
      setPendingLevel(game.level);
    }
  }, [game.level, game.completedWordIds.size]);

  // O aviso de nível só aparece depois que o card da palavra fecha.
  useEffect(() => {
    if (pendingLevel !== null && !game.learnedWord) {
      setLevelToast(pendingLevel);
      setLevelBurst(n => n + 1);
      setPendingLevel(null);
    }
  }, [pendingLevel, game.learnedWord]);

  const clearLevelToast = useCallback(() => setLevelToast(null), []);

  // Ao completar, volta ao topo para mostrar o cartão de parabéns.
  const scrollRef = useRef<ScrollView>(null);
  useEffect(() => {
    if (game.complete) scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [game.complete]);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.level}>
            NÍVEL {game.level}
          </Text>

          <Text style={styles.xp}>
            ⭐ {game.xp} XP
            {"  ·  "}
            🪙 {game.coins}
          </Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: 30 + keyboardHeight }
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* COMPLETE */}
        {game.complete && (
          <>
          <View style={styles.completeBox}>
            <Text style={styles.completeEmoji}>
              🎉
            </Text>

            <View>
              <Text style={styles.complete}>
                CRUZADINHA COMPLETA!
              </Text>

              <Text style={styles.completeSubtext}>
                Parabéns! Você completou a cruzadinha.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.nextButton}
            onPress={onNextRound}
          >
            <Text style={styles.nextText}>▶ PRÓXIMA CRUZADINHA</Text>
          </TouchableOpacity>
          </>
        )}

        {/* ACTIVE CLUE */}
        {!game.complete && game.activeWord && (
          <View style={styles.activeClue}>
            <View style={styles.activeClueHeader}>
              <Text
                style={styles.activeClueDirection}
              >
                {game.activeWord.number}.
                {" "}
                {game.activeWord.direction === "across" ? "HORIZONTAL" : "VERTICAL"}
              </Text>

              <Text style={styles.activeClueHint}>
                {game.activeWord.answer.length} letras
                {"  ·  "}
                {game.activeWord.clueLang === "pt" ? "🇧🇷 → 🇺🇸" : "🇺🇸 → 🇧🇷"}
              </Text>
            </View>

            <Text style={styles.activeClueText}>
              {game.activeWord.clue}
            </Text>
          </View>
        )}

        {/* GRID */}
        <View style={styles.gridContainer}>
          <CrosswordGrid
            grid={game.grid}
            selected={game.selected}
            highlightedCells={game.activeWordCells}
            onSelect={handleSelectCell}
          />
        </View>

        {/* BOTÃO DE DICA: gasta moedas e fica bloqueado sem saldo */}
        {!game.complete && (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!game.canReveal}
              style={[
                styles.revealButton,
                !game.canReveal && styles.revealButtonDisabled
              ]}
              onPress={game.revealNext}
            >
              <View>
                <Text
                  style={[
                    styles.revealText,
                    !game.canReveal && styles.revealTextDisabled
                  ]}
                >
                  💡 REVELAR PRÓXIMA LETRA
                </Text>

                <Text style={styles.revealCount}>
                  {game.lettersLeft === 1 ? "falta 1 letra" : `faltam ${game.lettersLeft} letras`}
                </Text>
              </View>

              <Text
                style={[
                  styles.revealCost,
                  !game.canReveal && styles.revealTextDisabled
                ]}
              >
                🪙 {game.revealCost}
              </Text>
            </TouchableOpacity>

            {!game.canReveal && (
              <Text style={styles.revealHint}>
                Você precisa de {game.revealCost} 🪙 para uma dica. Complete palavras para ganhar moedas.
              </Text>
            )}
          </>
        )}

        {/* CLUES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            PALAVRA A SER TRADUZIDA
          </Text>

          <ClueList
            words={game.words}
            activeWordId={game.activeWord?.id}
            completedWordIds={game.completedWordIds}
            onSelectWord={handleSelectWord}
          />
        </View>

      </ScrollView>

      {/* TECLADO DO CELULAR (campo invisível) */}
      {!game.complete && (
        <HiddenKeyboardInput
          ref={inputRef}
          onLetter={game.typeLetter}
          onErase={game.erase}
        />
      )}

      {/* WORD LEARNED MODAL */}
      <WordLearnedCard
        word={game.learnedWord}
        onDismiss={handleDismissLearned}
      />

      {/* CONFETES E AVISOS (por cima de tudo, não bloqueiam toques) */}
      <Confetti burstKey={finishBurst} mode="burst" count={70} />
      <Confetti burstKey={finishBurst} mode="rain" count={60} />
      <Confetti
        burstKey={levelBurst}
        mode="burst"
        count={40}
        origins={[{ x: 0.5, y: 0.12, aim: 90, spread: 140 }]}
      />
      <LevelUpToast level={levelToast} onDone={clearLevelToast} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101522"
  },

  header: {
    paddingTop: 58,
    paddingHorizontal: 16,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#182033",
    borderBottomWidth: 1,
    borderBottomColor: "#26324a"
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#26324a"
  },

  back: {
    color: "#ffffff",
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "300"
  },

  headerCenter: {
    alignItems: "center",
    justifyContent: "center"
  },

  level: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 0.5
  },

  xp: {
    color: "#facc15",
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 4
  },

  hint: {
    fontSize: 22
  },

  hintDisabled: {
    opacity: 0.3
  },

  content: {
    padding: 18,
    paddingBottom: 30,
    alignItems: "center"
  },

  completeBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#052e16",
    borderWidth: 1,
    borderColor: "#166534",
    borderRadius: 16,
    padding: 14,
    marginBottom: 18
  },

  completeEmoji: {
    fontSize: 28,
    marginRight: 12
  },

  complete: {
    fontSize: 17,
    fontWeight: "900",
    color: "#22c55e"
  },

  completeSubtext: {
    color: "#bbf7d0",
    fontSize: 12,
    marginTop: 3
  },

  activeClue: {
    width: "100%",
    backgroundColor: "#182033",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#26324a"
  },

  activeClueHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5
  },

  activeClueDirection: {
    color: "#7dd3fc",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1
  },

  activeClueHint: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "700"
  },

  activeClueText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 21
  },

  gridContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20
  },

  revealButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#182033",
    borderWidth: 1,
    borderColor: "#facc15",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20
  },

  revealText: {
    color: "#facc15",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 0.5
  },

  revealCount: {
    color: "#94a3b8",
    fontWeight: "800",
    fontSize: 12
  },

  headerSpacer: {
    width: 44,
    height: 44
  },

  revealButtonDisabled: {
    borderColor: "#334155",
    opacity: 0.7
  },

  revealTextDisabled: {
    color: "#64748b"
  },

  revealCost: {
    color: "#facc15",
    fontWeight: "900",
    fontSize: 16
  },

  revealHint: {
    color: "#94a3b8",
    fontSize: 12,
    textAlign: "center",
    marginTop: -10,
    marginBottom: 20
  },

  nextButton: {
    width: "100%",
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20
  },

  nextText: {
    color: "#052e16",
    fontWeight: "900",
    fontSize: 15,
    letterSpacing: 0.5
  },

  section: {
    width: "100%",
    marginBottom: 8
  },
  sectionTitle: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 8
  },
});