import User from '@/models/user.model';
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'

export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        // todo: configure mail for usage
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verfiyTokenExpiry: Date.now() + 3600000}
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}
            )
        }
        
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "e1efeec69aa376", // shouldn't be here
              pass: "78b440d7d5dc06"  // sholdn't be here
            }
        });

        const verfiyHTML = 
        `<p> Click 
        <a href="${process.env.DOMAIN}/verfiyemail?token=${hashedToken}">here </a> 
        to ${emailType === "VERIFY" ? "verify your email" : "Reset your password"} or copy and paste the link below in your browser.
        <br>
        ${process.env.DOMAIN}/verfiyemail?token=${hashedToken}
        </p>`;

        const resetHTML = 
        `<p>Click 
        <a href="${process.env.DOMAIN}/verfiyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "Reset your password"} or copy and paste the link below in your browser.
        <br>
        ${process.env.DOMAIN}/verfiyemail?token=${hashedToken}
        </p>`;

        const mailOptions = {
            from: "swatantra.burner@gmail.com",
            to: email,
            subject: emailType === 'VERIFY' ? 'VERIFY YOUR EMAIL' : 'RESET YOUR PASSWORD',
            html: emailType === 'VERIFY' ? verfiyHTML : resetHTML
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailOptions

    } catch (error: any) {
        throw new Error(error.message)
    }
}