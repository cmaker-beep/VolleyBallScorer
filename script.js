const SUPABASE_URL = "https://xwadebhflihczxlhjrpg.supabase.co";
const SUPABASE_KEY = "sb_publishable_4eu0Bs4poL4gOiMoVFAgKA_yp7w_c83";

const sb = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase connected");

let scoreA = 0;
let scoreB = 0;

function updateDisplay() {
    document.getElementById("scoreA").textContent = scoreA;
    document.getElementById("scoreB").textContent = scoreB;
}

function changeScore(team, amount) {

    if (team === "A") {
        scoreA = scoreA + amount;
    }

    if (team === "B") {
        scoreB = scoreB + amount;
    }

    updateDisplay();
}

function resetScores() {
    scoreA = 0;
    scoreB = 0;
    updateDisplay();
}

window.changeScore = changeScore;
window.resetScores = resetScores;

updateDisplay();
