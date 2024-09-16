import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendWelcomeEmail } from "../emails/emailHandlers.js"
export const signUp = async (req, res) => {
    try {
        const { name, username, email, password } = req.body


        if (
            !name || name.trim() === "" ||
            !username || username.trim() === "" ||
            !email || email.trim() === "" ||
            !password || password.trim() === ""
        ) {
            return res.status(400).json({ message: "Por favor, preencha todos os campos" });
        }

        const existingEmail = await User.findOne({ email })

        if (existingEmail) {
            return res.status(400).json({ message: "Este e-mail já está em uso" })
        }
        const existingUsername = await User.findOne({ username })

        if (existingUsername) {
            return res.status(400).json({ message: "O nome de usuário já está em uso" })
        }
        if (password.length < 8) {
            res.status(400).json({ message: "A senha deve ter no minímo 8 caracteres" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password: hashedPassword,
            username
        })


        await user.save()

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })

        res.cookie("jwt-linkedin", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({ mesage: "Usuário criado com sucesso" })

        const profileUrl = process.env.CLIENT_URL + "/profile/" + user.username

        try {
            await sendWelcomeEmail(user.email, user.name, profileUrl)

        } catch (emailError) {
            console.log(emailError)
        }

    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || username.trim() === "" || !password || password.trim() === "") {
            return res.status(400).json({ message: "Por favor, preencha todos os campos" });
        }

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Usuário ou senha inválida" });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Usuário ou senha inválida" });
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        await res.cookie("jwt-linkedin", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.json({ message: "Login feito com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
}


export const logout = (req, res) => {
    res.clearCookie("jwt-linkedin")
    res.json({ message: "Logout feito com sucesso" })
}


export const getCurrentUser = async (req,res) => {
    try {
        res.json(req.user)
    } catch (error) {
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
}