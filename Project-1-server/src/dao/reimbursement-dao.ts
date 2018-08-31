import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../model/reimbursement";
import { reimbursementConverter } from "../util/reimbursement-converter";
import { SqlReimbursement } from "../dto/sql-reimbursement";

/**
 * Retreive all movies from the database
 */
export async function findAll(): Promise<Reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM expense_reimbursement.reimbursement_info');
    return resp.rows.map(reimbursementConverter);
  } finally {
    client.release();
  }
}

/**
 * Retreive a reimbursement by its id
 * @param id 
 */
export async function findById(id: number): Promise<Reimbursement> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM expense_reimbursement.reimbursement_info WHERE reimb_id = $1', [id]);
    let reimbursement: SqlReimbursement = resp.rows[0];
    if (reimbursement !== undefined) {
      return reimbursementConverter(reimbursement);
    } else {
      return undefined;
    }
  } finally {
    client.release();
  }
}

/**
 * Add a new movie to the DB
 * @param movie 
 */
export async function createReimbursement(reimbursement): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO movies.movies 
        (title, num_blades, year)
        VALUES ($1, $2, $3)
        RETURNING movie_id`, [reimbursement.amount, reimbursement.submitted, reimbursement.resolved, reimbursement.description, reimbursement.author, reimbursement.resolver, reimbursement.statusId, reimbursement.typeId ]);
    return resp.rows[0].reimbursement_id;
  } finally {
    client.release();
  }
}