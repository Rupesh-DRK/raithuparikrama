import express from 'express';
import { getAllCategories, createCategory, deleteCategoryIfNoProducts} from '../Controllers/categoryController.js';

const router = express.Router();

router.get("/", getAllCategories);
router.post("/cat", createCategory);
router.post("/addcate", createCategory);
router.delete('/category/:id', deleteCategoryIfNoProducts);

export default router;
