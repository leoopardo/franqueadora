import { z } from "zod";

const acquirerSchema = z.object({
  acquirer: z.string(),
  active: z.boolean(),
  id: z.string(),
  is_deleted: z.boolean().optional(),
});

const modelSchema = z.object({
  model: z.string(),
  active: z.boolean(),
  id: z.string(),
  is_deleted: z.boolean().optional(),
});

const moduleSchema = z.object({
  name: z.string(),
  active: z.boolean(),
  id: z.string(),
  is_deleted: z.boolean().optional(),
});

const situationSchema = z.enum([
  "CLIENT",
  "DELETED",
  "DEVELOPMENT",
  "FRANCHISE",
  "LENDING",
  "MAINTENANCE",
  "SALE",
  "STOCK",
]);

const timeZoneSchema = z.object({
  id: z.string(),
  label: z.string(),
  utc: z.string(),
});

export const TerminalsSelectSchema = z.object({
  acquirers: z.array(acquirerSchema),
  models: z.array(modelSchema),
  modules: z.array(moduleSchema),
  situation: z.array(situationSchema),
  time_zones: z.array(timeZoneSchema),
});

export type TerminalsSelectType = z.infer<typeof TerminalsSelectSchema>;

