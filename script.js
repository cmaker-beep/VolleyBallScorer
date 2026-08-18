// =========================
// SUPABASE CONFIG
// =========================

const SUPABASE_URL = "https://xwadebhflihczxlhjrpg.supabase.co";
const SUPABASE_KEY = "sb_publishable_4eu0Bs4poL4gOiMoVFAgKA_yp7w_c83";

const sb = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase connected");

// =========================
// VARIABLES
// =========================

let scoreA = 0;
let scoreB = 0;
const currentMatchId = 1;

// =========================
// DISPLAY
// =========================

function updateDisplay() {
    document.getElementById("scoreA").textContent = scoreA;
    document.getElementById("scoreB").textContent = scoreB;
}

// =========================
// LOAD SCORES
// =========================

async function loadScore() {
    console.log("Loading score...");

    const { data, error } = await sb
        .from("scores")
        .select("*")
        .eq("match_id", currentMatchId)
        .single();

    if (error) {
        console.error("Load failed:", error);
        return;
    }

    console.log("Loaded:", data);

    scoreA = data.teamA_score || 0;
    scoreB = data.teamB_score || 0;

    updateDisplay();
}

// =========================
// SAVE SCORES
// =========================

async function saveScore() {

    const { error } = await sb
        .from("scores")
        .update({
            teamA_score: scoreA,
            teamB_score: scoreB
        })
        .eq("match_id", currentMatchId);

    if (error) {
        console.error("Save failed:", error);
        return;
    }

    console.log(`Saved A:${scoreA} B:${scoreB}`);
}

// =========================
// CHANGE SCORE
// =========================

async function changeScore(team, amount) {

    if (team === "A") {
        scoreA = Math.max(0, scoreA + amount);
    }

    if (team === "B") {
        scoreB = Math.max(0, scoreB + amount);
    }

    updateDisplay();

    await saveScore();
}

// =========================
// RESET MATCH
// =========================

async function resetScores() {

    scoreA = 0;
    scoreB = 0;

    updateDisplay();

    await saveScore();
}

// =========================
// MAKE FUNCTIONS AVAILABLE
// =========================

window.changeScore = changeScore;
window.resetScores = resetScores;

// =========================
// STARTUP
// =========================

loadScore();
