import { z } from "zod";
import { createResponseSchema } from "../../__interfaces/response.interface";
import ParamsI from "../../__interfaces/queryParams.interface";

export const ModulesSchema = z.enum(["Ficha", "Ingressos", "Transação direta"]);

export const EventSchema = z.object({
  Modules: z.array(ModulesSchema).optional(),
  active: z.boolean().optional(),
  client_document: z.string().optional().nullable(),
  client_name: z.string().optional().nullable(),
  days_id: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  promoter_document: z.string().optional(),
  promoter_name: z.string().optional(),
  ref_id: z.string().optional(),
  start_time: z.string().optional(),
  synced: z.boolean().optional(),
  type: z.string().optional(),
});

export const EventResponseSchema = createResponseSchema(EventSchema);

export type EventType = z.infer<typeof EventSchema>;

export interface EventParams extends ParamsI {
  s?: string;
  f?: string[];
}
