import {
  beforeEach, describe, expect, it, test, vi,
} from 'vitest';
import createGameboard, { getPlayerTurn } from './game-board';
import createShip from './ships';

describe('gameboard function test cases', () => {
  let gameboard;
  let ship;
  beforeEach(() => {
    gameboard = createGameboard();
    ship = createShip(4);
  });
  test('Placing ships at specific coordinates', () => {
    gameboard.placeShip(ship, 0, 4);
    expect(gameboard.board[0][4]).toContain(ship);
    expect(gameboard.board[0][5]).toContain(ship);
    expect(gameboard.board[0][6]).toContain(ship);
    expect(gameboard.board[0][7]).toContain(ship);
  });
  test('checks if player switch works', () => {
    gameboard.placeShip(ship, 0, 4);
    gameboard.receiveAttack(9, 9);
    expect(getPlayerTurn()).toBe('bot');
  });
  test('does not allow new ship to overwrite existing ship', () => {
    const shipTwo = createShip(3);
    gameboard.placeShip(ship, 0, 4);
    gameboard.placeShip(shipTwo, 0, 7);
    expect(gameboard.board[0][4]).toContain(ship);
    expect(gameboard.board[0][5]).toContain(ship);
    expect(gameboard.board[0][6]).toContain(ship);
    expect(gameboard.board[0][7]).toContain(ship);
  });
  test("Ships won't be placed if there is no room in the gameboard", () => {
    gameboard.placeShip(ship, 1, 7);
    // expect(gameboard.board[1][7]).toEqual();
    expect(gameboard.board[1][7]).toEqual();
    expect(gameboard.board[1][8]).toEqual();
    expect(gameboard.board[1][9]).toEqual();
  });
  test("Ships won't be placed outside the gameboard", () => {
    gameboard.placeShip(ship, 1, -1);
    expect(gameboard.board[1][0]).toEqual();
  });
  test("Ships won't be placed adjacent", () => {
    gameboard.placeShip(ship, 3, 3);
    expect(gameboard.board[3][3]).toContain(ship);
    expect(gameboard.board[3][7]).toBe('invalid');
    expect(gameboard.board[4][3]).toBe('invalid');
    expect(gameboard.board[4][7]).toBe('invalid');
    expect(gameboard.board[2][2]).toBe('invalid');
    expect(gameboard.board[2][8]).toBe('invalid');
  });
  test('receiveAttack updates ship hit value if a ship got hit', () => {
    gameboard.placeShip(ship, 0, 1);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    expect(gameboard.board[0][1].getNumOfHits()).toBe(2);
    expect(gameboard.board[0][2].getNumOfHits()).toBe(2);
    expect(gameboard.board[0][3].getNumOfHits()).toBe(2);
    expect(gameboard.board[0][4].getNumOfHits()).toBe(2);
  });
  test("receiveAttack doesn't update hit value if called twice on same coordinates", () => {
    gameboard.placeShip(ship, 0, 1);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 1);
    expect(gameboard.board[0][1].getNumOfHits()).toBe(1);
    expect(gameboard.board[0][2].getNumOfHits()).toBe(1);
    expect(gameboard.board[0][3].getNumOfHits()).toBe(1);
    expect(gameboard.board[0][4].getNumOfHits()).toBe(1);
  });
  test('receiveAttack records a miss', () => {
    gameboard.placeShip(ship, 0, 1);
    gameboard.receiveAttack(1, 5);
    gameboard.receiveAttack(2, 6);
    expect(gameboard.missedShots[0]).toStrictEqual({ row: 1, col: 5 });
    expect(gameboard.missedShots[1]).toStrictEqual({ row: 2, col: 6 });
  });
  test("receiveAttack doesn't record the same miss twice", () => {
    gameboard.placeShip(ship, 0, 1);
    gameboard.receiveAttack(4, 5);
    gameboard.receiveAttack(4, 5);
    expect(gameboard.missedShots[0]).toStrictEqual({ row: 4, col: 5 });
    expect(gameboard.missedShots[1]).toStrictEqual();
  });
  // test("test if random ships placement doesnt place ship beyond the board", () => {
  //   gameboard.placeShipRandomly();
  //   expect(gameboard.board)
  // });
  // this test is not working because of the modal inside the if shipSunk === 5 condition
  // test('report if all ships sunk', () => {
  //   const secondShip = createShip(2);
  //   const thirdShip = createShip(2);
  //   const fourthShip = createShip(2);
  //   const fifthShip = createShip(2);
  //   gameboard.placeShip(0, 1, ship);
  //   gameboard.placeShip(1, 1, secondShip);
  //   gameboard.placeShip(2, 1, thirdShip);
  //   gameboard.placeShip(3, 1, fourthShip);
  //   gameboard.placeShip(4, 1, fifthShip);
  //   gameboard.receiveAttack(0, 1);
  //   gameboard.receiveAttack(0, 2);
  //   gameboard.receiveAttack(0, 3);
  //   gameboard.receiveAttack(0, 4);
  //   gameboard.receiveAttack(1, 1);
  //   gameboard.receiveAttack(1, 2);
  //   gameboard.receiveAttack(2, 1);
  //   gameboard.receiveAttack(2, 2);
  //   gameboard.receiveAttack(3, 1);
  //   gameboard.receiveAttack(3, 2);
  //   gameboard.receiveAttack(4, 1);
  //   expect(gameboard.receiveAttack(4, 2)).toStrictEqual('Game Over');
  // });
});
