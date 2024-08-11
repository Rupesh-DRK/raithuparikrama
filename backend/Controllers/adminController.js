import Order from '../models/OrderModel.js';
import Admin from '../models/adminSchema.js';
import jwt from 'jsonwebtoken';
export const registerAdmin = async(req, res) => {
try {
  const { username, email, Dob, Gender, mobile, Alternative_mobile, password, profile } = req.body;
  
  const newUser = new Admin({ username, email, Dob, Gender, mobile, Alternative_mobile, password, profile });
  const saveduser = await newUser.save()
  res.status(200).send(saveduser)
  
} catch (error) {
  res.status(500).send(error)
}
     
  };
  

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Admin.findOne({ email });

        if (!user || password !== user.password) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SEC, { expiresIn: '20m' });

        // Remove password from user data
        const { password: _, ...userData } = user.toObject();

        // Return user data and token in response
        res.status(200).json({ user: userData, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const updateAdmin = async (req, res) => {
  try {
    const {id}  = req.params;
    console.log('User ID:', id);
    console.log('Request Body:', req.body);
    
    const updateAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
    if (!updateAdmin) {
      return res.status(404).json({  ID:id,
        message: 'User not found' });
    }

    res.json(updateAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



export const getUsersByIds = async (req, res) => {
  const { userIds } = req.body;
  try {
    const users = await Admin.find({ _id: { $in: userIds } });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const getAllOrders = async (req,res) =>{
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });

  }
}

