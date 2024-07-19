import { z } from "zod";

export const CurrencyTypeSchema = z.object({
  id: z.enum(["BRL", "USD"]),
  label: z.string(),
});

export const PaymentMethodSchema = z.object({
  id: z.string(),
  name: z.enum([
    "Pix",
    "Dinheiro",
    "Cartão de Débito",
    "Cartão de Crédito",
    "Cashless",
    "Cortesia",
    "Desconto",
    "Comanda",
  ]),
  order: z.number(),
});

export const PaymentTypeSchema = z.object({
  id: z.enum(["PREPAID", "POSTPAID", "BOTH"]),
  label: z.string(),
});

export const RecurrenceTypeSchema = z.object({
  id: z.enum(["UNIQUE", "RECURRENT", "PASSPORT"]),
  label: z.string(),
});

export const ProfileTypeSchema = z.object({
  id: z.enum(["MANAGER", "OPERATOR", "WAITER", "FINANCE", "CASHIER"]),
  label: z.string(),
});

export const TimezonesSchema = z.object({
  id: z.string(),
  label: z.string(),
  utc: z.string(),
});

export const TypeSchema = z.object({
  id: z.enum(["ONLINE", "PRESENCIAL"]),
  label: z.string(),
});

export const SelectsSchema = z.object({
  currency_types: z.array(CurrencyTypeSchema).optional(),
  payment_method_templates: z.array(PaymentMethodSchema).optional(),
  payment_type: z.array(PaymentTypeSchema).optional(),
  recurrence_types: z.array(RecurrenceTypeSchema).optional(),
  terminal_user_profiles: z.array(ProfileTypeSchema).optional(),
  timezones: z.array(TimezonesSchema).optional(),
  types: z.array(TypeSchema).optional(),
});

export type SelectType = z.infer<typeof SelectsSchema>;
