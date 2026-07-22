import * as z from "zod";

export const DocumentSchema = z.object({
  client_id: z.uuid({ error: "Selecione um cliente." }),
  file: z
    .instanceof(File, { error: "Selecione um arquivo." })
    .refine((f) => f.size > 0, { error: "Arquivo vazio." })
    .refine((f) => f.size <= 10 * 1024 * 1024, {
      error: "Arquivo muito grande (máx. 10MB).",
    }),
});

export type DocumentFormState =
  | { errors?: Partial<Record<"client_id" | "file", string[]>>; message?: string }
  | undefined;
