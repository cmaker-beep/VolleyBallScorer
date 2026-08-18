console.log("SCRIPT RUNNING");

const SUPABASE_URL = "https://xwadebhflihczxlhjrpg.supabase.co";
const SUPABASE_KEY = "sb_publishable_4eu0Bs4poL4gOiMoVFAgKA_yp7w_c83";

const sb = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase client created", sb);
