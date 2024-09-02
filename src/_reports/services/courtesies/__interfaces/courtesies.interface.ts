import ParamsI from "../../__interfaces/queryParams.interface";
import { createResponseSchema } from "../../__interfaces/response.interface";
import { z } from "zod";

export const courtesieSchema = z.object({
  courtesy_id: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
  operator_name: z.string().optional().nullable(),
  quantity: z.number().optional().nullable(),
  value: z.number().optional().nullable(),
});

export const courtesieResponseSchema = createResponseSchema(courtesieSchema);

export type courtesieType = z.infer<typeof courtesieSchema>;

export interface courtesieParams extends ParamsI {
  s?: string;
  f?: string;
  event_id?: string;
}
