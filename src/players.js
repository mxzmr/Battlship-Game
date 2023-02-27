import createGameboard from './game-board';
import createShip from './ships';

export function createPlayer() {
  const playerBoard = createGameboard();
  const carrier = createShip(5);
  const battleship = createShip(4);
  const cruiser = createShip(3);
  const submarine = createShip(3);
  const destroyer = createShip(2);
  // const randomRow = Math.floor(Math.random() * 10);
  // const randomCol = Math.floor(Math.random() * 10);
  function attack(grid, opponentBoard) {
    // const clickTarget = event.target;
    const gridItem = grid;
    const gridItemRow = Math.floor(grid.id / 10);
    const gridItemCoL = grid.id % 10;
    // const combined = parseInt(gridItemRow.toString() + gridItemCoL.toString(), 10);
    opponentBoard.receiveAttack(gridItemRow, gridItemCoL);
    // console.log(gridItem[combined]);
    if (gridItem.style && typeof opponentBoard.board[gridItemRow][gridItemCoL] === 'object') {
      gridItem.style.background = 'red';
    }
    if (gridItem.style && opponentBoard.board[gridItemRow][gridItemCoL] === 'miss') {
      gridItem.style.background = 'gray';
    }
  }
  // const generateShips = () => {
  playerBoard.placeShipRandomly(carrier);
  playerBoard.placeShipRandomly(battleship);
  playerBoard.placeShipRandomly(cruiser);
  playerBoard.placeShipRandomly(submarine);
  playerBoard.placeShipRandomly(destroyer);
  // };
  return {
    name: 'player',
    // generateShips,
    attack,
    playerBoard,
    carrier,
    battleship,
    cruiser,
    submarine,
    destroyer,
  };
}
export function createBot() {
  // create a test then a function to place ships randomly withing the board
  const playerBoard = createGameboard();
  const carrier = createShip(5);
  const battleship = createShip(4);
  const cruiser = createShip(3);
  const submarine = createShip(3);
  const destroyer = createShip(2);
  function attack(opponentBoard) {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    const combined = parseInt(row.toString() + col.toString(), 10);
    opponentBoard.receiveAttack(row, col);
    if (typeof window !== 'undefined') {
      const gridItem = document.querySelectorAll('.grid-item');
      if (gridItem[combined].style && typeof opponentBoard.board[row][col] === 'object') {
        gridItem[combined].style.background = 'red';
      }
      if (gridItem[combined].style && opponentBoard.board[row][col] === 'miss') {
        gridItem[combined].style.background = 'gray';
      }
    }
  }
  // const generateShips = () => {
  playerBoard.placeShipRandomly(carrier);
  playerBoard.placeShipRandomly(battleship);
  playerBoard.placeShipRandomly(cruiser);
  playerBoard.placeShipRandomly(submarine);
  playerBoard.placeShipRandomly(destroyer);
  // };
  return {
    name: 'bot',
    // generateShips,
    attack,
    playerBoard,
    carrier,
    battleship,
    cruiser,
    submarine,
    destroyer,
  };
}
