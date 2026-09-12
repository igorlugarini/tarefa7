const minNumber = 1;
const maxNumber = 100;
const maxAttempts = 10;

let secretNumber;
let attemptsLeft;
let gameOver = false;

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const messageElement = document.getElementById('message');
const attemptsElement = document.getElementById('attempts');

function startGame() {
  secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  attemptsLeft = maxAttempts;
  gameOver = false;
  globalThis.secretNumber = secretNumber;
  globalThis.attemptsLeft = attemptsLeft;
  guessInput.value = '';
  updateAttempts();
  messageElement.textContent = 'Digite um número para começar.';
  guessInput.disabled = false;
  guessButton.disabled = false;
  guessInput.focus();
}

function updateAttempts() {
  attemptsElement.textContent = `Tentativas restantes: ${attemptsLeft}`;
}

function endGame() {
  gameOver = true;
  guessInput.disabled = true;
  guessButton.disabled = true;
}

function handleGuess() {
  if (gameOver) {
    return;
  }

  const guess = parseInt(guessInput.value, 10);

  if (Number.isNaN(guess) || guess < minNumber || guess > maxNumber) {
    messageElement.textContent = 'Digite um número válido entre 1 e 100.';
    return;
  }

  if (guess === secretNumber) {
    messageElement.textContent = 'Você acertou!';
    endGame();
    return;
  }

  attemptsLeft -= 1;
  updateAttempts();

  if (attemptsLeft === 0) {
    messageElement.textContent = `Você perdeu! O número secreto era ${secretNumber}.`;
    endGame();
    return;
  }

  if (guess < secretNumber) {
    messageElement.textContent = 'O número secreto é maior.';
  } else {
    messageElement.textContent = 'O número secreto é menor.';
  }

  guessInput.value = '';
  guessInput.focus();
}

guessButton.addEventListener('click', handleGuess);

guessInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleGuess();
  }
});

startGame();
