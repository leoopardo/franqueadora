import ParamsI from "../../__interfaces/queryParams.interface";
import { createResponseSchema } from "../../__interfaces/response.interface";
import { z } from "zod";

export const EventSchema = z.object({
  client_id: z.string().optional().nullable(),
  client_name: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
  event_id: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  promoter_id: z.string().optional().nullable(),
  promoter_name: z.string().optional().nullable(),
  ref_id: z.string().optional().nullable(),
});

export const eventResponseSchema = createResponseSchema(EventSchema);

export type Event = z.infer<typeof EventSchema>;

export interface EventParams extends ParamsI {
  s?: string;
  f?: string;
}
