console.log("START");

async function changeScore(team, amount) {
    console.log(team, amount);
}

async function resetScores() {
    console.log("reset");
}

window.changeScore = changeScore;
window.resetScores = resetScores;

console.log("END");
