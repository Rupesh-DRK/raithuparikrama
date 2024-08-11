import express from 'express';
import { registerUser, loginUser, updateUser, getUsersByIds, getMyOrders } from '../Controllers/userController.js';
import { requireSignIn ,isUser} from "../middleware/AuthMiddleware.js"

const router = express.Router();

router.post('/register', registerUser);
// router.post('/userreg', registerUser);

router.post('/login', loginUser);
router.put('/:id',requireSignIn,isUser, updateUser);
router.post('/users', getUsersByIds);

router.get('/orders', requireSignIn,getMyOrders);

router.get("/user-auth", requireSignIn, isUser, (req, res) => {
    res.status(200).send({ ok: true });
  });


export default router;
