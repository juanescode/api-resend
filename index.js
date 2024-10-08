import express from "express";
import cors from "cors";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { firstName, message, email } = req.body;

  const emailContent = `
    <div>
      <h1>Mail enviado de: ${firstName}</h1>
      <h2>Mensaje: ${message}</h2>
      <h3>Correo enviado de: ${email}</h3>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["scanorderly@gmail.com"],
      subject: "ScanOrderly landing",
      html: emailContent,
      text: "ScanOrderly",
    });

    if (error) {
      return res.status(400).json({ error });
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});