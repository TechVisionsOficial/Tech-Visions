import * as z from "zod";

export const ContractSchema = z.object({
  client_id: z.uuid({ error: "Selecione um cliente." }),
  title: z.string().trim().min(2, { error: "Título muito curto." }),
  value: z.coerce.number({ error: "Valor inválido." }).positive({ error: "Valor deve ser maior que zero." }),
  start_date: z.string().trim().optional().or(z.literal("")),
  end_date: z.string().trim().optional().or(z.literal("")),
  status: z.enum(["draft", "active", "cancelled"]),
  notes: z.string().trim().optional().or(z.literal("")),
});

export type ContractFormState =
  | { errors?: Partial<Record<keyof z.infer<typeof ContractSchema>, string[]>>; message?: string }
  | undefined;
