import ParamsI from "@franchise/services/__interfaces/queryParams.interface";
import { createResponseSchema } from "@franchisor/services/__interfaces/response.interface";
import { z } from "zod";

export const ModulesSchema = z.enum(["Ficha", "Ingressos", "Transação direta"]);

export const ProductSchema = z.object({
  active: z.boolean().optional().nullable(),
  brand: z.string().optional().nullable(),
  created_by: z.string().optional().nullable(),
  creator_type: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  id: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  is_additional: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  ref_id: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  consumption_unit_id: z.string().optional().nullable(),
  consumption_unit_name: z.string().optional().nullable(),
  code: z.number().optional().nullable(),
});

export const ProductResponseSchema = createResponseSchema(ProductSchema);

export type ProductType = z.infer<typeof ProductSchema>;

export interface ProductParams extends ParamsI {
  s?: string;
  f?: string[];
}
