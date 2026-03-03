export function customMesssage(name) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        
        <h2 style="color: #2c3e50;">Welcome to Our Banking System 🎉</h2>
        
        <p>Dear ${name},</p>
        
        <p>
            Thank you for registering with us. Your account has been successfully created.
        </p>
        
        <p>
            We are excited to have you onboard. You can now access our secure banking services.
        </p>
        
        <hr style="margin: 20px 0;" />
        
        <p style="font-size: 14px; color: #555;">
            If you did not create this account, please contact our support team immediately.
        </p>
        
        <p style="margin-top: 30px;">
            Regards,<br/>
            <strong>Gautam Sharma  </strong>
            <br/>
            <strong>Banking System Team</strong>
        </p>
    </div>
    `;
}