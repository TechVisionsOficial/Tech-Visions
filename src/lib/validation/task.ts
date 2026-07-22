import * as z from "zod";

export const TaskSchema = z.object({
  project_id: z.uuid({ error: "Selecione um projeto." }),
  title: z.string().trim().min(2, { error: "Título muito curto." }),
  due_date: z.string().trim().optional().or(z.literal("")),
  status: z.enum(["todo", "in_progress", "done"]),
});

export type TaskFormState =
  | { errors?: Partial<Record<keyof z.infer<typeof TaskSchema>, string[]>>; message?: string }
  | undefined;
