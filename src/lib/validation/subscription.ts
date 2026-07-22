import * as z from "zod";

export const SubscriptionSchema = z.object({
  client_id: z.uuid({ error: "Selecione um cliente." }),
  amount: z.coerce.number({ error: "Valor inválido." }).positive({ error: "Valor deve ser maior que zero." }),
  due_day: z.coerce
    .number({ error: "Dia inválido." })
    .int()
    .min(1, { error: "Dia deve ser entre 1 e 28." })
    .max(28, { error: "Dia deve ser entre 1 e 28." }),
  status: z.enum(["active", "paused", "cancelled"]),
});

// client_id is immutable after creation — only these fields are editable.
export const SubscriptionUpdateSchema = SubscriptionSchema.omit({ client_id: true });

export type SubscriptionFormState =
  | { errors?: Partial<Record<keyof z.infer<typeof SubscriptionSchema>, string[]>>; message?: string }
  | undefined;
