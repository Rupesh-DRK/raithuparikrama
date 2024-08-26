import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
export const registerUser = async(req, res) => {
try {
  const { username, email, Dob, Gender, mobile, Alternative_mobile, password, profile } = req.body;
  const existingUser = await User.findOne({ $or: [{ email }, { username }, { mobile }] });
    if (existingUser) {
      return res.status(400).send({ error: 'Username, email, or mobile already exists' });
    }
  const newUser = new User({ username, email, Dob, Gender, mobile, Alternative_mobile, password, profile });
  console.log(newUser);

  const saveduser = await newUser.save()
  console.log(saveduser)
  res.status(200).send(saveduser)
  
} catch (error) {
  res.status(500).send(error)
}
     
  };
  

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

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



export const updateUser = async (req, res) => {
  try {
    const {id}  = req.params;
    console.log('User ID:', id);
    console.log('Request Body:', req.body);
    
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({  ID:id,
        message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



export const getUsersByIds = async (req, res) => {
  const { userIds } = req.body;
  try {
    const users = await User.find({ _id: { $in: userIds } });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

  
export const getMyOrders=(req,res)=>{
  try {
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to Fetch Orders' });
  }

}