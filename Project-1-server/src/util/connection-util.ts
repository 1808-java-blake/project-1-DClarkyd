import { Pool, Client } from 'pg';

export const connectionPool = new Pool({
  user: "postgres",
  host: 'revature-1808.cbbia87l449g.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: "joking11",
  port: 5432,
  max: 2
})
