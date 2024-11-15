"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoice = void 0;
const https_1 = require("firebase-functions/v2/https");
const admin = __importStar(require("firebase-admin"));
const document_1 = require("./services/document");
// Initialize Firebase Admin SDK
admin.initializeApp();
// API endpoint to handle invoice generation
exports.generateInvoice = (0, https_1.onRequest)((req, res) => {
    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
    }
    const requestData = req.body;
    // Validate input data
    if (!requestData) {
        res.status(400).send("Bad Request: Missing data");
    }
    try {
        const documentBuffer = (0, document_1.generateDocument)(requestData);
        // Set headers and send the generated document as a downloadable file
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        res.setHeader("Content-Disposition", "attachment; filename=generated_invoice.docx");
        res.send(documentBuffer);
    }
    catch (error) {
        console.error("Error generating document:", error);
        res.status(500).send("Internal Server Error");
    }
});
