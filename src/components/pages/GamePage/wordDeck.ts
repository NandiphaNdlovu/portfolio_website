export type GameStatus = "ready" | "running" | "paused" | "over" | "won";
export type Random = () => number;


export interface GameProgress {
  collected: string[];
  status: GameStatus;
}

export function shuffle<T>(items: T[], random: Random = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function drawWord(deck: string[], words: string[], random: Random) {
  const pile = deck.length > 0 ? deck : shuffle(words, random);
  return { word: pile[pile.length - 1], deck: pile.slice(0, -1) };
}

export function levelForWords(wordCount: number, wordsPerLevel: number): number {
  return Math.floor(wordCount / wordsPerLevel);
}
