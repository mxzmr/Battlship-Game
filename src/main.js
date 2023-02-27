import './style.css';
import createGameBoardLayout from './ui';
import { createPlayer, createBot } from './players';
import createGameboard, { getPlayerTurn } from './game-board';
import createShip from './ships';

let player;
let bot;
const gameOverModal = document.querySelector('.game-over-modal');
const gameOverModalBtn = document.querySelector('.game-over-modal-button');
const gameboardPageSection = document.querySelector('.game-boards');
const playerOneBoardContainer = document.querySelector('.game-board-player1');
const playerTwoBoardContainer = document.querySelector('.game-board-player2');
const gameStartModal = document.querySelector('.game-start-modal');
const gameStartButton = document.querySelector('.game-start-button');
gameStartModal.showModal();

function startGame() {
  player = createPlayer();
  bot = createBot();
  gameboardPageSection.style.display = 'flex';
  createGameBoardLayout(playerOneBoardContainer, player);
  createGameBoardLayout(playerTwoBoardContainer, bot);
}
gameStartButton.addEventListener('click', () => {
  startGame();
  gameStartModal.close();
  gameStartModal.style.display = 'none';
});

function changeOpacity() {
  if (getPlayerTurn() === 'player') {
    playerOneBoardContainer.style.opacity = '0.4';
    playerTwoBoardContainer.style.opacity = '1';
  } else {
    playerTwoBoardContainer.style.opacity = '0.4';
    playerOneBoardContainer.style.opacity = '1';
  }
} changeOpacity();

// insert ships randomly or by choice
function playGame(event) {
  player.attack(event, bot.playerBoard);
  if (getPlayerTurn() === 'bot') {
    setTimeout(() => {
      bot.attack(player.playerBoard);
      changeOpacity();
      if (getPlayerTurn() === 'bot') {
        setTimeout(() => {
          playGame(event);
        }, 500);
      }
    }, 500);
  }
}

playerTwoBoardContainer.addEventListener('click', (event) => {
  if (getPlayerTurn() === 'bot') return;
  if (!gameOverModal.open) {
    playGame(event.target);
    changeOpacity();
  }
});

gameOverModalBtn.addEventListener('click', () => {
  gameboardPageSection.style.display = 'none';
  playerOneBoardContainer.innerHTML = '';
  playerTwoBoardContainer.innerHTML = '';
  startGame();
  gameOverModal.close();
  gameOverModal.style.display = 'none';
});
