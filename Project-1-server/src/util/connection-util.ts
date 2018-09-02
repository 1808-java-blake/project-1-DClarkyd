import { Pool, Client } from 'pg';

export const connectionPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '-Feynwin11',
  port: 5432,
  max: 2
})
