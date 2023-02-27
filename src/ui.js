export default function createGameBoardLayout(playerGameboard, player) {
  for (let i = 0; i < 100; i += 1) {
    const gridItem = document.createElement('div');
    const gridItemRow = Math.floor(i / 10);
    const gridItemCoL = i % 10;
    gridItem.classList.add('grid-item');
    gridItem.setAttribute('id', `${i}`);
    gridItem.setAttribute('draggable', 'true');
    if (player.name === 'player') {
      if (typeof player.playerBoard.board[gridItemRow][gridItemCoL] === 'object') gridItem.style.background = 'blue';
    }
    playerGameboard.appendChild(gridItem);
  }
}

const capitalizedStr = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export function showGameOverModal(winner) {
  const modal = document.querySelector('.game-over-modal');
  const modalHeader = document.querySelector('.game-over-modal__header');
  modal.showModal();
  modal.style.display = 'flex';
  modalHeader.textContent = `${capitalizedStr(winner)} Won`;
}

function AddDragNDrop(element) {
  const gridItem = element;
  gridItem.ondragstart = () => false;
  gridItem.onmousedown = (event) => {
    // (1) prepare to moving: make absolute and on top by z-index
    gridItem.style.position = 'absolute';
    gridItem.style.zIndex = 1000;
    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    document.body.append(gridItem);
    // centers the ball at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
      gridItem.style.left = `${pageX - gridItem.offsetWidth / 2}px`;
      gridItem.style.top = `${pageY - gridItem.offsetHeight / 2}px`;
    }
    // move our absolutely positioned ball under the pointer
    moveAt(event.pageX, event.pageY);
    // eslint-disable-next-line no-shadow
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
    // (2) move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);
    // (3) drop the ball, remove unneeded handlers
    gridItem.onmouseup = (event) => {
      gridItem.onmouseup = null;
      const { row, col } = getGridItemCoordinates(event);
      if (col + element.info.length <= 10 && col >= 0) document.removeEventListener('mousemove', onMouseMove);
      if (element.info) {
        console.log(`Element is on row ${row - 1}, column span ${col} to ${col + element.info.length - 1}`);
      }
    };
  };
}

function getGridItemCoordinates(target) {
  const elementLeft = target.offsetLeft;
  const elementTop = target.offsetTop;
  const itemWidth = 100;
  const itemHeight = 100;
  const targetRow = Math.floor(elementTop / itemHeight) - 1;
  const targetCol = Math.floor(elementLeft / itemWidth);
  return {
    targetRow,
    targetCol,
  };
}

export function createShipChoices(shipTank = {}) {
  const shipsBoard = document.querySelector('.game-board-player2');
  const gameBoard = document.querySelector('.game-board-player1');
  const gridItems = document.querySelectorAll('.grid-item');
  const carrierDiv = document.createElement('div');
  carrierDiv.info = createShip(5);
  carrierDiv.style.border = 'red solid';
  carrierDiv.style.width = `${carrierDiv.info.length * 100}px`;
  carrierDiv.style.height = `${100}px`;
  carrierDiv.className = 'carrier';
  shipsBoard.appendChild(carrierDiv);
  AddDragNDrop(carrierDiv);
}
