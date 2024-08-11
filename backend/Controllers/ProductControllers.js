import Order from '../models/OrderModel.js';
import Product from '../models/productschema.js';
import dotenv from 'dotenv';



dotenv.config()

export const getAllProducts = async (req, res) => { 
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
  
    const results = {};
  
    results.total = await Product.countDocuments().exec();
    results.products = await Product.find().limit(limit).skip(startIndex).exec();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getProductsWithBase64 = async (req, res) => { 
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
  
    const results = {};
    const query = {
      'profile.0': { $regex: '^data:' }
    };
  
    results.total = await Product.countDocuments(query).exec();
    results.products = await Product.find(query).limit(limit).skip(startIndex).exec();
    
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createProduct = async (req, res) => {
  const newPost = new Product(req.body);
  console.log(newPost);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.error('Error saving product:', err);  // Add a console log for more details
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const post = await Product.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProductsByCategoryAndPrice = async (req, res) => {
  try {
    const { checked, range } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (range.length) args.price = { $gte: range[0], $lte: range[1] };
    const prods = await Product.find(args);
    res.status(200).json(prods);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductsBySellerId = async (req, res) => {
  const { sellerId } = req.body;
  try {
    let posts = await Product.find({ seller: sellerId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updateData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product details updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.deleteOne({ _id: productId });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo");
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getCategoryProducts= async (req,res)=>{
  try{
    const{ category } =req.params;
    const results =await Product.find({ category:category}).select("-photo");
    res.json(results)
  }
  catch(err){
    res.status(400).send({
      error:err.message
    })
  }
}
export const getProductByCategory = async () =>{
  try {
    const {categoryId} = req.params;
    const result = await Product.findById({categoryId});
    res.json(result);
  }
  catch(err){
    res.status(400).send({
    error: err.message
    })
  }
}




export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send({
      error: error.message
    });
  }
};


