import { z } from "zod";
import { createResponseSchema } from "../../__interfaces/response.interface";
import ParamsI from "../../__interfaces/queryParams.interface";

const UserPermissionSchema = z.object({
  Feature: z
    .object({
      name: z.string(),
    })
    .optional()
    .nullable(),
  active: z.boolean().optional().nullable(),
  create: z.boolean().optional().nullable(),
  delete: z.boolean().optional().nullable(),
  view: z.boolean().optional().nullable(),
  created_at: z.string().optional().nullable(),
  id: z.string().optional().nullable(),
  id_feature: z.string().optional().nullable(),
  id_user: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
});

export const UserSchema = z.object({
  UserPermission: z.array(UserPermissionSchema).optional().nullable(),
  active: z.boolean(),
  avatar: z.string().optional().nullable(),
  birthdate: z.string().optional().nullable(),
  cognito_id: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  document: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  id: z.string().optional().nullable(),
  id_auth: z.string().optional().nullable(),
  id_role: z.string().optional().nullable(),
  is_blocked: z.boolean().optional().nullable(),
  is_deleted: z.boolean().optional().nullable(),
  modified_role: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.number().optional().nullable(),
  username: z.string().optional().nullable(),
});

export const userResponseSchema = createResponseSchema(UserSchema);

export type UserType = z.infer<typeof UserSchema>;

export interface UserParams extends ParamsI {
  s?: string;
  f?: string[];
}
