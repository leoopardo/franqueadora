import { z } from "zod";
import { createResponseSchema } from "../../__interfaces/response.interface";
import ParamsI from "../../__interfaces/queryParams.interface";

const pendingTerminalSchema = z.object({
  active: z.boolean().optional(),
  franchise_cnpj: z.string().optional(),
  franchise_name: z.string().optional(),
  id: z.string().optional(),
  inclusion_date: z.string().optional(),
  last_use: z.string().optional(),
  last_use_module: z.string().optional(),
  license_expiration_date: z.string().optional().nullable(),
  license_type: z.string().optional(),
  modules: z.array(z.string()).optional(),
  promoter_document: z.string().optional(),
  promoter_name: z.string().optional(),
  client_document: z.string().optional().nullable(),
  client_name: z.string().optional().nullable(),
  ref_id: z.string().optional(),
  serial_number: z.string().optional(),
  situation: z.string().optional(),
  status: z.string().optional(),
  terminal_model: z.string().optional(),
});

export const pendingTerminalResponseSchema = createResponseSchema(
  pendingTerminalSchema
);

export type PendingType = z.infer<typeof pendingTerminalSchema>;

export interface pendingTerminalParams extends ParamsI {
  s?: string;
  f?: string[];
  w?: string;
}
