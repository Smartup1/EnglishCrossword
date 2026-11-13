import * as Speech from "expo-speech";

/**
 * Pronúncia em inglês (voz do próprio celular, funciona sem internet).
 * Nunca lança erro: se o aparelho não tiver voz disponível, simplesmente não fala.
 */
export function speakEnglish(text: string, rate = 0.85): void {
  if (!text.trim()) return;
  try {
    void Speech.stop(); // corta o que estiver falando antes de começar
    Speech.speak(text, { language: "en-US", rate });
  } catch {
    // sem voz instalada ou áudio indisponível: ignora
  }
}

export function stopSpeaking(): void {
  try {
    void Speech.stop();
  } catch {
    // nada a fazer
  }
}
