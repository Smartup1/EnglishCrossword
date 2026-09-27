import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from "expo-audio";

/**
 * Efeitos sonoros curtos (cliques, tique-taque do relógio, falha ao
 * estourar o tempo, moeda gasta). Sons pequenos e sintetizados —
 * ver /home/claude/gen_sounds.py na entrega para como foram gerados.
 *
 * Nunca lança erro: se o aparelho não tiver áudio disponível (ex.: web sem
 * interação do usuário ainda), o jogo continua normalmente sem som.
 */

const SOUND_SOURCES = {
  tap: require("../assets/sounds/tap.wav"),
  key: require("../assets/sounds/key.wav"),
  tick: require("../assets/sounds/tick.wav"),
  timeup: require("../assets/sounds/timeup.wav"),
  coin: require("../assets/sounds/coin.wav")
} as const;

type SoundName = keyof typeof SOUND_SOURCES;

// Cada som tem um pequeno "pool" de players, pra tocar rápido em sequência
// (ex.: digitando rápido) sem cortar o som anterior no meio.
const POOL_SIZE = 3;
const pools: Partial<Record<SoundName, AudioPlayer[]>> = {};
const poolIndex: Partial<Record<SoundName, number>> = {};

let audioModeRequested = false;
function ensureAudioMode() {
  if (audioModeRequested) return;
  audioModeRequested = true;
  setAudioModeAsync({ playsInSilentMode: true }).catch(() => {
    // Sem suporte (ex.: web): ignora, os players ainda tentam tocar normalmente.
  });
}

function getPool(name: SoundName): AudioPlayer[] {
  let pool = pools[name];
  if (!pool) {
    pool = Array.from({ length: POOL_SIZE }, () => createAudioPlayer(SOUND_SOURCES[name]));
    pools[name] = pool;
    poolIndex[name] = 0;
  }
  return pool;
}

let soundsEnabled = true;

/** Liga/desliga os efeitos sonoros (ex.: um botão de "mudo" nas configurações). */
export function setSoundsEnabled(enabled: boolean): void {
  soundsEnabled = enabled;
}

export function areSoundsEnabled(): boolean {
  return soundsEnabled;
}

function play(name: SoundName, volume: number): void {
  if (!soundsEnabled) return;
  try {
    ensureAudioMode();
    const pool = getPool(name);
    const index = (poolIndex[name] ?? 0) % pool.length;
    poolIndex[name] = index + 1;
    const player = pool[index];
    player.volume = volume;
    player.seekTo(0);
    player.play();
  } catch {
    // Dispositivo sem áudio disponível: o jogo segue normalmente sem som.
  }
}

/** Toque leve ao selecionar uma célula ou uma pista. */
export function playTap(): void {
  play("tap", 0.5);
}

/** Clique ao digitar (ou apagar) uma letra. */
export function playKey(): void {
  play("key", 0.55);
}

/** Tique do relógio — a cada minuto e nos últimos segundos. */
export function playTick(): void {
  play("tick", 0.7);
}

/** Buzina de falha quando o tempo da cruzadinha esgota. */
export function playTimeUp(): void {
  play("timeup", 0.8);
}

/** Moeda gasta (dica ou penalidade de tempo esgotado). */
export function playCoinSpent(): void {
  play("coin", 0.7);
}
