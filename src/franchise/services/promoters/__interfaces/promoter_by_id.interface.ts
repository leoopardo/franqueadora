import { z } from "zod";
import ParamsI from "../../__interfaces/queryParams.interface";

const FranchiseSchema = z.object({
  franchise_name: z.string().optional(),
  id: z.string().optional(),
});

const MasterSchema = z.object({
  document: z.string().optional(),
  email: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  username: z.string().optional(),
});

const PromoterAddressSchema = z.object({
  active: z.boolean().optional(),
  address: z.string().optional(),
  cep: z.string().optional(),
  city: z.string().optional(),
  complement: z.string().optional(),
  created_at: z.string().optional().nullable(),
  district: z.string().optional(),
  id: z.string().optional(),
  number: z.string().optional(),
  promoter_id: z.string().optional(),
  state: z.string().optional(),
  updated_at: z.string().optional(),
});

const PromoterAgreementSchema = z.object({
  active: z.boolean().optional(),
  antecipation_fee: z.string().optional(),
  brand: z.string().optional() || z.array(z.string()).optional(),
  charge_type: z.string().optional(),
  credit_transaction_fee: z.string().optional(),
  debit_transaction_fee: z.string().optional(),
  emission_fee: z.string().optional().nullable(),
  id: z.string().optional(),
  pix_transaction_fee: z.string().optional().nullable(),
  type: z.string().optional(),
});

const PromoterJuridicSchema = z.any().nullable();

const PromoterLicensesSchema = z.object({
  active: z.boolean().optional(),
  id: z.string().optional(),
  type: z.string().optional(),
  value: z.string().optional(),
});

const PromoterPOSModuleSchema = z.object({
  POSModule: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
      description: z.string().optional(),
      active: z.boolean().optional(),
    })
    .optional(),
  id: z.string().optional(),
});

const PromoterPersonSchema = z.object({
  active: z.boolean().optional(),
  birthdate: z.string().optional(),
  comercial_name: z.string().optional(),
  cpf: z.string().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  promoter_id: z.string().optional(),
  rg: z.string().optional(),
  updated_at: z.string().optional().nullable(),
});

export const PromoterByIdSchema = z.object({
  Contacts: z.any(),
  Franchise: FranchiseSchema.optional().nullable(),
  Master: MasterSchema.optional().nullable(),
  PromoterAddress: PromoterAddressSchema.optional().nullable(),
  PromoterAgreement: z.array(PromoterAgreementSchema).optional().nullable(),
  PromoterJuridic: PromoterJuridicSchema.optional().nullable(),
  PromoterLicenses: z.array(PromoterLicensesSchema).optional().nullable(),
  PromoterPOSModule: z.array(PromoterPOSModuleSchema).optional().nullable(),
  PromoterPerson: PromoterPersonSchema.optional().nullable(),
  active: z.boolean().optional(),
  client_manager: z.boolean().optional(),
  created_at: z.string().optional(),
  franchise_id: z.string().optional(),
  id: z.string().optional(),
  master_id: z.string().optional(),
  promoter_name: z.string().optional(),
  ref_id: z.string().optional(),
  updated_at: z.string().optional(),
  use_products_database: z.boolean().optional(),
});

export type PromoterById = z.infer<typeof PromoterByIdSchema>;

export interface PromotersParams extends ParamsI {
  s?: string;
  f?: string[];
  w?: any;
}
