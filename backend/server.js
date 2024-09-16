import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import { connectDB } from "./lib/db.js"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/posts",postRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
    connectDB()
})