import express from 'express';
import {requireSignIn,isSeller} from "../middleware/AuthMiddleware.js"
import {
  getAllProducts,
  createProduct,
  getProductById,
  getProductsByCategoryAndPrice,
  getProductsBySellerId,
  updateProduct,
  deleteProduct,
  searchProductController,
  getCategoryProducts,
  getProductByCategory,
  getProductsWithBase64,
  updateProductVisits,
  getProductsByVisits,
} from '../Controllers/ProductControllers.js';

const router = express.Router();

router.get("/", getAllProducts);
router.get("/random", getProductsWithBase64);
router.get("/getProducts", getProductsByVisits);
router.post("/post",requireSignIn,isSeller,createProduct);
router.post("/addProduct",createProduct);
router.get("/:id", getProductById);
router.post("/cats", getProductsByCategoryAndPrice);
router.post("/sellerproducts",requireSignIn,isSeller, getProductsBySellerId);
router.put('/:id',requireSignIn,isSeller, updateProduct);
router.put('/visits/:id',updateProductVisits);
router.delete('/:id',requireSignIn,isSeller, deleteProduct);
router.get("/search/:keyword", searchProductController);
router.get("/category/:category",getCategoryProducts);
router.get("products/category/:category",getProductByCategory);


export default router;
