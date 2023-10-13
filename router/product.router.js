import express from "express";
import { addProduct, deleteProduct, getProByCategory, getallProducts, singleProduct, updateProduct } from "../controller/product.controller";

const router = express.Router();

router.post("/add",addProduct);
router.get("/all",getallProducts);
router.get("/single/:id",singleProduct);
router.get("/:category",getProByCategory);
router.put("/update/:id",updateProduct);
router.delete("/delete/:id",deleteProduct);


export default router;