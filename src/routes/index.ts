import express from 'express';
const router = express.Router();

import userRouter from './userRouter';

export default router.use('/v1', userRouter)