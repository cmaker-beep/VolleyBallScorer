console.log("START");

async function changeScore(team, amount) {
    console.log(team, amount);
}

async function resetScores() {
    console.log("reset");
}
function updateDisplay() {
    console.log("Updating display", scoreA, scoreB);

    document.getElementById("scoreA").textContent = scoreA;
    document.getElementById("scoreB").textContent = scoreB;
}

window.changeScore = changeScore;
window.resetScores = resetScores;

console.log("END");
