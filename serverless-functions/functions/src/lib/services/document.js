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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDocument = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const pizzip_1 = __importDefault(require("pizzip"));
const docxtemplater_1 = __importDefault(require("docxtemplater"));
const generateDocument = (data) => {
    const content = fs.readFileSync(path.resolve(__dirname, "../assets/invoice_template.docx"), "binary");
    // Unzip the content of the template
    const zip = new pizzip_1.default(content);
    // Parse the template
    const doc = new docxtemplater_1.default(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    // Render the document with dynamic data
    doc.render({
        buyer_name: data.buyer_name,
        buyer_homeAddress: data.buyer_homeAddress,
        buyer_workAddress: data.buyer_workAddress,
        buyer_gst: data.buyer_gst,
        buyer_contact: data.buyer_contact,
        transport_name: data.transport_name,
        transport_gst: data.transport_gst,
        invoice_no: data.invoice_no,
        invoice_date: data.invoice_date,
        items: data.items,
        subtotal_cost: data.subtotal_cost,
        cgst_cost: data.cgst_cost,
        sgst_cost: data.sgst_cost,
        total_cost: data.total_cost,
        totalCost_toWords: data.totalCost_toWords,
    });
    // Generate the document as a Node.js buffer
    const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });
    return buf;
};
exports.generateDocument = generateDocument;
