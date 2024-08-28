import { z } from "zod";

export const ModulesSchema = z.enum(["Ficha", "Ingressos", "Transação direta"]);

export const EventSchema = z.object({
  address: z.string().optional().nullable(),
  agreement: z.string().optional(),
  category: z.string().optional(),
  city: z.string().optional().nullable(),
  client_id: z.string().optional().nullable(),
  complement: z.string().optional().nullable(),
  currency_type: z.string().optional(),
  days: z.string().optional(),
  latitude: z.string().optional(),
  location: z.string().optional(),
  longitude: z.string().optional(),
  modules: z.array(z.string()).optional(),
  name: z.string().optional(),
  neighborhood: z.string().optional().nullable(),
  number: z.string().optional().nullable(),
  promoter_id: z.string().optional(),
  pub: z.object({
    accept_cashless: z.boolean().optional(),
    accept_command: z.boolean().optional(),
    add_waiter_commission: z.boolean().optional(),
    allow_redeem_balance: z.string().optional(),
    cashless_card_cost: z.string().optional(),
    client_tax: z.string().optional(),
    first_footer_line: z.string().optional(),
    menus: z.any().optional(),
    payment_type: z.string().optional(),
    production_password_init: z.number().optional(),
    promoter_tax: z.string().optional(),
    redeem_tax: z.string().optional(),
    second_footer_line: z.string().optional(),
    sectors: z.array(
      z.object({
        active: z.boolean().optional(),
        delivery_place: z.boolean().optional(),
        end: z.number().optional(),
        first_footer_line: z.string().optional(),
        id: z.string().optional(),
        name: z.string().optional(),
        payment_methods: z.array(z.any()).optional(),
        second_footer_line: z.string().optional(),
        start: z.number().optional(),
        sub_sectors: z.array(z.any()).optional(),
        terminal_user_ids: z.array(z.any()).optional(),
        terminals: z.array(z.any()).optional(),
        third_footer_line: z.string().optional(),
      })
    ),
    terminal_users: z.array(z.any()).optional(),
    terminals: z.array(z.any()).optional(),
    third_footer_line: z.string().optional(),
  }),
  recurrence_type: z.string().optional(),
  reveal_location_after: z.boolean().optional(),
  state: z.string().optional(),
  subject: z.string().optional(),
  terms: z.object({
    accepted: z.boolean().optional(),
    visibility: z.string().optional(),
  }),
  timezone_id: z.string().optional(),
  zipcode: z.string().optional().nullable(),
});

export type CreateEventType = z.infer<typeof EventSchema>;
