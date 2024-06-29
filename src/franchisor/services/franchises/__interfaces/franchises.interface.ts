import { z } from "zod";
import { createResponseSchema } from "../../__interfaces/response.interface";
import ParamsI from "../../__interfaces/queryParams.interface";

const POSModuleSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
  })
  .optional();

const FranchiseAddressSchema = z
  .object({
    id: z.string(),
    franchise_id: z.string(),
    cep: z.string(),
    address: z.string(),
    number: z.string(),
    state: z.string(),
    city: z.string(),
    district: z.string(),
    complement: z.string(),
    active: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .optional();

const MasterSchema = z
  .object({
    id: z.string(),
    user_id: z.number(),
    name: z.string(),
    role: z.string(),
    type: z.string().nullable(),
    phone: z.string(),
    email: z.string(),
    username: z.string(),
    cognito_id: z.string(),
    active: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    document: z.string(),
    is_deleted: z.boolean(),
    is_admin: z.boolean(),
    id_role: z.string(),
    id_auth: z.string(),
    modified_role: z.boolean(),
    is_blocked: z.boolean(),
    client_id: z.string().nullable(),
    promoter_id: z.string().nullable(),
    is_report: z.boolean(),
    report_event_id: z.any(),
  })
  .optional();

export const FranchiseSchema = z.object({
  id: z.string().optional(),
  franchise_name: z.string().optional(),
  cnpj: z.string().optional(),
  active: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  tenant_id: z.string().optional(),
  ref_id: z.string().optional(),
  master_id: z.string().optional(),
  username: z.string().optional(),
  state_registration: z.string().optional(),
  commercial_name: z.string().optional(),
  company_name: z.string().optional(),
  master: MasterSchema,
  FranchisePOSModule: z
    .array(
      z.object({
        POSModule: POSModuleSchema,
      })
    )
    .optional(),
  FranchiseAddress: FranchiseAddressSchema,
});

export const franchiseResponseSchema = createResponseSchema(FranchiseSchema);

export type Franchise = z.infer<typeof FranchiseSchema>;

export interface FranchiseParams extends ParamsI {
  s?: string;
  f?: string[];
}
