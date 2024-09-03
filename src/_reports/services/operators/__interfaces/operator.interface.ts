import ParamsI from "../../__interfaces/queryParams.interface";
import { createResponseSchema } from "../../__interfaces/response.interface";
import { z } from "zod";

export const operatorSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  operator_sale: z.string().optional().nullable(),
});

export const operatorResponseSchema = createResponseSchema(operatorSchema);

export type operatorType = z.infer<typeof operatorSchema>;

export interface operatorParams extends ParamsI {
  s?: string;
  f?: string;
  event_id?: string;
}
