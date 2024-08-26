import express from "express"
import { getCount, getUseCount } from "../Controllers/counter.js";
const router = express.Router();


router.get("/getcount",getCount)
router.get("/getUsers",getUseCount)


export default router;