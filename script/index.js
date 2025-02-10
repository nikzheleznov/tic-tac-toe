import { state } from "./state.js";
import { cellClick, backToMenu, startGame } from "./eventHandlers.js";
import { updateBoard } from "./game.js";

document.getElementById("humanBtn").addEventListener("click", () => {
  state.gameMode = "human";
  startGame();
});

document.getElementById("computerBtn").addEventListener("click", () => {
  state.gameMode = "computer";
  startGame();
});

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", cellClick);
});

document.getElementById("backBtn").addEventListener("click", backToMenu);
document.getElementById("resetBtn").addEventListener("click", () => {
  resetGame();
  updateBoard();
  document.getElementById(
    "gameStatus"
  ).textContent = `Turn: ${state.currentPlayer}`;
});
