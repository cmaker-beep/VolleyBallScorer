
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

updateDisplay();
