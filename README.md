Jogo mobile de palavras cruzadas para **falantes de português aprenderem inglês** de forma divertida, gamificada e progressiva.

O jogador resolve uma cruzadinha em que **cada pista é uma palavra**, e aprende a traduzir nos dois sentidos: **português → inglês** e **inglês → português**. A ideia é combinar **Crossword + aprendizado de inglês + gamificação**.

---

# 🎮 Como o jogo funciona

Na tela inicial o jogador escolhe a direção da tradução:

| Modo | A pista mostra | O jogador responde |
|---|---|---|
| 🇧🇷 → 🇺🇸 **PT → EN** | uma palavra em português (`escola`) | em inglês (`SCHOOL`) |
| 🇺🇸 → 🇧🇷 **EN → PT** | uma palavra em inglês (`school`) | em português (`ESCOLA`) |
| 🔀 **MISTO** | mistura os dois sentidos no mesmo puzzle | conforme a pista |

Ao completar uma palavra, um cartão mostra as duas línguas juntas, a pronúncia (com áudio 🔊), a categoria e uma frase de exemplo:

```text
🇺🇸 SCHOOL   🔊
🇧🇷 escola
/skuːl/
#educação

EXEMPLO 🔊
I go to school every day.
```

A cada vez que o jogador entra no jogo, **as palavras e os cruzamentos são sorteados de novo**. Ao terminar, o botão **▶ PRÓXIMA CRUZADINHA** já sorteia outra.

---

# ✅ Funcionalidades atuais

* Cruzadinha gerada automaticamente, **diferente a cada partida**
* Três modos de tradução (PT→EN, EN→PT, Misto)
* Pista sempre em **uma palavra** (sem frases)
* **Teclado do próprio celular** (campo invisível), aceitando acentos (ã, ç, é viram A, C, E)
* Botão de **dica** que revela uma letra e **gasta moedas** (bloqueia sem saldo)
* **Pronúncia em áudio** (voz do celular, funciona offline)
* **XP, níveis e moedas**, salvos no aparelho
* **Sequência diária 🔥 e meta do dia 🎯**
* **Moedas de presente** para jogador novo
* Confetes e avisos de conquista (palavra, cruzadinha, nível, meta do dia)
* Interface totalmente em **português do Brasil**

---

# 🚀 Stack

* React Native + Expo (**SDK 57**)
* Expo Router (navegação por arquivos, **sem** `@react-navigation`)
* TypeScript
* AsyncStorage (progresso local)
* expo-speech (pronúncia)

