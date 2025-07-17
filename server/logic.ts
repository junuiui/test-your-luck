// server/logic.ts

export function assignRandom(names: string[]): string[] {
  const shuffled = [...names];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
