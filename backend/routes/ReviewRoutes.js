// routes/reviewRoutes.js
import express from 'express';
import { createReview, getReviewsByProduct, updateReview, deleteReview, getAverageRating } from "../Controllers/ReviewControllers.js"

const router = express.Router();

router.post('/', createReview);
router.get('/product/:productId', getReviewsByProduct);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.get('/average-rating/:productId', getAverageRating);

export default router;
