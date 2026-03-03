import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mailService.js";
import { customMesssage } from "../utils/customMessage.js";
/**
 * - user auth controller
 * - /api/auth/register
 * - POST method
 */
export const registerUser = async function (req, res) {
    const { email, password, name } = req.body;
    const isExists = await User.findOne({ email });
    if (isExists) {
        return res.status(422).json({
            message: "Already exists user",
            success: false,
        });
    }

    const user = await User.create({
        email,
        password,
        name,
    });

    const token = jwt.sign(
        {
            userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" },
    );

    res.cookie("access_token", token);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

    await sendEmail(
        user.email,
        "🎉 Registration Successful",
        "Your account has been successfully created.",
        customMesssage(user.name)
    );

};

export const loginUser = async function (req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({
            message: "Email or password is INVALID",
            success: false
        })
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or password is INVALID",
            success: false
        })
    }

    const token = jwt.sign(
        {
            userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" },
    );

    res.cookie("access_token", token);
    return res.status(201).json({
        success: true,
        message: "User login successfully",
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })
}