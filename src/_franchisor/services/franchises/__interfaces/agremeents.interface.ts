import { createResponseSchema } from "../../__interfaces/response.interface";
import { z } from "zod";

export const FranchiseAgreementTypeSchema = z.enum([
  "DIRECT_TRANSACTION",
  "PHYSICAL_PUB_CONSUMER",
  "PHYSICAL_PUB_PRODUCER",
  "ONLINE_PUB",
  "ONLINE_TICKET",
  "PHYSICAL_TICKET_CONSUMER",
  "PHYSICAL_TICKET_PRODUCER",
]).optional();
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
]).optional();
export type TFranchiseAgreementKey = z.infer<
  typeof FranchiseAgreementKeySchema
>;

const FranchiseAgreementValueTypeSchema = z.enum(["PERCENTAGE", "CURRENCY"]).optional();
export type TFranchiseAgreementValueType = z.infer<
  typeof FranchiseAgreementValueTypeSchema
>;

export const FranchiseAgreementTamplateSchema = z.object({
  id: z.string().uuid().optional(),
  type: FranchiseAgreementTypeSchema,
  key: FranchiseAgreementKeySchema,
  name: z.string().optional(),
  value: z.string().optional().nullable().optional(),
  value_type: FranchiseAgreementValueTypeSchema,
  active: z.boolean().optional().nullable().optional(),
});

export const agreementResponseSchema = createResponseSchema(
  FranchiseAgreementTamplateSchema
);

export type AgreementType = z.infer<typeof FranchiseAgreementTamplateSchema>;
