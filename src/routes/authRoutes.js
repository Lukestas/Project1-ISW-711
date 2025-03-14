import { Router } from "express";
import { login, logout, profile, registerParent } from "../controllers/authController.js";
import { authRequired } from "../middlewares/validateToken.js"

const router = Router();

router.post('/register', registerParent);
router.post('/login', login);
router.post("/logout", logout)
router.get("/profile", authRequired, profile)

export default router;