import express from "express";
import {
    addMarks,
    getUserMarks,
    updateMarks,
    deleteMarks,
    getMarksByUserId
} from "../controllers/usermarkscontroller.js";

import authMiddleware from "../middleware/authmiddleware.js";
import { allowRoles } from "../middleware/adminmiddleware.js";

const marksRouter = express.Router();

// USER → Only see their own marks
marksRouter.get(
    "/getmarks",
    authMiddleware,
    allowRoles("user", "admin", "superadmin"),
    getUserMarks
);

// ADMIN + SUPERADMIN → Full access
marksRouter.post(
    "/addmarks",
    authMiddleware,
    allowRoles("admin", "superadmin"),
    addMarks
);

marksRouter.put(
    "/updatemarks",
    authMiddleware,
    allowRoles("admin", "superadmin"),
    updateMarks
);

marksRouter.delete(
    "/deletemarks/:id",
    authMiddleware,
    allowRoles("admin", "superadmin"),
    deleteMarks
);

marksRouter.get(
    "/admin/marks/:id",
    authMiddleware,
    allowRoles("admin", "superadmin"),
    getMarksByUserId
);

export default marksRouter;