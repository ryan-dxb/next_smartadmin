import nodemailer from "nodemailer";

const generateMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  return transporter;
};

interface User {
  id: string;
  email: string;
}

export const sendVerificationEmail = async (user: User, token: string) => {
  const transporter = generateMailTransporter();

  const { id, email } = user;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Email Verification",
    html: `<h1>Click the link below to verify your email</h1>
        <a href="${process.env.CLIENT_URL}/verify-email/${id}/${token}">Verify Email</a>`,
  };

  transporter.sendMail(mailOptions);
};