O projeto roda 100% local, sem backend. No futuro: Supabase/Firebase, login, ranking e compra de moedas (ver [Segurança e moedas](#-segurança-e-moedas)).

---

# ▶️ Como rodar (Windows)

```bash
# 1. dependências
npm install

# 2. pacotes que o projeto usa e o Expo não instala sozinho
npx expo install expo-linking expo-constants expo-speech

# 3. iniciar (celular e PC no mesmo Wi-Fi)
npx expo start --lan -c
```

Escaneie o QR code com o **Expo Go**.

**Se der problema:**

| Sintoma | Solução |
|---|---|
| "incompatible with this version of Expo Go" | O Expo Go precisa ser do mesmo SDK do projeto (57). Atualize o app pela loja. |
| Celular não conecta | Confira o mesmo Wi-Fi, rede "Privada" no Windows, e libere a porta: `netsh advfirewall firewall add rule name="Expo 8081" dir=in action=allow protocol=TCP localport=8081` (PowerShell como administrador). Alternativa: hotspot do celular. |
| `Unable to resolve "<pacote>"` | `npx expo install <pacote>` |
| Erro "expo-router is no longer compatible with react-navigation" | Algum arquivo ainda importa `@react-navigation/*`. Use o equivalente do `expo-router` (`useFocusEffect`, `useRouter`, `useLocalSearchParams`). |
| Comportamento estranho após mexer nas dependências | `npx expo start --lan -c` (limpa o cache) e, se preciso, apague `node_modules` e rode `npm install`. |

Diagnóstico geral: `npx expo-doctor` e `npx expo install --check`.

---

# 📁 Estrutura do projeto

```text
EnglishCrossword/
│
├── app/                              Telas (Expo Router)
│   ├── _layout.tsx                   Navegação (Stack sem cabeçalho)
│   ├── index.tsx                     Tela inicial: modo, jogar, meta do dia, estatísticas
│   └── game.tsx                      Tela da partida
│
├── components/                       Interface reutilizável
│   ├── CrosswordGrid.tsx             Grade completa
│   ├── CrosswordCell.tsx             Uma célula (34px)
│   ├── ClueList.tsx                  Lista de pistas (horizontais/verticais)
│   ├── HiddenKeyboardInput.tsx       Campo invisível que recebe o teclado do celular
│   ├── WordLearnedCard.tsx           Cartão "palavra completa" (2 línguas, 🔊, exemplo)
│   ├── Confetti.tsx                  Confetes (só Animated, sem dependência extra)
│   ├── AchievementToast.tsx          Aviso de conquista que desce do topo
│   └── Keyboard.tsx                  (sem uso) antigo teclado virtual
│
├── hooks/
│   └── useCrosswordGame.tsx          Regras da partida: seleção, digitação, dica, XP, moedas
│
├── game/                             Motor do jogo (sem UI)
│   ├── crosswordGenerator.tsx        Gera a grade (sorteio, cruzamentos, limites de tela)
│   └── wordModes.tsx                 Modos PT→EN / EN→PT / Misto e normalização de acentos
│
├── services/                         Persistência e serviços
│   ├── progressStorage.tsx           Salva/carrega XP, moedas, nível, palavras, sequência
│   ├── dailyProgress.tsx             Regras da meta do dia e da sequência 🔥
│   └── speech.tsx                    Pronúncia em inglês (expo-speech)
│
├── data/
│   ├── words.tsx                     Banco de palavras (EN + PT)
│   └── puzzles.tsx                   (sem uso) puzzle fixo antigo
│
├── types/
│   └── crossword.tsx                 Tipos compartilhados
│
├── README.md
├── package.json
├── app.json
├── babel.config.js
├── tsconfig.json
└── .npmrc                            legacy-peer-deps=true
```

> **Limpeza sugerida:** os arquivos `cd`, `npx` e `11.19.1` na raiz são restos de comandos digitados errado no terminal e podem ser apagados (`git rm cd npx 11.19.1`). `components/Keyboard.tsx` e `data/puzzles.tsx` não são mais usados por nenhuma tela.

---

# 🧠 Arquitetura

```text
UI (app/ + components/)
        ↓
Regras da partida (hooks/)
        ↓
Motor do jogo (game/)      Persistência (services/)
        ↓
Dados (data/) + Tipos (types/)
```

* **Componentes visuais não calculam nada de jogo.** Posição de palavras é responsabilidade do `game/crosswordGenerator.tsx`; XP, moedas e dicas são do hook.
* **`useCrosswordGame(words, maxWords = 6)`** recebe as palavras já preparadas para o modo e devolve tudo que a tela precisa (grade, seleção, `typeLetter`, `erase`, `revealNext`, `xp`, `coins`, `streak`, `dailyWords`, ...).
* O estado que muda rápido (grade, palavras concluídas, saldo) é espelhado em *refs* síncronos. Assim dois toques rápidos, por exemplo na dica, nunca enxergam um saldo desatualizado.

---

# 🔤 Modos de jogo (`game/wordModes.tsx`)

O gerador só lê o campo `answer`. Por isso a troca de direção acontece **antes** de gerar a grade: `prepareWords(ALL_WORDS, modo)` devolve as palavras com `clue` (a palavra a traduzir) e `answer` (a resposta na grade) já trocados. O jogo em si não muda.

* **Só A–Z na grade.** `maçã → MACA`, `bonito(a) → BONITO`, `meio ambiente → MEIOAMBIENTE`. O cartão continua mostrando `maçã`.
* **Ignoradas para evitar ambiguidade:** palavras sem tradução, cognatos onde pista = resposta (ex.: *hotel*), pistas repetidas (duas palavras com a mesma tradução) e respostas repetidas.
* Cada palavra preparada carrega `english`, `portuguese` e `clueLang` para os cartões e o áudio.

---

# ⚙️ Gerador de cruzadinha (`game/crosswordGenerator.tsx`)

```typescript
generateCrossword(words, {
  maxWords: 6,     // palavras por cruzadinha
  random: true,    // sorteia palavras e posições
  maxCols: 9,      // a tela comporta ~9 colunas de 34px
  maxRows: 13,
});
```

Modo `random: true` (o do jogo):

1. **Sorteia exatamente as palavras da partida**, curtas e longas com a mesma chance.
2. Tenta encaixar todas; se o grupo não couber, **sorteia outro**.
3. Cada palavra cruza uma já colocada, na posição com mais cruzamentos (**empates são sorteados**).
4. Só aceita grades dentro de `maxCols × maxRows` (palavra que não cabe na largura vai na vertical).
5. Entre 3 grades que encaixaram tudo, escolhe a mais compacta.
6. Se nada encaixar tudo, fica com a que encaixou mais palavras.

Sem `random`, mantém o comportamento antigo e determinístico (palavras mais longas primeiro).

> **Por que sortear exatamente as 6 palavras?** Uma primeira versão sorteava 15 e encaixava as que cruzavam mais fácil, o que fazia uma palavra (`beautiful`) entrar em ~59% das partidas e quase eliminava as curtas. Sortear só as 6 e refazer se não couberem deixou a distribuição proporcional ao banco.

**Limite de largura:** as células têm 34px fixos (`CrosswordCell.tsx`). Para permitir grades mais largas, seria preciso tornar o tamanho da célula responsivo à largura da tela.

---

# 🏆 Economia do jogo

| Ação | XP | Moedas | Onde ajustar |
|---|---|---|---|
| Completar uma palavra (digitando) | +10 | +5 🪙 | `XP_PER_WORD`, `COINS_PER_WORD` em `hooks/useCrosswordGame.tsx` |
| Completar a cruzadinha | +100 | +20 🪙 | `XP_PER_PUZZLE`, `COINS_PER_PUZZLE` |
| **Dica** (revelar 1 letra) | — | **−5 🪙** | `REVEAL_COST` |
| Palavra terminada com dica | 0 | 0 | conta como aprendida e vale para a meta do dia |
| Meta do dia (6 palavras) | — | +20 🪙 (1x por dia) | `DAILY_GOAL_WORDS`, `DAILY_GOAL_COINS` em `services/dailyProgress.tsx` |
| Presente de boas-vindas | — | 15 🪙 | `STARTER_COINS` em `services/progressStorage.tsx` |
| Subir de nível | a cada **200 XP** | — | `XP_PER_LEVEL` em `services/progressStorage.tsx` |

* Sem moedas suficientes, o botão de dica fica **bloqueado** e aparece um aviso.
* Só quem **nunca jogou** ganha o presente; quem já tinha dados salvos mantém o saldo.
* Palavras já concluídas na cruzadinha não pagam de novo se o jogador apagar e digitar outra vez.

---

# 🔥 Sequência diária e meta do dia (`services/dailyProgress.tsx`)

* **Meta do dia:** concluir 6 palavras (uma cruzadinha). Bater a meta dá o bônus de moedas, uma vez por dia.
* **Sequência:** cada dia com a meta cumprida soma 1. Passar um dia inteiro sem cumprir zera a sequência (o **recorde** fica guardado).
* O contador de palavras do dia **zera sozinho** na virada do dia.
* Datas usam o calendário local do aparelho (`AAAA-MM-DD`); os cálculos são imunes a fuso e horário de verão.
* Aparece na **tela inicial** (cartão com barra de progresso) e no **cabeçalho do jogo** (`🔥 3 · 🎯 4/6 hoje`), com aviso e confete ao cumprir a meta.

---

# 🔊 Pronúncia (`services/speech.tsx`)

* Usa `expo-speech` com voz `en-US` do próprio aparelho (sem internet).
* O botão 🔊 aparece no **cartão de palavra completa** (palavra e frase de exemplo).
* Na tela do jogo, o 🔊 aparece na pista **só no modo EN→PT** (a pista já é a palavra em inglês). No PT→EN ele não aparece, porque tocar o áudio entregaria a resposta.
* Se o aparelho não tiver voz em inglês instalada, o botão simplesmente não faz nada (nunca gera erro).

---

# 📚 Como adicionar palavras (`data/words.tsx`)

Adicione um bloco em `BEGINNER_WORDS`, `INTERMEDIATE_WORDS` ou `ADVANCED_WORDS` (o `ALL_WORDS` junta as três sozinho):

```typescript
{
  id: "dog",                      // único, minúsculo (é a chave do progresso salvo)
  answer: "DOG",                  // inglês, MAIÚSCULO, só A–Z, sem espaço
  clue: "A pet that barks.",      // legado: os modos de tradução ignoram este campo
  category: "home",
  difficulty: "beginner",
  translation: "cachorro",        // português, com acento normal
  pronunciation: "/dɔːɡ/",
  example: "The dog is in the garden."
}
```

**Obrigatórios para o modo de tradução:** `id`, `answer`, `translation`. O resto enriquece o cartão.

**Regras para não dar problema:**

* `id` **não pode repetir** (o progresso do jogador usa esse id).
* Não repita a mesma tradução em duas palavras (`house` e `home` → "casa"). O jogo descarta a repetida, mas o banco fica mais limpo sem isso.
* Evite cognatos idênticos (*hotel*): a pista seria igual à resposta.
* Palavras com mais de 13 letras não cabem na grade (`maxRows`).
* Categorias com nome em português para o cartão: `education, food, home, travel, family, feelings, technology, business, movies` (mapa `CATEGORY_PT` em `WordLearnedCard.tsx`; categoria nova aparece em inglês até ser adicionada ao mapa).

**Banco atual:** 26 palavras (12 beginner, 8 intermediate, 6 advanced). É pouco: o ideal para retenção é **300+ palavras**.

---

# 💾 Persistência

Salvo no aparelho com AsyncStorage, em uma única chave (`englishCrossword:progress`):

```typescript
type PlayerProgress = {
  xp: number;
  coins: number;
  level: number;
  wordsLearned: string[];        // ids das palavras já concluídas
  streak: number;                // dias seguidos com a meta cumprida
  bestStreak: number;
  lastGoalDate: string | null;   // AAAA-MM-DD
  dailyDate: string | null;      // dia a que dailyWords se refere
  dailyWords: number;            // palavras concluídas em dailyDate
};
```

Dados de versões antigas (sem os campos novos) são lidos normalmente. Dados corrompidos viram um perfil zerado, sem o presente de moedas.

---

# 🔐 Segurança e moedas

Hoje o saldo de moedas, o XP e a sequência ficam **só no celular**: dá para editar, perder ao reinstalar e burlar mudando a data do aparelho.

**Antes de vender moedas** é obrigatório:

1. Mover o progresso para um servidor (Supabase ou Firebase) com login.
2. Validar as compras pela Google Play / Apple (in-app purchase) **no servidor**.
3. Calcular XP, moedas e sequência no servidor, não no aparelho.

---

# 🗺️ Roadmap

## Fase 1 — MVP
- [x] Projeto Expo, tela inicial, tela do jogo, grade, pistas, validação

## Fase 2 — Jogabilidade
- [x] Seleção de palavras e destaque
- [x] Alternar horizontal/vertical
- [x] Cursor automático
- [x] Verificar palavras completas
- [x] Feedback visual (confetes, cartão, avisos)
- [x] Teclado nativo do celular

## Fase 3 — Gerador automático
- [x] Posicionamento e cruzamento automáticos
- [x] Validação de colisões
- [x] Sorteio de palavras e posições (cada partida é diferente)
- [x] Limite de tamanho para caber na tela
- [x] Pontuação da grade (cruzamentos e compacidade)
- [ ] Backtracking (hoje são várias tentativas sorteadas)
- [ ] Célula responsiva para permitir grades maiores

## Fase 4 — Aprendizado
- [x] Tradução nos dois sentidos (PT→EN, EN→PT, Misto)
- [x] Pronúncia (texto IPA + áudio)
- [x] Exemplos
- [x] Contagem de palavras aprendidas
- [ ] Tradução das frases de exemplo
- [ ] Tela de histórico de palavras aprendidas
- [ ] **Repetição espaçada:** priorizar palavras novas e as que o jogador errou

## Fase 5 — Gamificação
- [x] XP, níveis, moedas
- [x] Dicas que gastam moedas
- [x] Sequência diária e meta do dia
- [x] Moedas de presente
- [ ] Conquistas (achievements)
- [ ] Bônus por completar sem dicas

## Fase 6 — Online
- [ ] Login e Cloud Save
- [ ] Desafio diário com puzzle igual para todos (semente pela data)
- [ ] Ranking e perfil
- [ ] Compra de moedas (com validação no servidor)

## Conteúdo
- [ ] Banco com 300+ palavras
- [ ] Categorias e temas escolhíveis

---

# 🤖 Instruções para IA que for trabalhar no projeto

Este projeto é um jogo mobile em **React Native + Expo (SDK 57) + TypeScript**. A IA deve seguir estas regras:

## 1. Não alterar arquivos sem necessidade
Antes de modificar código: analisar a estrutura existente, identificar os arquivos relacionados, evitar mexer em componentes não relacionados e não substituir arquivos inteiros sem necessidade.

## 2. Manter TypeScript
Todo código tipado. Evitar `any`; preferir `type`/`interface`.

## 3. Separação de responsabilidades
```text
UI            → components/ e app/
Regras        → hooks/
Motor do jogo → game/
Serviços      → services/
Dados         → data/
Tipos         → types/
```
Não colocar lógica complexa dentro dos componentes visuais.

## 4. Motor da cruzadinha
O gerador fica isolado em `game/`. O componente visual nunca calcula a posição das palavras; isso é responsabilidade de `crosswordGenerator.tsx`.

## 5. Navegação
Usar **somente `expo-router`**. **Não importar `@react-navigation/*`**: a partir do SDK 56 o Metro bloqueia isso e o app não abre.

## 6. Dependências
Instalar sempre com `npx expo install <pacote>` (garante a versão compatível com o SDK). Não introduzir bibliotecas grandes sem necessidade; os confetes, por exemplo, usam só `Animated`.

## 7. Economia e progresso
Toda alteração de moedas/XP passa por `applyProgress` no hook (é síncrona e evita gastar o mesmo saldo duas vezes). Os valores ficam em constantes no topo do hook e de `services/dailyProgress.tsx`. **Não** espalhar números mágicos pela interface.

## 8. Idioma da interface
Todo texto visível ao jogador em **português do Brasil**. As palavras a aprender ficam em inglês.

## 9. Não quebrar o que existe
Verificar dependências, manter compatibilidade com a estrutura atual, corrigir erros de TypeScript e conferir que a grade nunca passa de `maxCols × maxRows`.

## 10. Código reutilizável
Preferir função, componente, hook ou utilitário a duplicar lógica.

---

# 🎯 Visão final

O objetivo não é criar apenas mais um jogo de palavras cruzadas, e sim uma **plataforma gamificada de aprendizado de inglês**, onde o jogador aprende vocabulário, significado, pronúncia e contexto através de uma experiência rápida, divertida e viciante.
