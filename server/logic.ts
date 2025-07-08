export function assignRandom(names: string[]): string[] {
  return [...names].sort(() => Math.random() - 0.5);
}

export function generateCode(): string {
  return Math.random().toString(36).substring(2, 7).toUpperCase(); // 예: "A1Z9P"
}
