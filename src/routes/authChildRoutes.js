import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { registerChild } from '../controllers/authChildController.js'

const router = Router()

router.post('/register', authRequired, registerChild)

export default router;