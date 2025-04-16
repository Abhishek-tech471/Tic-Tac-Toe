let board = Array(9).fill("");
let turn = "0";
let gameOver = false;
let player1 = "";
let player2 = "";

const boardElement = document.getElementById("board");
const status = document.getElementById("status");
const turnIndicator = document.getElementById("turn-indicator");

function startGame() {
  player1 = document.getElementById("player1").value || "Player 1";
  player2 = document.getElementById("player2").value || "Player 2";

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";

  resetGame();
}

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, i) => {
    const cellDiv = document.createElement("div");
    cellDiv.className = "cell";
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => makeMove(i));
    boardElement.appendChild(cellDiv);
  });

  turnIndicator.textContent = `${turn === "0" ? player1 : player2}'s Turn (${turn})`;
}

function makeMove(index) {
  if (board[index] !== "" || gameOver) return;

  board[index] = turn;
  renderBoard();
  checkWinner();
  if (!gameOver) {
    turn = turn === "0" ? "x" : "0";
    turnIndicator.textContent = `${turn === "0" ? player1 : player2}'s Turn (${turn})`;
  }
  
}

function checkWinner() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let combo of wins) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      const winner = board[a] === "0" ? player1 : player2;
      status.textContent = `${winner} (${board[a]}) wins!`;
      gameOver = true;
      return;
    }
  }

  if (!board.includes("")) {
    status.textContent = "Match tie!";
    gameOver = true;
  }
}

function resetGame() {
  board = Array(9).fill("");
  turn = "0";
  gameOver = false;
  status.textContent = "";
  renderBoard();
}
