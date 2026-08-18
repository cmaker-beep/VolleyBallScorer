console.log("START");

async function changeScore(team, amount) {
    console.log(team, amount);
}

async function resetScores() {
    console.log("reset");
}
function updateDisplay() {
    console.log("updateDisplay called");
    console.log("scoreA =", scoreA);
    console.log("scoreB =", scoreB);

    const scoreAElement = document.getElementById("scoreA");
    const scoreBElement = document.getElementById("scoreB");

    console.log(scoreAElement);
    console.log(scoreBElement);

    scoreAElement.textContent = scoreA;
    scoreBElement.textContent = scoreB;
}

window.changeScore = changeScore;
window.resetScores = resetScores;

console.log("END");
