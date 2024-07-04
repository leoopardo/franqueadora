import { createResponseSchema } from "@franchisor/services/__interfaces/response.interface";
import { z } from "zod";

export const FranchiseAgreementTypeSchema = z.enum([
  "DIRECT_TRANSACTION",
  "PHYSICAL_PUB_CONSUMER",
  "PHYSICAL_PUB_PRODUCER",
  "ONLINE_PUB",
  "ONLINE_TICKET",
  "PHYSICAL_TICKET_CONSUMER",
  "PHYSICAL_TICKET_PRODUCER",
]);
export type TFranchiseAgreementType = z.infer<
  typeof FranchiseAgreementTypeSchema
>;

const FranchiseAgreementKeySchema = z.enum([
  "ANTIFRAUD",
  "TRANSACTION",
  "FEE_EMISSION",
  "FEE_PAY365",
  "RESULT_FRANCHISOR",
  "RESULT_CREDIT_ADVANCE",
  "SPREAD_CREDIT_ADVANCE",
]);
export type TFranchiseAgreementKey = z.infer<
  typeof FranchiseAgreementKeySchema
>;

const FranchiseAgreementValueTypeSchema = z.enum(["PERCENTAGE", "CURRENCY"]);
export type TFranchiseAgreementValueType = z.infer<
  typeof FranchiseAgreementValueTypeSchema
>;

export const FranchiseAgreementTamplateSchema = z.object({
  id: z.string().uuid(),
  type: FranchiseAgreementTypeSchema,
  key: FranchiseAgreementKeySchema,
  name: z.string(),
  value: z.string(),
  value_type: FranchiseAgreementValueTypeSchema,
  active: z.boolean(),
});

export const agreementResponseSchema = createResponseSchema(
  FranchiseAgreementTamplateSchema
);

export type AgreementType = z.infer<typeof FranchiseAgreementTamplateSchema>;
