import { z } from "zod"

export const createTaskSchema = z.object({
  title: z.string()
    .min(1, "Nome da tarefa é obrigatório")
    .min(3, "Mínimo 3 caracteres"),
  description: z.string()
    .min(1, "Descrição é obrigatória"),
  chatGptLink: z.string().url("Link inválido").optional().or(z.literal(""))
})

export type CreateTaskFormData = z.infer<typeof createTaskSchema>
