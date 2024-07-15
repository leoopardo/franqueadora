import ParamsI from "@franchise/services/__interfaces/queryParams.interface";
import { z } from "zod";

const contentSchema = z.object({
  client: z.number(),
  deleted: z.number(),
  development: z.number(),
  franchise: z.number(),
  free: z.number(),
  lending: z.number(),
  loose: z.number(),
  maintenance: z.number(),
  monthly: z.number(),
  sale: z.number(),
  stock: z.number(),
  total: z.number(),
});

export const terminalTotalSchema = z.object({
  code: z.string(),
  content: contentSchema,
});

export type Total = z.infer<typeof terminalTotalSchema>;
export type TotalizerContent = z.infer<typeof contentSchema>;

export interface terminalTotalParams extends ParamsI {
    s?: string;
    f?: string[];
  }