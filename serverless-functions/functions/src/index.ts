import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { generateDocument } from "./services/document";

// Initialize Firebase Admin SDK
admin.initializeApp();

// API endpoint to handle invoice generation
export const generateInvoice = onRequest((req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
  }

  const requestData = req.body;

  // Validate input data
  if (!requestData) {
    res.status(400).send("Bad Request: Missing data");
  }

  try {
    const documentBuffer = generateDocument(requestData);

    // Set headers and send the generated document as a downloadable file
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=generated_invoice.docx"
    );
    res.send(documentBuffer);
  } catch (error) {
    console.error("Error generating document:", error);
    res.status(500).send("Internal Server Error");
  }
});
