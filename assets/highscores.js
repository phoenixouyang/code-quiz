var goBack = document.getElementById("go-back");
var clear = document.getElementById("clear");
var highScores = document.getElementById("high-scores");

function displayScores () {
    var scoreList = JSON.parse(localStorage.getItem("scoreList")) || [];

    for (var i = 0; i < scoreList.length ; i++) {
        var li = document.createElement("li");
        li.setAttribute("class", "highScoreList");
        li.textContent = scoreList[i].initials + " - " + scoreList[i].score;
        highScores.appendChild(li);
    }
};

goBack.addEventListener("click", function() {
   location.href = "index.html"
});

clear.addEventListener("click", function() {
    localStorage.clear();
    highScores.innerHTML = "";
});

displayScores();