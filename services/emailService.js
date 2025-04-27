import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerifyEmail = async ({ to, token }) => {
  const verifyUrl = `${process.env.BASE_URL}/api/auth/verify/${token}`;
  const mail = {
    from: process.env.SMTP_USER,
    to,
    subject: "Підтвердження email",
    html: `
      <p>Будь ласка, підтвердіть свій email, перейшовши за посиланням:</p>
      <a href="${verifyUrl}">Підтвердити email</a>
    `,
  };
  await transporter.sendMail(mail);
};
