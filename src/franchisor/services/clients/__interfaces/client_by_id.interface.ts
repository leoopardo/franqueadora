import { z } from "zod";
import ParamsI from "../../__interfaces/queryParams.interface";

const FranchiseSchema = z.object({
  franchise_name: z.string().optional().nullable(),
  id: z.string().optional().nullable(),
});
const MasterSchema = z.object({
  document: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
});
const ClientAddress = z.object({
  active: z.boolean().optional().nullable(),
  address: z.string().optional().nullable(),
  cep: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  complement: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  id: z.string().optional().nullable(),
  number: z.string().optional().nullable(),
  client_id: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
});
const ClientAgreement = z.object({
  active: z.boolean().optional().nullable(),
  antecipation_fee: z.string().optional().nullable(),
  brand: z.any(),
  charge_type: z.string().optional().nullable(),
  credit_transaction_fee: z.string().optional().nullable(),
  debit_transaction_fee: z.string().optional().nullable(),
  emission_fee: z.string().optional().nullable(),
  id: z.string().optional().nullable(),
  pix_transaction_fee: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
});
const ClientJuridic = z.any();
const ClientLicenses = z.object({
  active: z.boolean().optional().nullable(),
  id: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  value: z.string().optional().nullable(),
});
const ClientPOSModule = z.object({
  POSModule: z.object({
    active: z.boolean().optional().nullable(),
    description: z.string().optional().nullable(),
    id: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
  }),
  id: z.string().nullable().optional(),
});
const ClientPerson = z.object({
  active: z.boolean().optional().nullable(),
  birthdate: z.string().optional().nullable(),
  commercial_name: z.string().optional().nullable(),
  cpf: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  id: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  client_id: z.string().optional().nullable(),
  rg: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
});

const ClientByIdSchema = z.object({
  Contacts: z.any(),
  Franchise: FranchiseSchema.optional().nullable(),
  Master: MasterSchema.optional().nullable(),
  ClientAddress: ClientAddress.optional().nullable(),
  ClientAgreement: z.array(ClientAgreement).optional().nullable(),
  ClientJuridic: ClientJuridic.optional().nullable(),
  ClientLicenses: z.array(ClientLicenses).optional().nullable(),
  ClientPOSModule: z.array(ClientPOSModule).optional().nullable(),
  ClientPerson: ClientPerson.optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.string().optional().nullable(),
  franchise_id: z.string().optional().nullable(),
  id: z.string().optional().nullable(),
  master_id: z.string().optional().nullable(),
  client_name: z.string().optional().nullable(),
  ref_id: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  use_products_database: z.boolean().optional().nullable(),
  promoter_id: z.string().optional().nullable(),
});

export type ClientById = z.infer<typeof ClientByIdSchema>;

export interface ClientByIdsParams extends ParamsI {
  s?: string;
  f?: string[];
  w?: any;
}
