let correctNumber = Math.floor(Math.random() * 10) + 1;

const guessBtn = document.getElementById("guessBtn");
const restartBtn = document.getElementById("restartBtn");

const message = document.getElementById("message");
const messageNrGuesses = document.getElementById("messageNrGuesses");
const nrOfAttempts = document.getElementById("nrOfAttempts");

let guessedNumbers = [];
let attempts = 5;
let ending;

guessBtn.addEventListener("click", function () {
  const guess = parseInt(document.getElementById("guess").value);

  if (isNaN(guess)) {
    updateText(message, "Please enter a number");
    return;
  }
  if (guess < 1 || guess > 10) {
    updateText(message, "Please enter a valid number");
    return;
  }

  if (guess === correctNumber) {
    attempts--;
    switch (5 - attempts) {
      case 1:
        ending = "st";
        break;
      case 2:
        ending = "nd";
        break;
      case 3:
        ending = "rd";
        break;
      default:
        ending = "th";
    }

    updateText(
      message,
      `Well played! You guessed the correct number on the ${
        5 - attempts
      }${ending} attempt`,
      "green"
    );
    guessBtn.disabled = true;

    nrOfAttempts.textContent = "";
    messageNrGuesses.textContent = "";
    return;
  }

  if (guess < correctNumber || guess > correctNumber) {
    guessedNumbers.push(guess);
    attempts--;
    nrOfAttempts.textContent = `You have ${attempts} more attempts`;
    messageNrGuesses.textContent = `Your guessed numbers are: ${guessedNumbers}`;
    if (guess < correctNumber) {
      updateText(message, "Your number is too low");
      return;
    }
    updateText(message, "Your number is too high");
    return;
  }

  if (attempts === 0) {
    updateText(message, `You Lose! My number was ${correctNumber}`);

    nrOfAttempts.style.visibility = "hidden";
    guessBtn.disabled = true;
    return;
  }
});

restartBtn.addEventListener("click", function () {
  correctNumber = Math.floor(Math.random() * 10) + 1;
  message.style.visibility = "hidden";
  messageNrGuesses.style.visibility = "hidden";
  nrOfAttempts.style.visibility = "hidden";
  guessedNumbers.splice(0, guessedNumbers.length);
  attempts = 5;

  document.getElementById("guess").value = "";
  guessBtn.disabled = false;
});

function updateText(element, text, color = "red") {
  element.style.visibility = "visible";
  element.style.color = color;
  element.textContent = text;
}
