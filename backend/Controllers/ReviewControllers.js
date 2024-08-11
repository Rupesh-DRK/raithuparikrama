// controllers/reviewController.js
import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  const { productId,sellerId, userId, rating, comment } = req.body;
  try {
    const review = new Review({ productId, userId,sellerId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getAverageRating = async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await Review.find({ productId });
    if (reviews.length === 0) {
      return res.status(200).json({ averageRating: 0 });
    }
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    res.status(200).json({ averageRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch average rating' });
  }
};
