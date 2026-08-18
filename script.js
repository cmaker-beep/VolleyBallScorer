const SUPABASE_URL = "https://xwadebhflihczxlhjrpg.supabase.co";
const SUPABASE_KEY = "sb_publishable_4eu0Bs4poL4gOiMoVFAgKA_yp7w_c83";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
let scoreA = 0;
let scoreB = 0;

// ======================================
// SUPABASE PLACEHOLDER
// ======================================

// import { createClient } from
// 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// const supabaseUrl = 'YOUR_SUPABASE_URL'
// const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

// const supabase = createClient(
//     supabaseUrl,
//     supabaseKey
// )

// async function saveScore() {
//     // TODO: Save scores to Supabase
// }

// async function loadScore() {
//     // TODO: Load scores from Supabase
// }

// ======================================

function updateDisplay() {
    document.getElementById("scoreA").textContent = scoreA;
    document.getElementById("scoreB").textContent = scoreB;
}

function changeScore(team, amount) {

    if (team === "A") {
        scoreA = Math.max(0, scoreA + amount);
    }

    if (team === "B") {
        scoreB = Math.max(0, scoreB + amount);
    }

    updateDisplay();

    // saveScore();
}

function resetScores() {
    scoreA = 0;
    scoreB = 0;

    updateDisplay();

    // saveScore();
}

let currentMatchId = 1;

async function loadScore() {

    const { data, error } = await supabase
        .from("scores")
        .select("*")
        .eq("match_id", currentMatchId)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    scoreA = data.teamA_score;
    scoreB = data.teamB_score;

    updateDisplay();
}




async function saveScore() {

    const { error } = await supabase
        .from("scores")
        .update({
            teamA_score: scoreA,
            teamB_score: scoreB
        })
        .eq("match_id", currentMatchId);

    if (error) {
        console.error("Save failed:", error);
    }
}


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

window.changeScore = changeScore;

loadScore();
