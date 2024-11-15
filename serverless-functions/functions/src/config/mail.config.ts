import * as nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // or use your email service
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-email-password", // Replace with your email password or App password
  },
});
