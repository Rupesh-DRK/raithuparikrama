import express from 'express';
import mongoose from 'mongoose';
import productRoute from './routes/product.js';
import sellerRoute from './routes/SellerRoutes.js';
import userRoute from './routes/UserRoutes.js';
import cateRoute from './routes/categories.js';
import AddressRoute from './routes/AddressRoutes.js';
import ReviewRoute from './routes/ReviewRoutes.js';
import path from 'path';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import countRoute from './routes/counterRoutes.js';
import { fileURLToPath } from 'url';
import fs from 'fs';
import MailRoutes from './routes/mailRoutes.js';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import AdminRoute from './routes/AdminRoutes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as necessary
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the "images" directory exists
const imagesDir = path.resolve(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Serve static files from the "images" directory
app.use('/backend/images', express.static(imagesDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const uploadImages = multer({ storage: storage });

app.post('/backend/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

app.post('/backend/uploads', uploadImages.array('files', 5), (req, res) => {
  try {
    res.status(200).json('Files uploaded successfully');
  } catch (err) {
    console.error(err);
    res.status(500).json('Error uploading files');
  }
});

// Middleware routes
app.use('/backend/product', productRoute);
app.use('/backend/seller', sellerRoute);
app.use('/backend/user', userRoute);
app.use('/backend/address', AddressRoute);
app.use('/backend/review', ReviewRoute);
app.use('/backend/category', cateRoute);
app.use('/backend/mail', MailRoutes);
app.use('/backend/counter', countRoute);
app.use('/backend/admin', AdminRoute);

const url = process.env.DB_URL;

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

// Payment related


function generateHash(data) {
  const { key, txnid, amount, productinfo, firstname, email, salt } = data;
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  const hash = crypto.createHash('sha512').update(hashString).digest('hex');
  return hash;
}

app.post('/generate-hash', (req, res) => {
  const hash = generateHash(req.body);
  res.json({ hash });
});
