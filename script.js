const colorDisplays = document.querySelectorAll('.color-display');
const colorLists = document.querySelectorAll('.color-list');
const colorOptions = document.querySelectorAll('.color-option');


colorDisplays.forEach((display, index) => {
    display.addEventListener('click', () => {
        colorLists[index].classList.toggle('show');
    });
});

const colors = ['red', 'blue', 'green', 'yellow', 'brown'];

// Define the secret code
const secretCode = Array.from({length: 4}, () => colors[Math.floor(Math.random() * colors.length)]);

// Print the secret code to the console for testing
console.log('Secret Code:', secretCode);
// Define the guess
let guess = [];


// Add event listener to color options
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        const color = option.dataset.color;
        if (color) {
            const colorDisplay = option.parentNode.previousElementSibling;
            const index = Array.from(colorDisplays).indexOf(colorDisplay);

            // Update the color in the guess array
            guess[index] = color;

            // Update the background color of the color display
            colorDisplay.style.backgroundColor = color;
            option.parentNode.classList.toggle('show');
        }
    });
});

function calculateGuessResult(guess, correctAnswer) {
    let white = 0;
    let black = 0;

    // Create copies of the arrays so we can modify them without affecting the originals
    let guessCopy = [...guess];
    let correctAnswerCopy = [...correctAnswer];

    // First, find the black pegs (correct color in the correct position)
    for (let i = 0; i < guessCopy.length; i++) {
        if (guessCopy[i] === correctAnswerCopy[i]) {
            black++;
            // Remove the items from the arrays so they can't be matched again
            guessCopy[i] = null;
            correctAnswerCopy[i] = null;
        }
    }

    // Then, find the white pegs (correct color in the wrong position)
    for (let i = 0; i < guessCopy.length; i++) {
        if (guessCopy[i] !== null) {
            let correctIndex = correctAnswerCopy.indexOf(guessCopy[i]);
            if (correctIndex !== -1) {
                white++;
                // Remove the item from the correctAnswer array so it can't be matched again
                correctAnswerCopy[correctIndex] = null;
            }
        }
    }

    return {
        white: white,
        black: black
    };
}

document.getElementById('submit-guess').addEventListener('click', function() {
    
    if (guess.length < 4) {
        alert('Please select 4 colors.');
        return;
    }

    var result = calculateGuessResult(guess, secretCode);

    var guessRow = document.createElement('div');
    guessRow.className = 'guess-row';

    var indexNumber = document.createElement('div');
    indexNumber.className = 'index-number';
    indexNumber.textContent = document.getElementsByClassName('guess-row').length + 1;
    guessRow.appendChild(indexNumber);

    guess.forEach(function(color) {
        var guessItem = document.createElement('div');
        guessItem.className = 'guess-item';
        guessItem.dataset.color = color;
        guessRow.appendChild(guessItem);
        
    });

    var guessResult = document.createElement('div');
    guessResult.className = 'guess-result';

    for (var i = 0; i < result.black; i++) {
        var resultItem = document.createElement('div');
        resultItem.className = 'guess-result-item';
        resultItem.dataset.color = 'black';
        guessResult.appendChild(resultItem);
    }
    
    for (var i = 0; i < result.white; i++) {
        var resultItem = document.createElement('div');
        resultItem.className = 'guess-result-item';
        resultItem.dataset.color = 'lavender';
        guessResult.appendChild(resultItem);
    }

    

    guessRow.appendChild(guessResult);
    document.getElementById('guesses').appendChild(guessRow);

    if (result.black === guess.length) {
        console.log('Success! You guessed the correct combination.');
        var restart = confirm('Success! You guessed the correct combination. Would you like to play again?');
        if (restart) {
            location.reload();
        }
    } else {
        console.log('Failure. Please try again.');
        console.log('Black pegs: ' + result.black);
        console.log('White pegs: ' + result.white);
    }
    guess = [];
    colorDisplays.forEach(display => {
        display.style.backgroundColor = '';
    });
    
});