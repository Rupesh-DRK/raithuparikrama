import Category from '../models/categories.js';
import Product from "../models/productschema.js"

export const createCategory = async (req, res) => {
  try {
    const categoryExists = await Category.findOne({ name: { $regex: new RegExp(`^${req.body.name}$`, 'i') } });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    const { name, img } = req.body;
    const newCategory = new Category({ 
      name,
      img
    });
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getAllCategories = async (req, res) => {
    try {
      let categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

export const deleteCategoryIfNoProducts = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Check if there are any products with this category
    const productsWithCategory = await Product.find({ category: categoryId });

    if (productsWithCategory.length > 0) {
      return res.status(400).json({ message: 'Cannot delete category, there are products associated with it.' });
    }

    // Delete the category
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    res.status(200).json({ message: 'Category successfully deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
