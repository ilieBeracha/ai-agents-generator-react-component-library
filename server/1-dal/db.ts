import dotenv from "dotenv";
import postgres from "postgres";

dotenv.config();

const sql = postgres(process.env.SHORT_DATABASE_URL as string, {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

export default sql;
