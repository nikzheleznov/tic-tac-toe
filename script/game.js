import { state } from "./state.js";

export function updateBoard() {
  document.querySelectorAll(".cell").forEach((cell) => {
    const index = cell.getAttribute("data-index");
    cell.textContent = state.board[index] || "";
  });
}

export function checkWin(player) {
  return state.winConditions.some((combo) =>
    combo.every((index) => state.board[index] === player)
  );
}

export function checkDraw() {
  return state.board.every((cell) => cell !== null);
}
