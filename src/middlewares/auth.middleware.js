import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authMiddleware = async function (req,res,next){
    const token = req.cokkies["access_token"] || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access, token is missing",
            success:false
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(token.userId);

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            message:"Unauthorized access, token is invalid",
            success:false
        })
    }
}