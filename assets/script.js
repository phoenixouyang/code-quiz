var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choices"));
var timeLeft = document.querySelector(".timer");
var validation = document.getElementById("validation");
const choiceButtons = document.querySelectorAll(".choices");



let secondsLeft = 75;
let questionNumber = 0;
let currentQuestion = "";
let currentChoices = "";
let penalty = 10;
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
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeLeft.textContent = "Time: " + secondsLeft;

        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft.textContent = "";
        }
        }, 1000);
    
    startQuiz(questionNumber);
};

function startQuiz(questionNumber) {
    for (var i=0; i < questionList.length; i++) {        
        currentQuestion = questionList[questionNumber].question;
        currentChoice = questionList[questionNumber].choiceList;
        question.textContent = currentQuestion;
        
        choices.forEach(function(choice, index) {
            choice.textContent = currentChoice[index];
            choice.addEventListener("click", verify)
        });
    }        
}

function verify(event) {
    var element = event.target;

    if (element.textContent == questionList[questionNumber].answer) {
        validation.textContent = "correct!"
    } else {
        secondsLeft = secondsLeft - penalty
        validation.textContent = "wrong!"
    }

    questionNumber++;
    if (questionNumber >= questionList.length) {
        return window.location.assign("/highscores.html")
    } else {
        startQuiz(questionNumber);
    }
}



startTimer();