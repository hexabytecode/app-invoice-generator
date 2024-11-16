import Joi from "joi";

export const invoiceSchema = Joi.object({
  buyer_name: Joi.string().required(),
  buyer_homeAddress: Joi.string().required(),
  buyer_workAddress: Joi.string().required(),
  buyer_gst: Joi.string().required(),
  buyer_contact: Joi.number().required(),
  transport_name: Joi.string().required(),
  transport_gst: Joi.string().required(),
  invoice_no: Joi.string().required(),
  invoice_date: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        item_no: Joi.number().required(),
        item_name: Joi.string().required(),
        item_hsn: Joi.number().required(),
        item_qty: Joi.number().required(),
        item_unitWeight: Joi.number().required(),
        item_unitRate: Joi.number().required(),
        item_cost: Joi.number().required(),
      })
    )
    .required(),
});
