import {createClient} from "@supabase/supabase-js";

// TODO: add row-level security to bracket table
export const supabase = createClient(
    "https://rnmlwhhkxrqkutvsuqoi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubWx3aGhreHJxa3V0dnN1cW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNjg2MDgsImV4cCI6MjA2NTg0NDYwOH0.BMwSWu19DeIbGwxXXi06S_0nP7kpUzWnxuyyG0QF_74"
);