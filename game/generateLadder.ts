export function createLadder(rows: number, cols: number): number[][] {
  const ladder: number[][] = Array.from({ length: rows }, () =>
    new Array(cols).fill(0)
  );

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 1; c++) {
      if (Math.random() < 0.3 && ladder[r][c] === 0 && ladder[r][c + 1] === 0) {
        // 왼쪽 ↔ 오른쪽 연결
        ladder[r][c] = 1;       // 현재 → 오른쪽
        ladder[r][c + 1] = 2;   // 오른쪽 → 왼쪽
        c++; // 건너뛰기 (겹치지 않게)
      }
    }
  }

  return ladder;
}
