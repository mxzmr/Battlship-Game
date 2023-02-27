/* eslint-disable no-use-before-define */
import { showGameOverModal } from './ui';

let playerTurn = 'player';
export const getPlayerTurn = () => playerTurn;

export default function createGameboard() {
  let board = Array.from(Array(10), () => Array(10));
  let missedShots = [];
  let shipSunk = 0;
  // eslint-disable-next-line default-param-last
  function placeShip(ship, row, col) {
    let canShipBePlaced = false;
    for (let i = col; i < ship.length + col; i += 1) {
      if (board[row][i] || col < 0 || row < 0 || ship.length + col >= 10) break;
      else if (i === ship.length + col - 1) canShipBePlaced = true;
    }
    if (canShipBePlaced === true) {
      for (let i = col; i < ship.length + col; i += 1) {
        board[row][i] = { ...ship, beenHit: false };
      }
      blockAdjacentShipGrids(ship.length, row, col);
    }
  }

  function placeShipRandomly(ship) {
    let canShipBePlaced = false;
    while (canShipBePlaced === false) {
      const randomRow = Math.floor(Math.random() * 10);
      const randomCol = Math.floor(Math.random() * 10);
      for (let i = randomCol; i < ship.length + randomCol; i += 1) {
        if (board[randomRow][i] || ship.length + randomCol > 10) break;
        else if (i === ship.length + randomCol - 1) canShipBePlaced = true;
      }
      if (canShipBePlaced === true) {
        for (let i = randomCol; i < ship.length + randomCol; i += 1) {
          board[randomRow][i] = { ...ship, beenHit: false };
        }
        blockAdjacentShipGrids(ship.length, randomRow, randomCol);
      }
    }
  }
  function blockAdjacentShipGrids(shipLength, row, col) {
    const adjacentRow = row > 0 ? row - 1 : row;
    const rowLoopLimit = row < 9 ? 3 : 2;
    const adjacentCol = col === 0 ? col : col - 1;
    const colLoopLimit = col + shipLength > 9 ? col : col + 2;
    for (let i = adjacentRow; i < adjacentRow + rowLoopLimit; i += 1) {
      for (let j = adjacentCol; j < shipLength + colLoopLimit; j += 1) {
        if (!board[i][j]) board[i][j] = 'invalid';
      }
    }
  }
  function receiveAttack(row, col) {
    if (typeof board[row][col] === 'object' && !board[row][col].beenHit) {
      board[row][col].hit();
      board[row][col].beenHit = true;
      if (board[row][col].isSunk() === true && shipSunk < 5) shipSunk += 1;
      if (shipSunk === 5) {
        showGameOverModal(playerTurn);
        board = Array.from(Array(10), () => Array(10));
        missedShots = [];
        shipSunk = 0;
      }
    } else if (typeof board[row][col] !== 'object' && board[row][col] !== 'miss') {
      board[row][col] = 'miss';
      missedShots.push({ row, col });
      const changePlayerTurn = playerTurn === 'player' ? playerTurn = 'bot' : playerTurn = 'player';
      // console.log(playerTurn)
      return changePlayerTurn;
    }
    return board;
  }

  return {
    placeShip,
    placeShipRandomly,
    receiveAttack,
    board,
    missedShots,
  };
}
