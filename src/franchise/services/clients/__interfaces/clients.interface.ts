import { z } from "zod";
import { createResponseSchema } from "../../__interfaces/response.interface";
import ParamsI from "../../__interfaces/queryParams.interface";

export const ClientSchema = z.object({
  active: z.boolean().optional(),
  city: z.string().optional(),
  document: z.string().optional(),
  franchise_cnpj: z.string().optional(),
  franchise_id: z.string().optional(),
  franchise_name: z.string().optional(),
  id: z.string().optional(),
  is_physical_person: z.boolean().optional(),
  missing_agreements: z.boolean().optional(),
  modules: z.array(z.string()).optional(),
  name: z.string().optional(),
  promoter_document: z.string().optional(),
  promoter_id: z.string().optional(),
  promoter_name: z.string().optional(),
  ref_id: z.string().optional(),
  state: z.string().optional(),
  use_products_database: z.boolean().optional(),
  username: z.string().optional(),
});

export const clientResponseSchema = createResponseSchema(ClientSchema);

export type ClientType = z.infer<typeof ClientSchema>;

export interface ClientParams extends ParamsI {
  s?: string;
  f?: string[];
}
