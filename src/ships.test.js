import { describe, expect, it, test, vi, beforeEach } from 'vitest';
import ship from './ships';

describe('Ship Initialization Tests', () => {
  let patrolBoat;

  beforeEach(() => {
    patrolBoat = ship(5);
  });

  test('Tests the properties of ships when they are first initialized', () => {
    expect(patrolBoat.length).toStrictEqual(5);
    expect(patrolBoat.getNumOfHits()).toStrictEqual(0);
  });
  test('Checks if isSunk return false by default', () => {
    expect(patrolBoat.isSunk()).toBe(false);
  });

  describe('Hit Function Test Cases', () => {
    test('Increments the number of hits by 1 after each successful hit', () => {
      patrolBoat.hit();
      expect(patrolBoat.getNumOfHits())
        .toStrictEqual(1);
      // expect(patrolBoat.hit())
      //   .toStrictEqual(2);
    });
    test('Sinks a ship after the maximum number of hits is reached', () => {
      for (let i = 0; i < patrolBoat.length; i += 1) {
        patrolBoat.hit();
      }
      expect(patrolBoat.isSunk())
        .toBe(true);
    });
    test('Does not allow further hits after a ship is sunk', () => {
      for (let i = 0; i < patrolBoat.length + 2; i += 1) {
        patrolBoat.hit();
      }
      expect(patrolBoat.hit())
        .toBe(patrolBoat.length);
      expect(patrolBoat.isSunk())
        .toBe(true);
    });
  });
});
