import * as z from "zod";

export const ProjectSchema = z.object({
  client_id: z.uuid({ error: "Selecione um cliente." }),
  name: z.string().trim().min(2, { error: "Nome muito curto." }),
  stage: z.enum(["planning", "in_progress", "review", "done", "on_hold"]),
  start_date: z.string().trim().optional().or(z.literal("")),
  due_date: z.string().trim().optional().or(z.literal("")),
});

export type ProjectFormState =
  | { errors?: Partial<Record<keyof z.infer<typeof ProjectSchema>, string[]>>; message?: string }
  | undefined;
