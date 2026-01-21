import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import { allowRoles } from "../middleware/adminmiddleware.js";
import {
    createAdmin,
    getAllAdmins,
    updateAdmin,
    deleteAdmin,
    getAllUsers,
} from "../controllers/superadmincontroller.js";

const superadminRouter = express.Router();

/**
 * ✅ ADMIN + SUPERADMIN BOTH CAN ACCESS
 */
superadminRouter.get(
    "/getallusers",
    authMiddleware,
    allowRoles("admin", "superadmin"),
    getAllUsers
);

/**
 * 🔒 BELOW THIS LINE → ONLY SUPERADMIN
 */
superadminRouter.use(authMiddleware, allowRoles("superadmin"));

// ➤ CREATE ADMIN
superadminRouter.post("/createadmin", createAdmin);

// ➤ GET ALL ADMINS
superadminRouter.get("/getalladmins", getAllAdmins);

// ➤ UPDATE ADMIN
superadminRouter.put("/updateadmin/:id", updateAdmin);

// ➤ DELETE ADMIN
superadminRouter.delete("/deleteadmin/:id", deleteAdmin);

export default superadminRouter;