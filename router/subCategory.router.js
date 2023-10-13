import express  from "express";
import { addSubCategory, deleteSubCategory, getSingleSubCat, getSubcategory, subCategoryByCate, updateSubCategory } from "../controller/subCategory.controller";


const router = express.Router();

router.post("/add",addSubCategory);
router.get("/all",getSubcategory);
router.get("/single/:id",getSingleSubCat);
router.get("/:category",subCategoryByCate);
router.put("/update/:id",updateSubCategory);
router.delete("/delete/:id",deleteSubCategory);

export default router