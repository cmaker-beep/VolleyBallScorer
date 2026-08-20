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

    console.log("LOGIN BUTTON CLICKED");

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const { data, error } = await sb
        .from("Users")
        .select("*")
        .eq("username", username)
        .eq("Password", password);

    console.log("data =", data);
    console.log("error =", error);

    if (error) {
        alert(JSON.stringify(error));
        return;
    }

    alert("Login OK");
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
