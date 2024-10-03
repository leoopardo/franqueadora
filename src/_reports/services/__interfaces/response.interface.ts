import { z } from "zod";

const sortableColumnsSchema = z.object({ key: z.string(), value: z.string() });
// Função para criar um esquema de resposta genérico
export const createResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) => {
  return z.object({
    items: z.array(itemSchema),
    totalItems: z.number().optional(),
    page: z.number(),
    size: z.number(),
    sortableColumns: z.array(sortableColumnsSchema).optional(),
  });
};

export default interface ResponseI<itemI> {
  items: itemI[];
  totalItems?: number;
  page?: number;
  size?: number;
  sortableColumns?: { key: string; value: string }[] | null;
  totalValue?: number;
}
