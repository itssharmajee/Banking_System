import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "Account must be associated with user"],
        index: true,
    },
    status: {
        type: String,
        enum: {
            values: ["ACTIVE", "FROZEN", "CLOSED"],
            message: 'status must be either "ACTIVE","FROZEN" or "CLOSED"',
            default: "ACTIVE"

        }
    },
    currency: {
        type: String,
        required: [true, "currency is required for creation an account"],
        default: "INR",
    }
}, { timestamps: true });

accountSchema.index({ user: 1, status: 1 });

export const Account = mongoose.model("account", accountSchema);

