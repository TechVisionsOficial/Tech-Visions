import * as z from "zod";

export const ANALYST_VALUES = ["felipe", "richard"] as const;
export const ANALYST_LABELS: Record<(typeof ANALYST_VALUES)[number], string> = {
  felipe: "Felipe Falcão",
  richard: "Richard Pereira",
};

export const MeetingSchema = z.object({
  client_id: z.uuid().optional().or(z.literal("")),
  title: z.string().trim().min(2, { error: "Título muito curto." }),
  starts_at: z.string().trim().min(1, { error: "Selecione data e hora de início." }),
  ends_at: z.string().trim().optional().or(z.literal("")),
  location: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
  analyst: z.enum(ANALYST_VALUES, { error: "Selecione o analista." }),
});

export type MeetingFormState =
  | { errors?: Partial<Record<keyof z.infer<typeof MeetingSchema>, string[]>>; message?: string }
  | undefined;
