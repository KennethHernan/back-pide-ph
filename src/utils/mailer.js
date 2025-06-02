import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.OUTLOOK_USER,
    pass: process.env.OUTLOOK_PASS,
  },
});

export const sendPasswordResetEmail = async (username,to, token) => {
  const resetLink = `http://localhost:5173/Xy20passw05/${token}`;

  await transporter.sendMail({
    from: '"Soporte Ufti MDPH" <'+(process.env.OUTLOOK_USER)+'>',
    to,
    subject: '"Recupera tu contraseña: '+username+'"',
    html: `<p>Haz clic aquí para restablecer tu contraseña:</p>
           <a href="${resetLink}">${resetLink}</a>`,
  });
  console.log("ENVIADO");
  
};