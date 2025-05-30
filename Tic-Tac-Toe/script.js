const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'A'; // Player A starts
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const playerSymbols = {
  A: 'X',
  B: 'O'
};

const winningCombinations = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal from top-left
  [2, 4, 6]  // diagonal from top-right
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] !== '' || !gameActive) return;

  const symbol = playerSymbols[currentPlayer];
  gameState[index] = symbol;
  cell.textContent = symbol;
  cell.classList.add('taken');

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'A' ? 'B' : 'A';
  const nextSymbol = playerSymbols[currentPlayer];
  statusText.textContent = `Player ${currentPlayer}'s Turn ( ${nextSymbol} )`;
}


function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'A';
  statusText.textContent = "Player A's Turn ( X )";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
statusText.textContent = "Player A's Turn ( X )";