function createLadder(rows, cols) {
    var ladder = Array.from({ length: rows }, function () {
        return new Array(cols).fill(0);
    });
    var connected = Array.from({ length: cols }, function (_, i) { return i; });
    function find(a) {
        if (connected[a] !== a)
            connected[a] = find(connected[a]);
        return connected[a];
    }
    function union(a, b) {
        var rootA = find(a);
        var rootB = find(b);
        if (rootA !== rootB)
            connected[rootB] = rootA;
    }
    // 1. 연결 보장용 가로선 배치
    var connects = 0;
    while (connects < cols - 1) {
        var r = Math.floor(Math.random() * (rows - 2)) + 1;
        var c = Math.floor(Math.random() * (cols - 1));
        if (ladder[r][c] === 0 &&
            ladder[r][c + 1] === 0 &&
            find(c) !== find(c + 1)) {
            ladder[r][c] = 1;
            ladder[r][c + 1] = 2;
            union(c, c + 1);
            connects++;
        }
    }
    // 2. 추가 가로선 랜덤 배치 (각 줄에 3개 이상 목표)
    for (var r = 1; r < rows - 1; r++) {
        var count = 0;
        var tries = 0;
        while (count < 3 && tries < 100) {
            var c = Math.floor(Math.random() * (cols - 1));
            if (ladder[r][c] === 0 &&
                ladder[r][c + 1] === 0 &&
                (c === 0 || ladder[r][c - 1] !== 1) &&
                (c + 2 >= cols || ladder[r][c + 2] !== 2)) {
                ladder[r][c] = 1;
                ladder[r][c + 1] = 2;
                count++;
            }
            tries++;
        }
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
