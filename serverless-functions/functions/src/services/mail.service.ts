import { transporter } from "../config/mail.config";

interface MailOptions {
  to: string; // Recipient's email address
  subject: string; // Email subject
  text?: string; // Plain text body
  html?: string; // HTML body
  attachments?: [
    {
      filename: string;
      content: Buffer;
    }
  ];
}

export const sendMail = async (options: MailOptions) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
