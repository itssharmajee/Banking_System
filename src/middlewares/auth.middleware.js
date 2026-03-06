import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

/**
 * - Auth middlware check whether token is valid 
 * - if not it denys futher access
 * - also save user to req.user
 */
export const authMiddleware = async function (req,res,next){
    const token = req.cookies["access_token"] || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access, token is missing",
            success:false
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            message:"Unauthorized access, token is invalid",
            success:false
        })
    }
}