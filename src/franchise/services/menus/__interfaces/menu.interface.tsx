import { z } from "zod";
import { createResponseSchema } from "../../__interfaces/response.interface";
import ParamsI from "../../__interfaces/queryParams.interface";

export const MenuSchema = z.object({
  active: z.boolean().optional(),
  client_document: z.string().optional().nullable(),
  client_name: z.string().optional().nullable(),
  event_name: z.string().optional(),
  id: z.string().optional(),
  itens_quantity: z.number().optional(),
  name: z.string().optional(),
  promoter_document: z.string().optional(),
  promoter_name: z.string().optional(),
});

export const MenuResponseSchema = createResponseSchema(MenuSchema);

export type MenuType = z.infer<typeof MenuSchema>;

export interface MenuParams extends ParamsI {
  s?: string;
  f?: string[];
}
