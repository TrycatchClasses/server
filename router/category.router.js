import express from 'express';
import { addCategory, deleteCategory, getallCategories, singleCategory, updateCategory } from '../controller/categories.controller';

const router = express.Router();

router.post("/add",addCategory);
router.get("/all",getallCategories);
router.get("/single/:id",singleCategory);
router.put("/update/:id",updateCategory);
router.delete("/delete/:id",deleteCategory);

export default router