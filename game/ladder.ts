function createLadder(rows: number, cols: number): number[][] {
  const ladder: number[][] = Array.from({ length: rows }, () =>
    new Array(cols).fill(0)
  );

  const connected = Array.from({ length: cols }, (_, i) => i);

  function find(a: number): number {
    if (connected[a] !== a) connected[a] = find(connected[a]);
    return connected[a];
  }

  function union(a: number, b: number) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) connected[rootB] = rootA;
  }

  // 1. 연결 보장용 가로선 배치
  let connects = 0;
  while (connects < cols - 1) {
    const r = Math.floor(Math.random() * (rows - 2)) + 1;
    const c = Math.floor(Math.random() * (cols - 1));

    if (
      ladder[r][c] === 0 &&
      ladder[r][c + 1] === 0 &&
      find(c) !== find(c + 1)
    ) {
      ladder[r][c] = 1;
      ladder[r][c + 1] = 2;
      union(c, c + 1);
      connects++;
    }
  }

  // 2. 추가 가로선 랜덤 배치 (각 줄에 3개 이상 목표)
  for (let r = 1; r < rows-1; r++) {
    let count = 0;
    let tries = 0;
    while (count < 3 && tries < 100) {
      const c = Math.floor(Math.random() * (cols - 1));
      if (
        ladder[r][c] === 0 &&
        ladder[r][c + 1] === 0 &&
        (c === 0 || ladder[r][c - 1] !== 1) &&
        (c + 2 >= cols || ladder[r][c + 2] !== 2)
      ) {
        ladder[r][c] = 1;
        ladder[r][c + 1] = 2;
        count++;
      }
      tries++;
    }
  }

  return ladder;
}

function drawLadderCanvas(ladder: number[][], canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const cols = ladder[0].length;
  const rows = ladder.length;
  const width = canvas.width;
  const height = canvas.height;

  const colSpacing = width / (cols + 1);
  const rowSpacing = height / (rows + 1);

  ctx.clearRect(0, 0, width, height);

  // 세로줄
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 2;
  for (let c = 0; c < cols; c++) {
    const x = colSpacing * (c + 1);
    ctx.beginPath();
    ctx.moveTo(x, rowSpacing);
    ctx.lineTo(x, rowSpacing * rows);
    ctx.stroke();
  }

  // 가로줄
  ctx.strokeStyle = "#ff5722"; // 가로선 색깔 변경 (주황색)
  ctx.lineWidth = 3;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 1; c++) {
      if (ladder[r][c] === 1) {
        const x1 = colSpacing * (c + 1);
        const x2 = colSpacing * (c + 2);
        const y = rowSpacing * (r + 1);

        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        // 선 끝에 원 그리기 (포인트 강조)
        ctx.fillStyle = "#ff5722";
        ctx.beginPath();
        ctx.arc(x1, y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x2, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

// DOM 조작
const playerInput = document.getElementById("playerCount") as HTMLInputElement;
const generateBtn = document.getElementById("generateBtn") as HTMLButtonElement;
const ladderArea = document.getElementById("ladderArea") as HTMLDivElement;

generateBtn.addEventListener("click", () => {
  const count = parseInt(playerInput.value);
  if (isNaN(count) || count < 2 || count > 10) {
    alert("2명 이상 10명 이하로 입력해주세요.");
    return;
  }

  ladderArea.innerHTML = ""; // reset
  const container = document.createElement("div");
  container.className = "ladder-container";

  const topInputs = document.createElement("div");
  topInputs.className = "row-inputs";
  const bottomInputs = document.createElement("div");
  bottomInputs.className = "row-inputs";

  for (let i = 0; i < count; i++) {
    const topInput = document.createElement("input");
    topInput.placeholder = `이름 ${i + 1}`;
    topInputs.appendChild(topInput);

    const bottomInput = document.createElement("input");
    bottomInput.placeholder = `결과 ${i + 1}`;
    bottomInputs.appendChild(bottomInput);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 400;

  const ladder = createLadder(10, count); // rows, cols
  drawLadderCanvas(ladder, canvas);

  container.appendChild(topInputs);
  container.appendChild(canvas);
  container.appendChild(bottomInputs);
  ladderArea.appendChild(container);
});
