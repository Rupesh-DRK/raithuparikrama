import Product from "../models/productschema.js"
import User from "../models/userSchema.js"
import Seller from "../models/vendor.js"

export const getCount= async(req,res)=>{
    try {
        const results = {};
      results.total = await Product.countDocuments().exec()
      results.categoryCount = await Product.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } }
      ]);


      res.status(200).send({results}
      )
    } catch (error) {
      res.status(500).send(error)
    }
  
  }
  export const getUseCount = async (req, res) => {
    try {
        const results = {};
        results.users = await User.countDocuments().exec();
        results.sellers = await Seller.countDocuments().exec();
        results.total = results.users + results.sellers;
        res.status(200).send({ results });
    } catch (error) {
        res.status(500).send(error);
    }
};

  