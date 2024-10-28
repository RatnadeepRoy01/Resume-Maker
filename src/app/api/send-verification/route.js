// /app/api/auth/send-verification/route.js
import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";

export async function POST(request) {
  const { email } = await request.json();
  const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code

  // Setup nodemailer to send the email
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or another email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is ${verificationCode}`,
  });

  // Encrypt the verification code before storing it in local storage
  const encryptedCode = CryptoJS.AES.encrypt(verificationCode.toString(), process.env.NEXT_PUBLIC_SECRET_KEY).toString();

  // Return the encrypted code (for demonstration; in a real app, you wouldn't expose this)
  return new Response(JSON.stringify({ email, encryptedCode }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
