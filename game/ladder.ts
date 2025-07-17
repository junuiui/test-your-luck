function createLadder(rows: number, cols: number): number[][] {
  const ladder: number[][] = Array.from({ length: rows }, () =>
    new Array(cols).fill(0)
  );

  for (let r = 0; r < rows; r++) {
    // 이 줄에 가로선 몇 개 넣을지 0 혹은 1개로 랜덤 결정
    const horizontalCount = Math.random() < 0.5 ? 0 : 1;

    if (horizontalCount === 1) {
      // 0~cols-2 사이 위치 랜덤 선택해서 한 개만 가로선 넣기
      const pos = Math.floor(Math.random() * (cols - 1));

      // 해당 위치가 비어있고 다음 칸도 비어야 함
      if (ladder[r][pos] === 0 && ladder[r][pos + 1] === 0) {
        ladder[r][pos] = 1;
        ladder[r][pos + 1] = 2;
      }
    }
    // horizontalCount가 0이면 이 줄은 아예 가로선 없이 그냥 세로로 쭉 내려가는 라인임
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
