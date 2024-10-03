import ParamsI from "../../__interfaces/queryParams.interface";
import { createResponseSchema } from "../../__interfaces/response.interface";
import { z } from "zod";

export const waiterSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  waiter_fee: z.string().optional().nullable(),
  waiter_sale: z.string().optional().nullable(),
});

export const waiterResponseSchema =
  createResponseSchema(waiterSchema);

export type waiterType = z.infer<typeof waiterSchema>;

export interface waiterParams extends ParamsI {
  s?: string;
  f?: string;
  event_id?: string;
}
