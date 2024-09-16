import express from "express"
import { getCurrentUser, login, logout, signUp } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post('/signup',signUp)
router.post('/signin',login)
router.post('/logout',logout)

router.get("/me",protectRoute,getCurrentUser)


export default router