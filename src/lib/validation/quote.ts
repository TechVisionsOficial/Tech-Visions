import * as z from "zod";

export const QuoteSchema = z.object({
  client_id: z.uuid({ error: "Selecione um cliente." }),
  title: z.string().trim().min(2, { error: "Título muito curto." }),
  value: z.coerce.number({ error: "Valor inválido." }).positive({ error: "Valor deve ser maior que zero." }),
  status: z.enum(["draft", "sent", "approved", "rejected"]),
  valid_until: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
});

export type QuoteFormState =
  | { errors?: Partial<Record<keyof z.infer<typeof QuoteSchema>, string[]>>; message?: string }
  | undefined;
