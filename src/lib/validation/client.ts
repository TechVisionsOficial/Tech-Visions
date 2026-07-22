import * as z from "zod";

export const ClientSchema = z.object({
  company_name: z.string().trim().min(2, { error: "Nome muito curto." }),
  contact_name: z.string().trim().optional().or(z.literal("")),
  email: z
    .email({ error: "E-mail inválido." })
    .trim()
    .optional()
    .or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  segment: z.string().trim().optional().or(z.literal("")),
  status: z.enum(["active", "inactive", "prospect"]),
});

export type ClientFormState =
  | { errors?: Partial<Record<keyof z.infer<typeof ClientSchema>, string[]>>; message?: string }
  | undefined;
