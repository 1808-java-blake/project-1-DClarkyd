import { Pool, Client } from 'pg';

export const connectionPool = new Pool({
  user: "postgres",
  host: 'localhost',
  database: 'postgres',
  password: "joking",
  port: 5433,
  max: 2
})
