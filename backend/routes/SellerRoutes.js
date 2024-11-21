import express from 'express';
import { addSeller, loginSeller, getSeller, updateSeller, getAllSellers, approveSeller, disapproveSeller, notifyApproval, notifyDisapproval } from '../Controllers/SellerControllers.js';
import { requireSignIn , isSeller} from "../middleware/AuthMiddleware.js"
 
const router = express.Router();

router.post('/add', addSeller);
router.post("/login", loginSeller);
router.post('/sel', getSeller);
router.get('/getSeller/:id',getSeller)
router.put("/:id", updateSeller);
router.get("/seller-auth", requireSignIn, isSeller, (req, res) => {
    res.status(200).send({ ok: true });
  });
router.get("/allSellers", getAllSellers);
router.post('/approve/:id',approveSeller);
router.post('/disapprove/:id',disapproveSeller);
router.post('/notify-approval/:id',notifyApproval);
router.post('/notify-disapproval/:id',notifyDisapproval);

export default router;
