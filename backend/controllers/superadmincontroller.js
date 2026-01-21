import Users from "../models/userschema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Create Admin (Only Superadmin)
 */
/**
 * Get All Users (Only Superadmin)
 */
export const getAllUsers = async(req, res) => {
    try {


        const users = await Users.find(); // fetch all users

        return res.status(200).json({
            message: "All users fetched successfully",
            data: users
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const createAdmin = async(req, res) => {
    try {
        // Only superadmin allowed
        if (req.user.role !== "superadmin") {
            return res.status(403).json({ message: "Access denied: Only superadmin can create admin" });
        }

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check existing admin/user
        const exists = await Users.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Encrypt password
        const hashPass = await bcrypt.hash(password, 10);

        // Create admin
        const newAdmin = await Users.create({
            name,
            email,
            password: hashPass,
            role: "admin"
        });

        return res.status(201).json({
            message: "Admin created successfully",
            data: newAdmin
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


/**
 * Get All Admins (Only Superadmin)
 */
export const getAllAdmins = async(req, res) => {
    try {
        if (req.user.role !== "superadmin") {
            return res.status(403).json({ message: "Access denied: Only superadmin can view admins" });
        }

        const admins = await Users.find({ role: "admin" });

        return res.status(200).json({
            message: "All admins fetched successfully",
            data: admins
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


/**
 * Update Admin (Only Superadmin)
 */
export const updateAdmin = async(req, res) => {
    try {
        if (req.user.role !== "superadmin") {
            return res.status(403).json({ message: "Access denied: Only superadmin can update admin" });
        }

        const adminId = req.params.id;
        const { name, email } = req.body;

        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;

        const updated = await Users.findByIdAndUpdate(adminId, updateData, { new: true });

        if (!updated) {
            return res.status(404).json({ message: "Admin not found" });
        }

        return res.status(200).json({
            message: "Admin updated successfully",
            data: updated
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


/**
 * Delete Admin (Only Superadmin)
 */
export const deleteAdmin = async(req, res) => {
    try {
        if (req.user.role !== "superadmin") {
            return res.status(403).json({ message: "Access denied: Only superadmin can delete admin" });
        }

        const adminId = req.params.id;

        const deleted = await Users.findByIdAndDelete(adminId);

        if (!deleted) {
            return res.status(404).json({ message: "Admin not found" });
        }

        return res.status(200).json({
            message: "Admin deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};