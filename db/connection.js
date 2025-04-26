import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "dpg-d06e1dali9vc73e9a3s0-a.frankfurt-postgres.render.com",
  port: 5432, 
  database: "db_contacts_m93k", 
  user: "db_contacts_m93k_user",
  password: "sBBWn8V2Se8TwibrxmlydhXGOMRwYqq", 
  ssl: {
    rejectUnauthorized: false, // Render вимагає SSL-підключення
  },
});

export default pool;
