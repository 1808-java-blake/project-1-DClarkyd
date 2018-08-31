import { Pool, Client } from 'pg';

export const connectionPool = new Pool({
  user: process.env["1808_MOVIE_DB_USERNAME"],
  host: 'localhost',
  database: 'postgres',
  password: process.env["1808_MOVIE_DB_PASSWORD"],
  port: 5432,
  max: 2
})
