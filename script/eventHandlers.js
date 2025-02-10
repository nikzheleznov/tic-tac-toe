import { state, resetGame } from "./state.js";
import { updateBoard, checkWin, checkDraw } from "./game.js";

export function cellClick(e) {
  if (state.computerDebounce || !state.gameActive) return;
  const index = parseInt(e.target.getAttribute("data-index"), 10);
  if (state.board[index] !== null) return;
  state.board[index] = state.currentPlayer;
  updateBoard();
  if (checkWin(state.currentPlayer)) {
    document.getElementById(
      "gameStatus"
    ).textContent = `${state.currentPlayer} wins!`;
    state.gameActive = false;
    return;
  }
  if (checkDraw()) {
    document.getElementById("gameStatus").textContent = "Draw!";
    state.gameActive = false;
    return;
  }
  state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
  document.getElementById(
    "gameStatus"
  ).textContent = `Turn: ${state.currentPlayer}`;
  if (
    state.gameMode === "computer" &&
    state.currentPlayer === "O" &&
    state.gameActive
  ) {
    state.computerDebounce = true;
    setTimeout(() => {
      computerMove();
      state.computerDebounce = false;
    }, 500);
  }
}

export function computerMove() {
  const available = state.board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);
  if (!available.length) return;
  const randomIndex = available[Math.floor(Math.random() * available.length)];
  state.board[randomIndex] = "O";
  updateBoard();
  if (checkWin("O")) {
    document.getElementById("gameStatus").textContent = "Computer wins!";
    state.gameActive = false;
    return;
  }
  if (checkDraw()) {
    document.getElementById("gameStatus").textContent = "Draw!";
    state.gameActive = false;
    return;
  }
  state.currentPlayer = "X";
  document.getElementById(
    "gameStatus"
  ).textContent = `Turn: ${state.currentPlayer}`;
}

export function backToMenu() {
  document.getElementById("game").style.display = "none";
  document.getElementById("menu").style.display = "block";
  resetGame();
  updateBoard();
}

export function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  resetGame();
  updateBoard();
  document.getElementById(
    "gameStatus"
  ).textContent = `Turn: ${state.currentPlayer}`;
}
