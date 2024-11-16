import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { generateBuffer } from "./services/document.service";
import { validateInvoiceData } from "./middleware/validate.middleware";
import { calculateInvoiceData } from "./services/calculate.service";
import { sendMail } from "./services/mail.service";
import dotenv from "dotenv";
dotenv.config();

// API endpoint to handle invoice generation
export const generateInvoice = onRequest(
  async (req: Request, res: Response) => {
    const { invoiceDetails } = req.body;

    try {
      // Generate the invoice document
      const documentBuffer = generateBuffer(invoiceDetails);

      // Send the email with the invoice as an attachment
      await sendMail({
        to: process.env.EMAIL_RECIPIENT as string,
        subject: `Invoice #${invoiceDetails.invoice_no}`,
        html: `<p>Hello ${invoiceDetails.buyer_name},</p><p>Your invoice is attached.</p>`,
        text: `Hello ${invoiceDetails.buyer_name}, your invoice is attached.`,
        attachments: [
          {
            filename: "invoice.docx",
            content: documentBuffer,
          },
        ],
      });

      res
        .status(200)
        .json({ message: "Invoice generated and sent successfully." });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to generate and send invoice." });
    }
  }
);
