// declare variables for DOM elements
var goBack = document.getElementById("go-back");
var clear = document.getElementById("clear");
var highScores = document.getElementById("high-scores");


function displayScores () {
    // retrieve stored scoreList, or grab empty array if nothing is stored
    var scoreList = JSON.parse(localStorage.getItem("scoreList")) || [];

    // loop to display initials and score for each stored score
    for (var i = 0; i < scoreList.length ; i++) {
        var li = document.createElement("li");
        li.setAttribute("class", "highScoreList");
        li.textContent = scoreList[i].initials + " - " + scoreList[i].score;
        highScores.appendChild(li);
    }
};

// takes user back to home page
goBack.addEventListener("click", function() {
   location.href = "index.html"
});

// clears all data in local storage, and wipes current scores listed on the webpage
clear.addEventListener("click", function() {
    localStorage.clear();
    highScores.innerHTML = "";
});

displayScores();