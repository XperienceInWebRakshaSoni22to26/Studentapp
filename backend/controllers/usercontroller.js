import Users from "../models/userschema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createuser = async(req, res) => {
    try {
        const { name, email, password, address } = req.body;

        // Check missing fields
        if (!name || !email || !password || !address) {
            return res.status(400).json({
                success: false,
                message: "All fields required!"
            });
        }

        // Check email exists
        const existing = await Users.findOne({ email });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Email already exists!"
            });
        }

        // Hash password
        const hashpassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await Users.create({
            name,
            email,
            password: hashpassword,
            address
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (err) {
        console.log("Error in create user controller", err);

        return res.status(500).json({
            success: false,
            message: "Server error while registering"
        });
    }
};



export const loginuser = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "email and password required" });
        }

        const finduser = await Users.findOne({ email });

        if (!finduser) {
            return res.status(400).json({ message: "user not found" });
        }

        const decrypt = await bcrypt.compare(password, finduser.password);

        if (!decrypt) {
            return res.status(400).json({ message: "password does not match" });
        }

        console.log("JWT SECRET =>", process.env.JWT_SECRET_KEY);

        const generatetoken = jwt.sign({ id: finduser._id, email: finduser.email, role: finduser.role },
            process.env.JWT_SECRET_KEY, // FIXED
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            userId: finduser._id,
            name: finduser.name,
            email: finduser.email,
            role: finduser.role,
            token: generatetoken,
            message: "Login Successful!"
        });

    } catch (err) {
        console.log("error in login controller", err);
        return res.status(500).json({ message: err.message });
    }
};