import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../model/reimbursement";
import { User } from "../model/user";
import { reimbursementConverter } from "../util/reimbursement-converter";
import { userConverter } from "../util/user-converter";

/**
 * Retreive all users from the DB along with all their reimbursements
 */
export async function findAll(): Promise<User[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM expense_reimbursement.reimbursement_info
        LEFT JOIN expense_reimbursement.user_info
        USING (user_id)
        LEFT JOIN expense_reimbursement.reimbursement_info
        USING(reimb_author)`);

    // extract the users and their reimbursements from the result set
    const users = [];
    resp.rows.forEach((user_reimbursement_result) => {
      const reimbursement = reimbursementConverter(user_reimbursement_result);
      const exists = users.some( existingUser => {
        if(user_reimbursement_result.user_id === existingUser.id) {
          reimbursement.id && existingUser.reimbursements.push(reimbursement);
          return true;
        }
      })
      // if (!exists) {
      //   const newUser = userConverter(user_reimbursement_result);
      //   reimbursement.id && newUser.reimbursements.push(reimbursement);
      //   users.push(newUser);
      // }
    })
    return users;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by id, will also retreive all of that users reimbursements
 * @param id 
 */
export async function findById(id: number): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM movies.app_users u
        LEFT JOIN movies.users_movies
        USING (user_id)
        LEFT JOIN movies.movies
        USING(movie_id)
        WHERE u.user_id = $1`, [id]);
        const user = userConverter(resp.rows[0]); // get the user data from first row

        // get the reimbursemennt from all the rows
        resp.rows.forEach((reimbursement) => {
          // reimbursement.reimb_id && user.roleId.push(reimbursementConverter(reimbursement));
        })
        return user;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by username and password, will also retreive all of that users reimbursements
 * @param id 
 */
export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM expense_reimbursement.user_info u
        WHERE u.username = $1
        AND u.password = $2`, [username, password]);
        if(resp.rows.length !== 0) {
          return userConverter(resp.rows[0]); // get the user data from first row
        }
        return null;
  } finally {
    client.release();
  }
}


/**
 * Add a new user to the DB
 * @param user 
 */
export async function create(user, password: string, firstName: string, lastName: string, email: string): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO reimbursement.user_info
        (username, password, firstName, lastName, email)
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING user_id`, [user.username, user.password, user.firstName, user.lastName, user.email]);
    return resp.rows[0].user_id;
  } finally {
    client.release();
  }
}

/**
 * Add a reimbursements to a users list
 * @param reimbursementId 
 * @param userId 
 */
export async function addReimbursementToUser(reimbAuthor: string, reimbAmount: number, reimbDescription: string): Promise<any> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO reimbursement.reimbursement_info
        (reimb_amount, reimb_description, reimb_author)
        VALUES ($1, $2, $3)`, [reimbAmount, reimbDescription, reimbAuthor]);
  } finally {
    client.release();
  }
}