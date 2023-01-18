var question = document.getElementById("question");
var timeLeft = document.querySelector(".timer");
var validation = document.getElementById("validation");
var homeBox = document.getElementsByClassName("home-box")
var choiceBox = document.getElementById("choice-box");
var quizBox = document.getElementById("quiz-box")
var ul = document.createElement("ul");

let secondsLeft = 75;
let score = 0
let questionNumber = 0;
let currentQuestion = "";
let currentChoices = "";
let penalty = 10;
let timerInterval = 0
let questionList = [
    {
        question: "Commonly used data types DO NOT include:",
        choiceList: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed with _______",
        choiceList: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "3. parenthesis"
    },
    {
        question: "Arrays in Javascript can be used to store _______",
        choiceList: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables",
        choiceList: ["1. quotes", "2. curly brackets", "3. commas", "4. parenthesis"],
        answer: "1. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choiceList: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    },
];


function startTimer() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeLeft.textContent = "Time: " + secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft.textContent = "";
            quizFinish();
        }
    }, 1000);
    
    startQuiz(questionNumber);
};

function startQuiz(questionNumber) {
    for (var i = 0; i < questionList.length; i++) {
        currentQuestion = questionList[questionNumber].question;
        currentChoices = questionList[questionNumber].choiceList;
        question.textContent = currentQuestion;
        ul.innerHTML = "";
        choiceBox.innerHTML = ""

        currentChoices.forEach(function (item) {
            var li = document.createElement("li");
            li.textContent = item;
            
            li.setAttribute("class", "choices");
            choiceBox.appendChild(ul);
            ul.appendChild(li);
            li.addEventListener("click", (verify));
        })
    }
};

function verify(event) {
    var element = event.target;

    if (element.textContent == questionList[questionNumber].answer) {
        validation.textContent = "correct!";
    } else {
        secondsLeft = secondsLeft - penalty;
        validation.textContent = "wrong!";
    }

    questionNumber++;
    if (questionNumber >= questionList.length) {
        quizFinish();
    } else {
        startQuiz(questionNumber);
    }
}

function quizFinish() {
    // clear content from quiz
    choiceBox.innerHTML = "";
    question.innerHTML = "";

    // stop timer and store value in score variable
    score = secondsLeft;
    clearInterval(timerInterval);
    timeLeft.textContent = "";
    
    var h2 = document.createElement("h2");
    var scoreText = document.createElement("p");
    var initialsBox = document.createElement("div")
    var initialsText = document.createElement("p");
    var userInitials = document.createElement("input");
    var submitInitials = document.createElement("button");

    initialsBox.setAttribute("class", "userName-box");
    userInitials.setAttribute("type", "text");
    userInitials.setAttribute("id", "userName");
    submitInitials.setAttribute("id", "submit-btn");
    submitInitials.setAttribute("type", "button");

    initialsText.textContent = "Enter Initials:";
    submitInitials.textContent = "Submit";
    h2.textContent = "All done!";
    scoreText.textContent = "Your final score is " + score + ".";

    initialsBox.appendChild(initialsText);
    initialsBox.appendChild(userInitials);
    initialsBox.appendChild(submitInitials);
    quizBox.insertBefore(h2, quizBox.firstChild);
    quizBox.insertBefore(scoreText, quizBox.childNodes[1]);
    quizBox.insertBefore(initialsBox, quizBox.childNodes[2]);

    submitInitials.addEventListener("click", function () {
        var initials = userInitials.value;
        var scoreList = JSON.parse(localStorage.getItem("scoreList")) || [];

        if (initials === "") {
            alert("Please enter your initials to submit your score.")
            return;
        };
        var userScore = {
            initials: initials,
            score: score,
        };
        scoreList.push(userScore);
        localStorage.setItem("scoreList", JSON.stringify(scoreList));
    });
    
};

startTimer();

