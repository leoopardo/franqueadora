import ParamsI from "../../__interfaces/queryParams.interface";
import { createResponseSchema } from "../../__interfaces/response.interface";
import { z } from "zod";

export const contributionsInSchema = z.object({
  contribution_id: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
  operator_name: z.string().optional().nullable(),
  sector_name: z.string().optional().nullable(),
  terminal_serial: z.string().optional().nullable(),
  value: z.number().optional().nullable(),
});

export const contributionsInResponseSchema = createResponseSchema(contributionsInSchema);

export type contributionsInType = z.infer<typeof contributionsInSchema>;

export interface contributionsInParams extends ParamsI {
  s?: string;
  f?: string;
  event_id?:string;
}
