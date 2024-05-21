const colorDisplays = document.querySelectorAll('.color-display');
const colorLists = document.querySelectorAll('.color-list');
const colorOptions = document.querySelectorAll('.color-option');

colorDisplays.forEach((display, index) => {
    display.addEventListener('click', () => {
        colorLists[index].classList.toggle('show');
    });
});

const colors = ['red', 'blue', 'green', 'yellow', 'brown'];
const secretCode = Array.from({ length: 4 }, () => colors[Math.floor(Math.random() * colors.length)]);
console.log('Secret Code:', secretCode);

let guess = new Array(4);

colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        const color = option.dataset.color;
        if (color) {
            const colorDisplay = option.parentNode.previousElementSibling;
            const index = Array.from(colorDisplays).indexOf(colorDisplay);
            guess[index] = color;
            colorDisplay.style.backgroundColor = color;
            option.parentNode.classList.toggle('show');
        }
    });
});

function calculateGuessResult(guess, correctAnswer) {
    let white = 0;
    let black = 0;
    let guessCopy = [...guess];
    let correctAnswerCopy = [...correctAnswer];

    for (let i = 0; i < guessCopy.length; i++) {
        if (guessCopy[i] === correctAnswerCopy[i]) {
            black++;
            guessCopy[i] = null;
            correctAnswerCopy[i] = null;
        }
    }

    for (let i = 0; i < guessCopy.length; i++) {
        if (guessCopy[i] !== null) {
            let correctIndex = correctAnswerCopy.indexOf(guessCopy[i]);
            if (correctIndex !== -1) {
                white++;
                correctAnswerCopy[correctIndex] = null;
            }
        }
    }

    return { white, black };
}

document.getElementById('submit-guess').addEventListener('click', function () {
    if (guess.includes(undefined)) {
        alert('Please select 4 colors.');
        return;
    }

    const result = calculateGuessResult(guess, secretCode);
    const guessRow = document.createElement('div');
    guessRow.className = 'guess-row';

    const indexNumber = document.createElement('div');
    indexNumber.className = 'index-number';
    indexNumber.textContent = document.getElementsByClassName('guess-row').length + 1;
    guessRow.appendChild(indexNumber);

    guess.forEach(color => {
        const guessItem = document.createElement('div');
        guessItem.className = 'guess-item';
        guessItem.dataset.color = color;
        guessRow.appendChild(guessItem);
    });

    const guessResult = document.createElement('div');
    guessResult.className = 'guess-result';

    for (let i = 0; i < result.black; i++) {
        const resultItem = document.createElement('div');
        resultItem.className = 'guess-result-item';
        resultItem.setAttribute('data-color', 'black');
        guessResult.appendChild(resultItem);
    }

    for (let i = 0; i < result.white; i++) {
        const resultItem = document.createElement('div');
        resultItem.className = 'guess-result-item';
        resultItem.setAttribute('data-color', 'lavender');
        guessResult.appendChild(resultItem);
    }

    guessRow.appendChild(guessResult);
    document.getElementById('guesses').appendChild(guessRow);

    if (result.black === guess.length) {
        if (confirm('Success! You guessed the correct combination. Would you like to play again?')) {
            location.reload();
        }
    } else {
        console.log('Failure. Please try again.');
        console.log('Black pegs: ' + result.black);
        console.log('White pegs: ' + result.white);
    }

    guess = new Array(4);
    colorDisplays.forEach(display => {
        display.style.backgroundColor = '';
    });
});
