// =========================
// Supabase Connection
// =========================

const SUPABASE_URL = "https://xwadebhflihczxlhjrpg.supabase.co";
const SUPABASE_KEY = "sb_publishable_4eu0Bs4poL4gOiMoVFAgKA_yp7w_c83";

const sb = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase connected");

// =========================
// Login Functions
// =========================

async function login() {

    console.log("LOGIN BUTTON CLICKED");

    try {

        const { data, error } = await sb
            .from("Users")
            .select("*");

        console.log("USERS TABLE DATA:", data);
        console.log("USERS TABLE ERROR:", error);

        if (error) {
            alert("Supabase Error: " + error.message);
            return;
        }

        alert("Check the browser console (F12) for returned data.");

    } catch (err) {

        console.error("Unexpected Error:", err);
        alert("Unexpected Error: " + err.message);

    }
}

function continueAsGuest() {

    sessionStorage.setItem("guestMode", "true");
    window.location.href = "scorer.html";

}

// =========================
// Volleyball Scoring
// =========================

let scoreA = 0;
let scoreB = 0;

function updateDisplay() {

    const scoreAElement = document.getElementById("scoreA");
    const scoreBElement = document.getElementById("scoreB");

    if (!scoreAElement || !scoreBElement) {
        return;
    }

    scoreAElement.textContent = scoreA;
    scoreBElement.textContent = scoreB;
}

async function changeScore(team, amount) {

    if (team === "A") {
        scoreA += amount;
    }

    if (team === "B") {
        scoreB += amount;
    }

    if (scoreA < 0) scoreA = 0;
    if (scoreB < 0) scoreB = 0;

    updateDisplay();

    await saveScore();
}

function resetScores() {

    scoreA = 0;
    scoreB = 0;

    updateDisplay();
    saveScore();
}

// =========================
// Supabase Score Storage
// =========================

const currentMatchId = 1;

async function loadScore() {

    const { data, error } = await sb
        .from("scores")
        .select("*")
        .eq("match_id", currentMatchId)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    scoreA = data.team_a_score || 0;
    scoreB = data.team_b_score || 0;

    updateDisplay();
}

async function saveScore() {

    const { error } = await sb
        .from("scores")
        .update({
            team_a_score: scoreA,
            team_b_score: scoreB
        })
        .eq("match_id", currentMatchId);

    if (error) {
        console.error(error);
    }
}

// =========================
// Make Functions Available
// =========================

window.login = login;
window.continueAsGuest = continueAsGuest;
window.changeScore = changeScore;
window.resetScores = resetScores;

// =========================
// Load Score Only On Scorer Page
// =========================

if (document.getElementById("scoreA")) {
    loadScore();
}
