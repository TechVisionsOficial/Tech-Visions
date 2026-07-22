import * as z from "zod";

export const LeadStageSchema = z.object({
  stage: z.enum(["new", "contacted", "qualified", "won", "lost"]),
});

export const LeadSchema = z.object({
  name: z.string().trim().min(2, { error: "Nome muito curto." }),
  email: z.email({ error: "E-mail inválido." }).trim().optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().optional().or(z.literal("")),
  source: z.enum(["site", "manual", "referral", "ads"]),
});

export type LeadFormState =
  | { errors?: Partial<Record<keyof z.infer<typeof LeadSchema>, string[]>>; message?: string }
  | undefined;
