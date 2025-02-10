let board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;
let gameMode = "";
let computerDebounce = false;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function updateBoard() {
  document.querySelectorAll(".cell").forEach((cell) => {
    const index = cell.getAttribute("data-index");
    cell.textContent = board[index] || "";
  });
}

function checkWin(player) {
  return winConditions.some((condition) =>
    condition.every((index) => board[index] === player)
  );
}

function checkDraw() {
  return board.every((cell) => cell !== null);
}

function cellClick(e) {
  if (computerDebounce || !gameActive) return;

  const index = parseInt(e.target.getAttribute("data-index"), 10);
  if (board[index] !== null) return;

  board[index] = currentPlayer;
  updateBoard();

  if (checkWin(currentPlayer)) {
    document.getElementById(
      "gameStatus"
    ).textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    document.getElementById("gameStatus").textContent = "Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("gameStatus").textContent = `Turn: ${currentPlayer}`;

  if (gameMode === "computer" && currentPlayer === "O" && gameActive) {
    computerDebounce = true;
    setTimeout(() => {
      computerMove();
      computerDebounce = false;
    }, 500);
  }
}

function computerMove() {
  const available = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);

  if (!available.length) return;

  const randomIndex = available[Math.floor(Math.random() * available.length)];
  board[randomIndex] = "O";
  updateBoard();

  if (checkWin("O")) {
    document.getElementById("gameStatus").textContent = "Computer wins!";
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    document.getElementById("gameStatus").textContent = "Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  document.getElementById("gameStatus").textContent = `Turn: ${currentPlayer}`;
}

function resetGame() {
  board = Array(9).fill(null);
  gameActive = true;
  currentPlayer = "X";
  computerDebounce = false;
  document.getElementById("gameStatus").textContent = `Turn: ${currentPlayer}`;
  updateBoard();
}

function backToMenu() {
  document.getElementById("game").style.display = "none";
  document.getElementById("menu").style.display = "block";
  resetGame();
}

function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  resetGame();
}

document.getElementById("humanBtn").addEventListener("click", () => {
  gameMode = "human";
  startGame();
});

document.getElementById("computerBtn").addEventListener("click", () => {
  gameMode = "computer";
  startGame();
});

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", cellClick);
});

document.getElementById("backBtn").addEventListener("click", backToMenu);
document.getElementById("resetBtn").addEventListener("click", resetGame);
