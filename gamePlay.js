const statusElement = document.querySelector(".status");

let gameRunning = true;
let currentPlayer = "1";
let currentState = Array(25).fill("");

const winMessage = () => `Player ${currentPlayer} has won!!!`;
const drawMessage = () => `Game ended in a draw!`;
const getCurrentPlayerTurn = () => `Player ${currentPlayer} turn`;
statusElement.innerHTML = getCurrentPlayerTurn();

const winOptions = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
  currentState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
};

const switchPlayers = (player) => {
  switch (player) {
    case "1":
      currentPlayer = "2";
      break;
    case "2":
      currentPlayer = "3";
      break;
    case "3":
      currentPlayer = "4";
      break;
    case "4":
      currentPlayer = "1";
      break;
  }
};

const handlePlayerChange = () => {
  switchPlayers(currentPlayer);
  statusElement.innerHTML = getCurrentPlayerTurn();
};

const chooseWinner = () => {
  // check the current play against the winning conditions
  let roundWon = false;
  for (let i = 0; i <= 11; i++) {
    const winOption = winOptions[i];
    let a = currentState[winOption[0]];
    let b = currentState[winOption[1]];
    let c = currentState[winOption[2]];
    let d = currentState[winOption[3]];
    let e = currentState[winOption[4]];
    if ([a, b, c, d, e].every((val) => val === "")) {
      continue;
    }
    //game won
    if (new Set([a, b, c, d, e]).size === 1 && ![a, b, c, d, e].includes("")) {
      roundWon = true;
      break;
    }
  }

  // end game if win or draw

  if (roundWon) {
    statusElement.innerHTML = winMessage();
    statusElement.style.color = "green";
    gameRunning = false;
    return;
  }
  let roundDraw = !currentState.includes("");
  if (roundDraw) {
    statusElement.innerHTML = drawMessage();
    statusElement.style.color = "orange";
    gameRunning = false;
    return;
  }

  handlePlayerChange();
};

const handleClick = (clickedCellEvent) => {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  // game has already been won or you clicked a already played cell
  if (currentState[clickedCellIndex] !== "" || !gameRunning) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  chooseWinner();
};

const resetGame = () => {
  gameRunning = true;
  currentPlayer = "1";
  currentState = Array(25).fill("");
  statusElement.innerHTML = getCurrentPlayerTurn();
  statusElement.style.color = "black";
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
};

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleClick));

document.querySelector(".reset-game").addEventListener("click", resetGame);
