import { z } from "zod";
import ParamsI from "../../__interfaces/queryParams.interface";

const UserByIdSchema = z.object({
 
});

export type UserById = z.infer<typeof UserByIdSchema>;

export interface UserByIdsParams extends ParamsI {
  s?: string;
  f?: string[];
  w?: any;
}
