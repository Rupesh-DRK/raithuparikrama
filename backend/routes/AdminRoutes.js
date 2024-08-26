import express from 'express';
import { requireSignIn , isAdmin} from "../middleware/AuthMiddleware.js"
import { getAllOrders, loginAdmin, registerAdmin, updateAdmin } from '../Controllers/adminController.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.put('/:id',requireSignIn,isAdmin, updateAdmin);
router.get('/orders',getAllOrders)
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => { 
    res.status(200).send({ ok: true });
  });


export default router;
