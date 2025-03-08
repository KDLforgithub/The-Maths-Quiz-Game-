const questions = [
    {
        question: "What is the HCF of 30 and 45?",
        options: ["5", "10", "15", "20"],
        answer: "15",
        hint: "Product of the smallest common prime factors."
    },
    {
        question: "Find the LCM of 30 and 45.",
        options: ["60", "90", "120", "150"],
        answer: "90",
        hint: "Product of the greatest powers of prime factors."
    },
    {
        question: "Find the sum of first 10 natural numbers.",
        options: ["50", "55", "60", "45"],
        answer: "55",
        hint: "n(n+1)/2 formula."
    }
    // Add more questions here based on the PDF
];

let currentQuestionIndex = 0;
let score = parseInt(localStorage.getItem('score')) || 0;
let timeLeft = 30;
let timer;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

function loadQuestion() {
    if (currentQuestionIndex >= 20) {
        currentQuestionIndex = 0;
        questions.sort(() => Math.random() - 0.5);
    }

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    document.getElementById('options').innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        document.getElementById('options').appendChild(button);
    });

    document.getElementById('hint').innerText = '';
    timeLeft = 30;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function checkAnswer(option) {
    clearInterval(timer);

    const currentQuestion = questions[currentQuestionIndex];
    if (option === currentQuestion.answer) {
        new Audio('sounds/correct.mp3').play();
        score += 10;
        alert('Correct!');
    } else {
        new Audio('sounds/incorrect.mp3').play();
        alert('Incorrect!');
    }

    currentQuestionIndex++;
    saveProgress();
    loadQuestion();
}

function hint() {
    document.getElementById('hint').innerText = questions[currentQuestionIndex].hint;
}

function updateTimer() {
    timeLeft--;
    document.getElementById('time').innerText = timeLeft;
    if (timeLeft === 0) {
        alert('Time is up!');
        currentQuestionIndex++;
        loadQuestion();
    }
}

function saveProgress() {
    localStorage.setItem('score', score);
    document.getElementById('leaderboard').innerHTML = '';

    const playerName = prompt("Enter your name:");
    leaderboard.push({ name: playerName, score });
    leaderboard.sort((a, b) => b.score - a.score);

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    leaderboard.forEach(player => {
        const li = document.createElement('li');
        li.innerText = `${player.name}: ${player.score}`;
        document.getElementById('leaderboard').appendChild(li);
    });
}

function resetGame() {
    localStorage.clear();
    location.reload();
}

window.onload = loadQuestion;