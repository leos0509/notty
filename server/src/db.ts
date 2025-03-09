import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "DB_USER",
  "DB_HOST",
  "DB_DATABASE",
  "DB_PASSWORD",
  "DB_PORT",
];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client:", err);
  process.exit(1);
});

const shutdown = async () => {
  console.log("Closing database connection pool...");
  await pool.end();
  console.log("Database connection pool closed.");
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default pool;
