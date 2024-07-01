import { z } from "zod";
import ParamsI from "../../__interfaces/queryParams.interface";
import { createResponseSchema } from "../../__interfaces/response.interface";

const PromoterSchema = z.object({
  active: z.boolean().optional(),
  city: z.string().optional(),
  client_manage: z.boolean().optional(),
  franchise_cnpj: z.string().optional(),
  franchise_id: z.string().optional(),
  franchise_name: z.string().optional(),
  id: z.string().optional(),
  is_physical_person: z.boolean().optional(),
  missing_agreements: z.boolean().optional(),
  modules: z.array(z.any()).optional(),
  promoter_document: z.string().optional(),
  promoter_name: z.string().optional(),
  ref_id: z.string().optional(),
  state: z.string().optional(),
  use_products_database: z.boolean().optional(),
  username: z.string().optional(),
});

export const peomoterResponseSchema = createResponseSchema(PromoterSchema);

export type Promoter = z.infer<typeof PromoterSchema>;

export interface PromotersParams extends ParamsI {
  s?: string;
  f?: string[];
}
