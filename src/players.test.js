import { describe, expect, it, test, vi, beforeEach } from 'vitest';
import createShip from './ships';
import { createPlayer, createBot } from './players';

describe('Player function test cases', () => {
  const gridItemHit = { id: 1 };
  const gridItemMiss = { id: 22 };
  let bot;
  let playerOne;
  let ship;
  beforeEach(() => {
    ship = createShip(2);
    playerOne = createPlayer();
    bot = createBot();
  });
  test('Check if player have 5 ships', () => {
    expect(playerOne.carrier).toMatchObject({ length: 5 });
    expect(playerOne.battleship).toMatchObject({ length: 4 });
    expect(playerOne.cruiser).toMatchObject({ length: 3 });
    expect(playerOne.submarine).toMatchObject({ length: 3 });
    expect(playerOne.destroyer).toMatchObject({ length: 2 });
  });
  // can't test this tests because the bot ships are randomly generated
  // test('check if ship is placed at the right spot', () => {
  //   playerOne.playerBoard.placeShip(playerOne.carrier, 0, 1);
  //   expect(playerOne.playerBoard.board[0][1]).toContain(playerOne.carrier);
  //   expect(playerOne.playerBoard.board[0][5]).toContain(playerOne.carrier);
  // });
  // test('Player attack bot ships', () => {
  //   bot.playerBoard.placeShip(ship, 0, 1);
  //   playerOne.attack(gridItemHit, bot.playerBoard);
  //   expect(bot.playerBoard.board[0][1].beenHit).toBe(true);
  // });
  // test('Player attack misses bot ships', () => {
  //   playerOne.attack(gridItemMiss, bot.playerBoard);
  //   expect(bot.playerBoard.board[2][2]).toEqual('miss');
  //   expect(bot.playerBoard.missedShots[0]).toStrictEqual({ row: 2, col: 2 });
  // });
});

describe('AI function test cases', () => {
  // const player = createPlayer();
  let ship;
  let bot;
  let opponentBoard;
  beforeEach(() => {
    opponentBoard = {
      receiveAttack: vi.fn(),
      missedShots: [],
      board: Array.from(Array(10), () => Array(10)),
    };
    bot = createBot();
    ship = createShip(3);
  });
  test('Check if player have 5 ships', () => {
    expect(bot.carrier).toMatchObject({ length: 5 });
    expect(bot.battleship).toMatchObject({ length: 4 });
    expect(bot.cruiser).toMatchObject({ length: 3 });
    expect(bot.submarine).toMatchObject({ length: 3 });
    expect(bot.destroyer).toMatchObject({ length: 2 });
  });
  test('Attack player ships ', () => {
    bot.attack(opponentBoard);
    expect(opponentBoard.receiveAttack)
      .toHaveBeenCalledTimes(1);
    expect(opponentBoard.receiveAttack)
      .toHaveBeenCalledWith(expect.any(Number), expect.any(Number));
    expect(opponentBoard.receiveAttack.mock.calls[0][0])
      .toBeGreaterThanOrEqual(0);
    expect(opponentBoard.receiveAttack.mock.calls[0][0])
      .toBeLessThanOrEqual(9);
    expect(opponentBoard.receiveAttack.mock.calls[0][1])
      .toBeGreaterThanOrEqual(0);
    expect(opponentBoard.receiveAttack.mock.calls[0][1])
      .toBeLessThanOrEqual(9);
  });
  // test('Place ships at random coordinated in the gameboard ', () => {
  //   const randomRow = Math.floor(Math.random() * 10);
  //   const randomCol = Math.floor(Math.random() * 10);
  //   bot.playerBoard.placeShip(ship, randomRow, randomCol);
  //   expect(bot.playerBoard.board[randomRow][randomCol]).toContain(ship);
  // });
});
