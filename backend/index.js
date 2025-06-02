import express from 'express';
import mongoose from 'mongoose';
import productRoute from './routes/product.js';
import sellerRoute from './routes/SellerRoutes.js';
import userRoute from './routes/UserRoutes.js';
import cateRoute from './routes/categories.js';
import AddressRoute from './routes/AddressRoutes.js';
import ReviewRoute from './routes/ReviewRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import countRoute from './routes/counterRoutes.js';
import bodyParser from 'body-parser';
import AdminRoute from './routes/AdminRoutes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as necessary
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());
app.use(cors());


// Middleware routes
app.use('/backend/product', productRoute);
app.use('/backend/seller', sellerRoute);
app.use('/backend/user', userRoute);
app.use('/backend/address', AddressRoute);
app.use('/backend/review', ReviewRoute);
app.use('/backend/category', cateRoute);
app.use('/backend/counter', countRoute);
app.use('/backend/admin', AdminRoute);

// const url = process.env.DB_URL;
const url = "mongodb+srv://rupesh:rupesh@toolscom.lmmwne2.mongodb.net/?retryWrites=true&w=majority&appName=toolscom"
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
