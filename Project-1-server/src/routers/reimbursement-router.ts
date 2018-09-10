import { Request, Response } from 'express';
import express from 'express';
import * as reimbursementDao from '../dao/reimbursement-dao';
import { authMiddleware } from '../security/authorization-middleware';

// all routes defiend with this object will imply /reimbursements
export const reimbursementRouter = express.Router(); // routers represent a subset of routes for the express application

/**
 * Find all reimbursements
 */
reimbursementRouter.get('', [
  // authMiddleware('admin', 'customer'),
  async (req: Request, resp: Response) => {
    try {
      console.log('retrieving all reimbursements');
      let reimbursements = await reimbursementDao.findAll();
      resp.json(reimbursements);
    } catch (err) {
      resp.sendStatus(500);
    }
  }]);

/**
 * Find all pending reimbursements
 */
reimbursementRouter.get('/filter-pending', [
  // authMiddleware('admin', 'customer'),
  async (req: Request, resp: Response) => {
    try {
      console.log('retrieving all pending reimbursements');
      let reimbursements = await reimbursementDao.findPending();
      resp.json(reimbursements);
    } catch (err) {
      resp.sendStatus(500);
    }
  }]);

/**
 * Find all pending reimbursements
 */
reimbursementRouter.get('/filter-approved', [
  // authMiddleware('admin', 'customer'),
  async (req: Request, resp: Response) => {
    try {
      console.log('retrieving all approved reimbursements');
      let reimbursements = await reimbursementDao.findApproved();
      resp.json(reimbursements);
    } catch (err) {
      resp.sendStatus(500);
    }
  }]);

  /**
 * Find all pending reimbursements
 */
reimbursementRouter.get('/filter-denied', [
  // authMiddleware('admin', 'customer'),
  async (req: Request, resp: Response) => {
    try {
      console.log('retrieving all denied reimbursements');
      let reimbursements = await reimbursementDao.findDenied();
      resp.json(reimbursements);
    } catch (err) {
      resp.sendStatus(500);
    }
  }]);


/**
 * Find reimbursement by username
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
reimbursementRouter.post('/add-reimbursement', [
  
  // authMiddleware('admin'),
  async (req, resp) => {
    console.log('creating reimbursement')
    try {
      const id = await reimbursementDao.createReimbursement(req.body);
      resp.status(201);
      resp.json(id);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  }])

  /**
 * approve a reimbursement with id
 */
reimbursementRouter.post('/add-Approve/:id', [
  
  // authMiddleware('admin'),
  async (req, resp) => {
    const id = +req.params.id; // convert the id to a number
    console.log(`creating approval with ${id}`)
    try {
      let reimbursements = await reimbursementDao.approveById(id);
      resp.json(reimbursements);
      //  await reimbursementDao.approveById(id);
      // resp.status(201);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  }])

    /**
 * deny a reimbursement with id
 */
reimbursementRouter.post('/add-Deny/:id', [
  // authMiddleware('admin'),
  async (req, resp) => {
    const id = +req.params.id; // convert the id to a number
    console.log(`creating denial with ${id}`)
    try {
      let reimbursements = await reimbursementDao.denyById(id);
      resp.json(reimbursements);
      //  await reimbursementDao.denyById(id);
      // resp.status(201);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  }])

