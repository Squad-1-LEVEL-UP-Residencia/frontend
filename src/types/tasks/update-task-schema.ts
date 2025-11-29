import { z } from "zod"

export const updateTaskSchema = z.object({
	id: z.number(),
	title: z
		.string()
		.min(1, "Nome da tarefa é obrigatório")
		.min(3, "Mínimo 3 caracteres")
		.max(100, "Máximo 100 caracteres")
		.optional(),
	description: z.string("A descrição deve ser uma string").max(500, "Máximo 500 caracteres").optional(),
	client_id: z.number("Cliente é obrigatório"),
	list_id: z.number("Lista tem que ser um número").min(1, "Lista é obrigatória"),
	status: z.enum(["todo", "doing", "done"]).optional(),
	priority: z.union([z.literal(0), z.literal(1), z.literal(2)]).optional(),
	start_date: z.string().optional(),
	end_date: z.string().optional()
})

export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>
