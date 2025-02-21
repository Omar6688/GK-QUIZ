// Import the quiz functions
const { startQuiz, checkAnswer, nextQuestion } = require("../assets/js/script");

// ✅ Step 1: Mock the DOM before importing script.js
beforeAll(() => {
    document.body.innerHTML = `
        <div id="question">Question?</div>
        <div id="answer-buttons"></div>
        <div id="timer">Time Left: 15s</div>
        <button id="next-button" class="hidden">Next</button>
    `;
});

// ✅ Step 2: Start Quiz Test (Basic)
test("startQuiz should reset and start the quiz", () => {
    startQuiz();
    expect(document.getElementById("question").innerText).not.toBe("Question?"); 
});

// ✅ Step 3: Answer Selection Test (Correct Answer)
test("checkAnswer should mark the correct answer in green", () => {
    const correctIndex = 0;
    const button = document.createElement("button");
    button.classList.add("btn");
    document.getElementById("answer-buttons").appendChild(button);
    
    checkAnswer(0, correctIndex);
    expect(button.classList.contains("correct")).toBe(true);
});

// ✅ Step 4: Next Question Test
test("nextQuestion should display a new question", () => {
    let initialQuestion = document.getElementById("question").innerText;
    nextQuestion();
    let newQuestion = document.getElementById("question").innerText;
    expect(newQuestion).not.toBe(initialQuestion);
});
