import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../model/reimbursement";
import { User } from "../model/user";
import { reimbursementConverter } from "../util/reimbursement-converter";
import { userConverter } from "../util/user-converter";

/**
 * Retreive all users from the DB along with all their reimbursements
 */
// export async function findAll(): Promise<User[]> {
//   const client = await connectionPool.connect();
//   try {
//     const resp = await client.query(
//       `SELECT * FROM expense_reimbursement.reimbursement_info
//         LEFT JOIN movies.users_movies
//         USING (user_id)
//         LEFT JOIN movies.movies
//         USING(movie_id)`);

//     // extract the users and their movies from the result set
//     const users = [];
//     resp.rows.forEach((user_movie_result) => {
//       const movie = reimbursementConverter(user_movie_result);
//       const exists = users.some( existingUser => {
//         if(user_movie_result.user_id === existingUser.id) {
//           movie.id && existingUser.movies.push(movie);
//           return true;
//         }
//       })
//       if (!exists) {
//         const newUser = userConverter(user_movie_result);
//         movie.id && newUser.reimbursements.push(movie);
//         users.push(newUser);
//       }
//     })
//     return users;
//   } finally {
//     client.release();
//   }
// }

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
export async function create(user: User): Promise<number> {
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
export async function addReimbursementToUser(reimbursementId: number, userId: number): Promise<any> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO reimbursement.reimbursement_info
        (reimb_amount, reimb_submitted, reimb_description)
        VALUES ($1, $2)`, [reimbursementId, userId ]);
  } finally {
    client.release();
  }
}