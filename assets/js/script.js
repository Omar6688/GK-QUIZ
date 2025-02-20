const allQuestions = [
    { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Lisbon"], correct: 2 },
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Venus"], correct: 1 },
    { question: "Who painted the Mona Lisa?", answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], correct: 2 },
    { question: "What is the smallest country in the world?", answers: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], correct: 2 },
    { question: "Which element has the atomic number 1?", answers: ["Helium", "Oxygen", "Hydrogen", "Carbon"], correct: 2 },
    { question: "What is the longest river in the world?", answers: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], correct: 1 },
    { question: "Who developed the theory of relativity?", answers: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Niels Bohr"], correct: 1 },
    { question: "What is the capital city of Japan?", answers: ["Kyoto", "Osaka", "Tokyo", "Hiroshima"], correct: 2 },
    { question: "Which gas is most abundant in Earth's atmosphere?", answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 1 },
    { question: "What is the hardest natural substance on Earth?", answers: ["Gold", "Iron", "Diamond", "Platinum"], correct: 2 },
    { question: "What is the capital city of Canada?", answers: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: 2 },
    { question: "Which ocean is the largest by surface area?", answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correct: 3 },
    { question: "What is the tallest mountain in the world?", answers: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"], correct: 2 },
    { question: "Which planet is known for its rings?", answers: ["Jupiter", "Saturn", "Uranus", "Neptune"], correct: 1 },
    { question: "What is the largest desert in the world?", answers: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Antarctic Desert"], correct: 3 },
    { question: "Who painted the ceiling of the Sistine Chapel?", answers: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"], correct: 0 },
    { question: "Which country gifted the Statue of Liberty to the United States?", answers: ["England", "France", "Spain", "Germany"], correct: 1 },
    { question: "What is the capital of Brazil?", answers: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"], correct: 1 },
    { question: "What is the chemical formula for water?", answers: ["CO2", "H2O", "O2", "NaCl"], correct: 1 },
    { question: "Who wrote the play 'Hamlet'?", answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correct: 1 },
    { question: "What is the largest continent?", answers: ["Africa", "North America", "Asia", "Europe"], correct: 2 },
    { question: "What is the boiling point of water at sea level in Celsius?", answers: ["100°C", "90°C", "110°C", "120°C"], correct: 0 },
    { question: "Which famous scientist formulated the laws of motion?", answers: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], correct: 0 },
    { question: "Which country has the most Olympic gold medals?", answers: ["USA", "China", "Russia", "Germany"], correct: 0 }
];

let quizQuestions = []; // Stores 20 random questions
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Get elements from HTML
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("next-button");

// Function to Start the Quiz
function startQuiz() {
    quizQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 20); // Pick 20 random questions
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// Function to Display a Question
function showQuestion() {
    clearInterval(timer); // Reset timer
    timeLeft = 15;
    updateTimer();

    let currentQuestion = quizQuestions[currentQuestionIndex];

    document.getElementById("question-number").innerText = `Question ${currentQuestionIndex + 1} of 20`;

    questionElement.innerText = currentQuestion.question;
    answerButtons.innerHTML = "";

    // Enable the Next button to allow skipping
    nextButton.classList.add("hidden");

    // Create answer buttons dynamically
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        button.addEventListener("click", () => checkAnswer(index, currentQuestion.correct));
        answerButtons.appendChild(button);
    });

     // Start the countdown timer
     timer = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion(); // Move to the next question if time runs out
        }
    }, 1000);
}

// Function to Update the Timer Display
function updateTimer() {
    timerElement.innerText = `Time Left: ${timeLeft}s`;
}

// Function to Check Answer & Move to Next Question
function checkAnswer(selectedIndex, correctIndex) {
    clearInterval(timer); // Stop the timer

    nextButton.classList.remove("hidden"); // Show button only after selecting an answer

    let timeTaken = 15 - timeLeft;
    let points = 0;

    // Get all answer buttons
    const buttons = document.querySelectorAll(".btn");

    // Disable all buttons after selecting an answer
    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === selectedIndex) {
            if (selectedIndex === correctIndex) {
                button.classList.add("correct"); // Show green for correct answer
                if (timeTaken <= 5) points = 3;
                else if (timeTaken <= 10) points = 2;
                else points = 1;
            } else {
                button.classList.add("wrong"); // Show red for wrong answer
            }
        }
    });

