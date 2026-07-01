const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");

const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");

const currentQuestion = document.getElementById("currentQuestion");
const questionCount = document.getElementById("questionCount");
const totalQuestions = document.getElementById("totalQuestions");
const liveScore = document.getElementById("liveScore");

const finalScore = document.getElementById("finalScore");
const percentage = document.getElementById("percentage");
const remark = document.getElementById("remark");
const review = document.getElementById("review");

let current = 0;
let answers = new Array(questions.length).fill(null);

totalQuestions.textContent = questions.length;
questionCount.textContent = questions.length;

startBtn.onclick = () => {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    showQuestion();
};

function showQuestion() {

    currentQuestion.textContent = current + 1;

    const q = questions[current];

    questionText.textContent = q.question;

    answersDiv.innerHTML = "";

    q.options.forEach((option, index) => {

        const div = document.createElement("div");

        div.className = "answer";

        div.innerText = option;

        if (answers[current] === index)
            div.classList.add("selected");

        div.onclick = () => {

            answers[current] = index;

            document.querySelectorAll(".answer")
                .forEach(a => a.classList.remove("selected"));

            div.classList.add("selected");

            updateLiveScore();

        };

        answersDiv.appendChild(div);

    });

    prevBtn.style.display = current === 0 ? "none" : "block";

    if (current === questions.length - 1) {

        nextBtn.classList.add("hidden");

        submitBtn.classList.remove("hidden");

    } else {

        nextBtn.classList.remove("hidden");

        submitBtn.classList.add("hidden");

    }

}

nextBtn.onclick = () => {

    if (current < questions.length - 1) {

        current++;

        showQuestion();

    }

};

prevBtn.onclick = () => {

    if (current > 0) {

        current--;

        showQuestion();

    }

};

function updateLiveScore() {

    let score = 0;

    questions.forEach((q, i) => {

        if (answers[i] === q.correct)

            score++;

    });

    liveScore.textContent = score;

}

submitBtn.onclick = finishQuiz;

function finishQuiz() {

    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    let score = 0;

    review.innerHTML = "";

    questions.forEach((q, i) => {

        const correct = answers[i] === q.correct;

        if (correct)
            score++;

        const item = document.createElement("div");

        item.className =
            "review-item " + (correct ? "correct" : "wrong");

        item.innerHTML = `
            <div class="review-question">
                ${i + 1}. ${q.question}
            </div>

            <div class="review-answer">
                Your Answer:
                <span class="${correct ? "correct-text" : "wrong-text"}">
                ${
                    answers[i] === null
                    ? "Not Answered"
                    : q.options[answers[i]]
                }
                </span>
            </div>

            <div class="review-answer">
                Correct Answer:
                <span class="correct-text">
                ${q.options[q.correct]}
                </span>
            </div>
        `;

        review.appendChild(item);

    });

    const percent = Math.round(
        (score / questions.length) * 100
    );

    finalScore.textContent =
        `You scored ${score} / ${questions.length}`;

    percentage.textContent =
        `${percent}%`;

    if (percent >= 80)

        remark.textContent = "Excellent! 🌟";

    else if (percent >= 60)

        remark.textContent = "Good Job! 👍";

    else if (percent >= 40)

        remark.textContent = "Fair. Keep Practicing.";

    else

        remark.textContent = "You need more practice.";

}

restartBtn.onclick = () => {

    answers = new Array(questions.length).fill(null);

    current = 0;

    liveScore.textContent = 0;

    review.innerHTML = "";

    resultScreen.classList.add("hidden");

    startScreen.classList.remove("hidden");

};