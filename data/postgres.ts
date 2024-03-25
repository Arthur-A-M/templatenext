import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PGSQL_USER,
  host: process.env.PGSQL_HOST,
  port: Number(process.env.PGSQL_PORT),
  password: process.env.PGSQL_PASSWORD,
  database: process.env.PGSQL_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
