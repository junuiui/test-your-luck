"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLadder = createLadder;
function createLadder(rows, cols) {
    var ladder = Array.from({ length: rows }, function () {
        return new Array(cols).fill(0);
    });
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols - 1; c++) {
            if (Math.random() < 0.3 && ladder[r][c] === 0 && ladder[r][c + 1] === 0) {
                // 왼쪽 ↔ 오른쪽 연결
                ladder[r][c] = 1; // 현재 → 오른쪽
                ladder[r][c + 1] = 2; // 오른쪽 → 왼쪽
                c++; // 건너뛰기 (겹치지 않게)
            }
        }
    }
    return ladder;
}
