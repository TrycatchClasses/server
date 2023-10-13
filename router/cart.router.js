import express from 'express';
import { addToCart, removeCart, updateCart } from '../controller/cart.controller';

const router = express.Router();

router.post("/add-cart",addToCart);
router.put("/update",updateCart);
router.delete('/remove/:id',removeCart);


export default router