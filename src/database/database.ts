import pg from "pg";
import "./dotenv";

const { Pool } = pg;

const connection = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

export default connection;
