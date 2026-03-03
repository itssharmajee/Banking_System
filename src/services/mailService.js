import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,        // TLS
    secure: true,    // false for 587 TRUE FOR 465
    auth: {
        user: process.env.EMAIL_USER,   // your gmail
        pass: process.env.EMAIL_PASSWORD,   // 16-digit app password
    },
});

// Verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error("Error connecting to email server:", error);
    } else {
        console.log("✅ Email server is ready to send messages");
    }
});

// Function to send email
export const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Banking Support Tream" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};