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
async function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const { data, error } = await sb
    .from("Users")
    .select("*")
    .eq("username", username)
    .eq("password", password);
    

    if (error) {
        console.error(error);
        alert("Login Denied");
        return;
    }

    if (data.length > 0) {

        alert("Login OK");

        // Optional: remember who logged in
        sessionStorage.setItem("userId", data[0].id);
        sessionStorage.setItem("userName", data[0].name);

        // Optional: move to scorer page
        // window.location.href = "scorer.html";

    } else {

        alert("Login Denied");

    }
}

async function changeScore(team, amount) {

    if (team === "A") {
        scoreA += amount;
    }

    if (team === "B") {
        scoreB += amount;
    }

    updateDisplay();

    await saveScore();
}

function resetScores() {
    scoreA = 0;
    scoreB = 0;
    updateDisplay();
}
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

    console.log(data);

    scoreA = data.team_a_score || 0;
    scoreB = data.team_b_score || 0;

    updateDisplay();
}

async function saveScore() {

    const { data, error } = await sb
        .from("scores")
        .update({
            team_a_score: scoreA,
            team_b_score: scoreB
        })
        .eq("match_id", currentMatchId)
        .select();

    console.log("Save data:", data);
    console.log("Save error:", error);
}

window.changeScore = changeScore;
window.resetScores = resetScores;

loadScore();
