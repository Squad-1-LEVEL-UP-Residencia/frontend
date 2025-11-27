import { z } from "zod"

export const createTaskSchema = z.object({
	title: z.string().min(1, "Nome da tarefa é obrigatório").min(3, "Mínimo 3 caracteres"),
	description: z.string().min(1, "Descrição é obrigatória"),
	client_id: z.number("Cliente é obrigatório"),
	list_id: z.number("Lista tem que ser um número").min(1, "Lista é obrigatória"),
	status: z.enum(["todo", "doing", "done"]).optional(),
	priority: z.union([z.literal(0), z.literal(1), z.literal(2)]).optional(),
	start_date: z.date().optional(),
	end_date: z.date().optional()
})

export type CreateTaskFormData = z.infer<typeof createTaskSchema>
