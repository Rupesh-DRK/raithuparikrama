import express from 'express';
import { sendMail } from '../Controllers/Mail.js';

const router = express.Router();

router.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;
  sendMail(to, subject, text);
  res.send('Email sent successfully');
});

export default router;
