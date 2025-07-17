function createLadder(rows, cols) {
    var ladder = Array.from({ length: rows }, function () {
        return new Array(cols).fill(0);
    });
    for (var r = 0; r < rows; r++) {
        // 이 줄에 가로선 몇 개 넣을지 0 혹은 1개로 랜덤 결정
        var horizontalCount = Math.random() < 0.5 ? 0 : 1;
        if (horizontalCount === 1) {
            // 0~cols-2 사이 위치 랜덤 선택해서 한 개만 가로선 넣기
            var pos = Math.floor(Math.random() * (cols - 1));
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
function drawLadderCanvas(ladder, canvas) {
    var ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    var cols = ladder[0].length;
    var rows = ladder.length;
    var width = canvas.width;
    var height = canvas.height;
    var colSpacing = width / (cols + 1);
    var rowSpacing = height / (rows + 1);
    ctx.clearRect(0, 0, width, height);
    // 세로줄
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;
    for (var c = 0; c < cols; c++) {
        var x = colSpacing * (c + 1);
        ctx.beginPath();
        ctx.moveTo(x, rowSpacing);
        ctx.lineTo(x, rowSpacing * rows);
        ctx.stroke();
    }
    // 가로줄
    ctx.strokeStyle = "#ff5722"; // 가로선 색깔 변경 (주황색)
    ctx.lineWidth = 3;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols - 1; c++) {
            if (ladder[r][c] === 1) {
                var x1 = colSpacing * (c + 1);
                var x2 = colSpacing * (c + 2);
                var y = rowSpacing * (r + 1);
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
var playerInput = document.getElementById("playerCount");
var generateBtn = document.getElementById("generateBtn");
var ladderArea = document.getElementById("ladderArea");
generateBtn.addEventListener("click", function () {
    var count = parseInt(playerInput.value);
    if (isNaN(count) || count < 2 || count > 10) {
        alert("2명 이상 10명 이하로 입력해주세요.");
        return;
    }
    ladderArea.innerHTML = ""; // reset
    var container = document.createElement("div");
    container.className = "ladder-container";
    var topInputs = document.createElement("div");
    topInputs.className = "row-inputs";
    var bottomInputs = document.createElement("div");
    bottomInputs.className = "row-inputs";
    for (var i = 0; i < count; i++) {
        var topInput = document.createElement("input");
        topInput.placeholder = "\uC774\uB984 ".concat(i + 1);
        topInputs.appendChild(topInput);
        var bottomInput = document.createElement("input");
        bottomInput.placeholder = "\uACB0\uACFC ".concat(i + 1);
        bottomInputs.appendChild(bottomInput);
    }
    var canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 400;
    var ladder = createLadder(10, count); // rows, cols
    drawLadderCanvas(ladder, canvas);
    container.appendChild(topInputs);
    container.appendChild(canvas);
    container.appendChild(bottomInputs);
    ladderArea.appendChild(container);
});
