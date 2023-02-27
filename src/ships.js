export default function createShip(length) {
  let numOfHits = 0;
  let sunk = false;
  function hit() {
    if (numOfHits < length) numOfHits += 1;
    if (numOfHits >= length) sunk = true;
    return numOfHits;
  }
  function isSunk() {
    return sunk;
  }
  function getNumOfHits() {
    return numOfHits;
  }
  return {
    length,
    hit,
    getNumOfHits,
    isSunk,
  };
}
