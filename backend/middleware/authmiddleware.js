import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // "Bearer tokenvalue" → split and take token
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token found" });
    }
    console.log("AUTH HEADER =>", req.headers.authorization);


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // store decoded data
        next(); // allow request to continue
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
export default authMiddleware;