import express from 'express';
import { addToCart, getFromCart, removeFromCart } from '../controller/cardController.js';
import authMiddleware from '../middleware/auth.js';
const cartRouter = express.Router();

cartRouter.post('/add',authMiddleware,  addToCart);
cartRouter.post('/get', authMiddleware, getFromCart);
cartRouter.post('/remove',authMiddleware,  removeFromCart);


export default cartRouter;