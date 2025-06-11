import nodemailer from "nodemailer";
import dotenv from "dotenv";
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

//Modificar ruta ip en caso se cambie
export const sendPasswordResetEmail = async (username, to, token) => {
  const resetLink = `http://localhost:5173/Xy20passw05/${token}`;

  await transporter.sendMail({
    from: '"Soporte Ufti MDPH" <' + process.env.OUTLOOK_USER + ">",
    to,
    subject: `Recupera contraseña PIDE APP para el usuario: ${username}`,
    html: `<p>Ingresa al siguiente enlace para restablecer la contraseña:</p>
           <a href="${resetLink}">${resetLink}</a>
           <br>
           <p>Atentamente</p>
           <p>Unidad Funcional de Tecnologias de la Informacion.</p>
           `,
  });
  console.log("ENVIADO");
};
