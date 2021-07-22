import pg from "pg";

const { Pool } = pg;

const connection = new Pool({
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
  database: "sing_me_a_song"
});

export default connection;