const questions = [
    { season: 'TALVI', correct: 2, img1: 'kuva1.avif', img2: 'kuva3.avif', audio: 'talvi.mp3' },
    { season: 'SYKSY', correct: 1, img1: 'kuva4.avif', img2: 'kuva1.avif', audio: 'syksy.mp3' },
    { season: 'KEVÄT', correct: 2, img1: 'kuva3.avif', img2: 'kuva5.avif', audio: 'kevat.mp3' },
    { season: 'KESÄ', correct: 2, img1: 'kuva4.avif', img2: 'kuva1.avif', audio: 'kesa.mp3' },
    { season: 'TALVI', correct: 2, img1: 'kuva6.avif', img2: 'kuva8.avif', audio: 'talvi.mp3' },
    { season: 'KEVÄT', correct: 2, img1: 'kuva9.avif', img2: 'kuva6.avif', audio: 'kevat.mp3' },
    { season: 'KESÄ', correct: 1, img1: 'kuva7.avif', img2: 'kuva8.avif', audio: 'kesa.mp3' },
    { season: 'SYKSY', correct: 1, img1: 'kuva9.avif', img2: 'kuva7.avif', audio: 'syksy.mp3' },
];


let currentQuestion = 0;
let selectedOption = 0;
let correctAnswers = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' && document.getElementById('next-arrow').style.display !== 'none') {
            nextQuestion();
        }
    });
});

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('season').textContent = question.season;
    document.getElementById('option1').src = question.img1;
    document.getElementById('option2').src = question.img2;
    document.getElementById('next-arrow').style.display = 'none';
}

function selectOption(option) {
    selectedOption = option;
    const options = document.querySelectorAll('.option');
    options.forEach(optionElement => {
        optionElement.classList.remove('selected');
    });
    document.getElementById(`option${option}`).classList.add('selected');
}

function checkAnswer() {
    const question = questions[currentQuestion];
    if (selectedOption === question.correct) {
        document.getElementById(`option${selectedOption}`).classList.add('correct');
        correctAnswers++;
    } else {
        document.getElementById(`option${selectedOption}`).classList.add('incorrect');
    }
    document.getElementById('next-arrow').style.display = 'block';
}

function nextQuestion() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect', 'selected');
    });
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        showResult();
    } else {
        selectedOption = 0;
        loadQuestion();
    }
}

function showResult() {
    document.getElementById('question-container').innerHTML = `
        <p id="result">Sait ${correctAnswers} / ${questions.length} oikein</p>
        <div class="stars">${getStars(correctAnswers)}</div>
        <button onclick="restartGame()">Pelaa uudelleen</button>
    `;
}

function getStars(score) {
    if (score === 8) {
        return '⭐⭐⭐';
    } else if (score >= 3) {
        return '⭐⭐';
    } else {
        return '⭐';
    }
}

function restartGame() {
    currentQuestion = 0;
    selectedOption = 0;
    correctAnswers = 0;
    document.getElementById('question-container').innerHTML = `
        <h1>Kummassa kuvassa on: <span id="season"></span></h1>
        <div id="audio-icon" onclick="playAudio()">🔊</div>
        <div class="options">
            <img id="option1" class="option" onclick="selectOption(1)">
            <img id="option2" class="option" onclick="selectOption(2)">
        </div>
        <button id="check-button" onclick="checkAnswer()">Tarkista</button>
        <div id="next-arrow" onclick="nextQuestion()">➡️</div>
    `;
    loadQuestion();
}

function playAudio() {
    const audio = new Audio(questions[currentQuestion].audio);
    audio.play();
}
