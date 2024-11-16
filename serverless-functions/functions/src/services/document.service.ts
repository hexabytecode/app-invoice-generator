import * as fs from "fs";
import * as path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export const generateBuffer = (data: any): Buffer => {
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
  doc.render(data);

  // Generate the document as a Node.js buffer
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  return buf;
};