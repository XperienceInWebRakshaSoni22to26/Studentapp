import { createuser, loginuser } from "../controllers/usercontroller.js";
import express from "express";

const userrouter = express.Router();
userrouter.post('/createuser', createuser);
userrouter.post('/loginuser', loginuser);

export default userrouter;