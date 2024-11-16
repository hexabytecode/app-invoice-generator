import { ToWords } from "to-words";

export const calculateInvoiceData = (items: any[]): any => {
  const subtotal = items.reduce((sum, item) => sum + item.item_cost, 0);
  const cgst = (subtotal * 9) / 100;
  const sgst = (subtotal * 9) / 100;
  const total = subtotal + cgst + sgst;

  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: { currency: true },
  });

  const totalCostToWords = toWords.convert(total);

  return {
    subtotal_cost: subtotal,
    cgst_cost: cgst,
    sgst_cost: sgst,
    total_cost: total,
    totalCost_toWords: totalCostToWords,
  };
};
