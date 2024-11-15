import * as fs from "fs";
import * as path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export const generateDocument = (data: any): Buffer => {
  const content = fs.readFileSync(
    path.resolve(__dirname, "../assets/invoice_template.docx"),
    "binary"
  );
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
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
