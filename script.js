const questionBox = document.getElementById("question");
const optionBox = document.getElementById("option");
const scoreBox = document.getElementById("score");
const loading = document.getElementById("loading");

let score = 0; // Make score global to persist between questions

async function fetchQuestion() {
    loading.style.display = "block"; // Fixed typo: 'dispaly' → 'display'
    questionBox.textContent = "";
    optionBox.innerHTML = "";

    const res = await fetch("https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple");
    const data = await res.json();
    const qData = data.results[0];

    const question = decodeHTML(qData.question);
    const correct = decodeHTML(qData.correct_answer);
    const options = [...qData.incorrect_answers.map(decodeHTML), correct].sort(() =>
        Math.random() - 0.5
    );

    loading.style.display = "none";
    questionBox.innerHTML = question;

    options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option"); // Fixed bug: assignment should be a method call, not =
        btn.addEventListener("click", () => checkAnswer(btn, option, correct));
        optionBox.appendChild(btn);
    });
}

function decodeHTML(html) {
    const text = document.createElement("textarea");
    text.innerHTML = html;
    return text.value;
}

function checkAnswer(btn, selected, correct) {
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach(option => {
        option.disabled = true;
        if (option.textContent === correct) {
            option.classList.add("correct");
        } else {
            option.classList.add("incorrect");
        }
    });

    if (selected === correct) {
        score += 10;
    } else {
        score -= 5;
    }

    scoreBox.textContent = `Score: ${score}`; // Fixed template literal: use backticks and ${}

    setTimeout(() => {
        fetchQuestion(); // Fixed typo: 'fecthQuestion' → 'fetchQuestion'
    }, 1000);
}

fetchQuestion(); // Initial call
