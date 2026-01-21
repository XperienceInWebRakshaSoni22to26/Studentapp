import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./connection/db.js";
import userrouter from "./routes/userroutes.js";
import marksRouter from "./routes/usermarksroutes.js";
import superadminRouter from "./routes/superadminroutes.js";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
dotenv.config();
app.use(express.json());

connectdb();
app.use('/api', userrouter);
app.use('/api', marksRouter);
app.use('/api', superadminRouter);

app.listen(process.env.PORT, () => {
    console.log(`server is running at port ${process.env.PORT} `);
})