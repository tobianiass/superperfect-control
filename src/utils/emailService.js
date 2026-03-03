import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate verification URL
export const generateVerificationUrl = (token) => {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    return `${baseUrl}/verify-email?token=${token}`;
};

// Generate reset password URL
export const generateResetUrl = (token) => {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    return `${baseUrl}/reset-password?token=${token}`;
};

// Send verification email
export const sendVerificationEmail = async (email, token) => {
    const verificationUrl = generateVerificationUrl(token);
    
    try {
        const result = await resend.emails.send({
            from: 'Controler <onboarding@resend.dev>',
            to: email,
            subject: 'Verify your Controler account',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Welcome to Controler!</h2>
                    <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationUrl}" 
                           style="background-color: #000; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
                            Verify Email
                        </a>
                    </div>
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
                    <p style="color: #999; font-size: 14px;">This link will expire in 10 minutes.</p>
                    <p style="color: #999; font-size: 14px;">If you didn't create an account, please ignore this email.</p>
                </div>
            `,
        });
        
        // Check if there was an error in the response
        if (result.error) {
            console.error('Resend error:', result.error);
            return { success: false, error: result.error.message };
        }
        
        return { success: true, data: result };
    } catch (error) {
        console.error('Error sending verification email:', error);
        return { success: false, error: error.message };
    }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, token) => {
    const resetUrl = generateResetUrl(token);
    
    try {
        await resend.emails.send({
            from: 'Controler <onboarding@resend.dev>',
            to: email,
            subject: 'Reset your Controler password',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Password Reset Request</h2>
                    <p>You requested to reset your password. Click the button below to set a new password:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" 
                           style="background-color: #000; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
                            Reset Password
                        </a>
                    </div>
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="color: #666; word-break: break-all;">${resetUrl}</p>
                    <p style="color: #999; font-size: 14px;">This link will expire in 10 minutes.</p>
                    <p style="color: #999; font-size: 14px;">If you didn't request a password reset, please ignore this email.</p>
                </div>
            `,
        });
        return { success: true };
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return { success: false, error: error.message };
    }
};
