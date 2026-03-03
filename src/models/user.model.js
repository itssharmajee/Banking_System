import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email must be there for creating a user account"],
        trim: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address.",
        ],
    },
    name: {
        type: String,
        required: [true, "Name is mandatory field"],
    },
    password: {
        type: String,
        required: [true, "Password is mandatory"],
        minlength: [7, "Password must be of 7 and more character"],
        select: false,
    }
},{timestamps:true})

userSchema.pre("save",async function() {
    if(!this.isModified("password")){
        return;
    }

    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;

    return;

})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

export const User = mongoose.model("user",userSchema);
