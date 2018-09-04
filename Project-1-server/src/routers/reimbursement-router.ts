import { Request, Response } from 'express';
import express from 'express';
import * as reimbursementDao from '../dao/reimbursement-dao';
// import { authMiddleware } from '../security/authorization-middleware';

// all routes defiend with this object will imply /reimbursements
export const reimbursementRouter = express.Router(); // routers represent a subset of routes for the express application


/**
 * Find all reimbursements
 */
reimbursementRouter.get('', [
  // authMiddleware('admin', 'customer'),
  async (req: Request, resp: Response) => {
    try {
      console.log('retrieving all movies');
      let reimbursements = await reimbursementDao.findAll();
      resp.json(reimbursements);
    } catch (err) {
      resp.sendStatus(500);
    }
  }]);

/**
 * Find reimbursement by id
 */
reimbursementRouter.get('/:id', async (req, resp) => {
  const id = +req.params.id; // convert the id to a number
  console.log(`retreiving reimbursement with id  ${id}`)
  try {
    let reimbursement = await reimbursementDao.findById(id);
    if (reimbursement !== undefined) {
      resp.json(reimbursement);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});


/**
 * Create a reimbursement
 */
reimbursementRouter.post('', [
  // authMiddleware('admin'),
  async (req, resp) => {
    try {
      const id = await reimbursementDao.createReimbursement(req.body);
      resp.status(201);
      resp.json(id);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  }])

