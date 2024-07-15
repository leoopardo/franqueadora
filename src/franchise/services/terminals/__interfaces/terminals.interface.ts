import { z } from "zod";
import { createResponseSchema } from "../../__interfaces/response.interface";
import ParamsI from "@franchisor/services/__interfaces/queryParams.interface";

const terminalSchema = z.object({
  acquirers: z.any().optional(),
  active: z.boolean().optional(),
  client_document: z.string().nullable().optional(),
  client_name: z.string().nullable().optional(),
  client_id: z.string().optional().nullable(),
  created_at: z.string().optional(),
  event_id: z.string().optional().nullable(),
  event_name: z.string().optional().nullable(),
  franchise_cnpj: z.string().optional(),
  franchise_id: z.string().optional(),
  franchise_name: z.string().optional(),
  id: z.string().optional(),
  last_use: z.string().optional(),
  last_use_module: z.string().optional(),
  latitude: z.string().optional(),
  license_expiration_date: z.string().optional().nullable(),
  license_type: z.string().optional().nullable(),
  longitude: z.string().optional(),
  promoter_document: z.string().optional(),
  promoter_id: z.string().optional(),
  promoter_name: z.string().optional(),
  ref_id: z.string().optional(),
  serial_number: z.string().optional(),
  situation: z.string().optional(),
  terminal_model: z.string().optional(),
});

export const terminalResponseSchema = createResponseSchema(terminalSchema);

export type Terminal = z.infer<typeof terminalSchema>;

export interface terminalParams extends ParamsI {
  s?: string;
  f?: string[];
  w?: string
}
