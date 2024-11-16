import { invoiceSchema } from "../schema/invoiceSchema";

export const validateInvoiceData = (data: any): void => {
  const { error } = invoiceSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
};
