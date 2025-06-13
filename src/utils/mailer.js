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
  const resetLink = `http://${process.env.IP_FRONT}:${process.env.PORT_FRONT}/Xy20passw05/${token}`;
  const asunto = process.env.OUTLOOK_ASUNTO;
  const texto = process.env.OUTLOOK_TEXTO;
  const atentamente = process.env.OUTLOOK_ATENTAMENTE;

  await transporter.sendMail({
    from: '"Soporte Ufti MDPH" <' + process.env.OUTLOOK_USER + ">",
    to,
    subject: `${asunto} ${username}`,
    html: `<p>${texto}</p>
           <a href="${resetLink}">${resetLink}</a>
           <br>
           <p>Atentamente</p> 
           <p>${atentamente}</p>
           `,
  });
  console.log("-----------------------------------------------------------------------");
  console.log(`EMAIL DE RECUPERACION ENVIADO A: ${to}`);
  console.log("-----------------------------------------------------------------------");
  console.log("");
  
};
