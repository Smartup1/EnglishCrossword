import { forwardRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

// Um caractere invisível (zero-width space) fica sempre dentro do campo.
// Assim, quando o usuário aperta Backspace o texto vira "" e conseguimos
// detectar isso em qualquer teclado (Android e iOS), mesmo com o campo "vazio".
const SENTINEL = "\u200B";

type Props = {
  onLetter: (letter: string) => void;
  onErase: () => void;
};

const HiddenKeyboardInput = forwardRef<TextInput, Props>(
  ({ onLetter, onErase }, ref) => {
    // Só serve para forçar um re-render e o React Native restaurar o SENTINEL.
    const [, forceRender] = useState(0);

    const handleChange = (text: string) => {
      if (text.length === 0) {
        onErase();
      } else {
        const letter = text.replace(/\u200B/g, "").slice(-1).toUpperCase();
        if (/^[A-Z]$/.test(letter)) onLetter(letter);
      }
      forceRender(n => n + 1);
    };

    return (
      <TextInput
        ref={ref}
        style={styles.hidden}
        value={SENTINEL}
        onChangeText={handleChange}
        autoCapitalize="characters"
        autoCorrect={false}
        autoComplete="off"
        spellCheck={false}
        caretHidden
        contextMenuHidden
        keyboardType="visible-password" // Android: sem sugestões/autocorreção
        importantForAutofill="no"
        accessibilityElementsHidden
      />
    );
  }
);

HiddenKeyboardInput.displayName = "HiddenKeyboardInput";

const styles = StyleSheet.create({
  // Não pode ser display:none nem height:0, senão o Android não abre o teclado.
  hidden: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 1,
    height: 1,
    opacity: 0
  }
});

export default HiddenKeyboardInput;
