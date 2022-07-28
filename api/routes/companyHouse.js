import express from 'express'
import { advanceSearch } from '../controllers/apicall.js';
import { createError } from '../utils/error.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//advance search
router.get("/", advanceSearch)

export default router