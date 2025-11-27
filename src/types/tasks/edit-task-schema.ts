import { z } from "zod"

export const editTaskSchema = z.object({
	title: z.string().min(1, "Nome da tarefa é obrigatório").min(3, "Mínimo 3 caracteres"),
	description: z.string().min(1, "Descrição é obrigatória"),
	status: z.enum(["todo", "doing", "done"]),
	priority: z.union([z.literal(0), z.literal(1), z.literal(2)]),
	position: z.number(),
	campaign: z.string().optional(),
	start_date: z.string().optional(),
	end_date: z.string().optional(),
	tags: z.array(z.string()).optional(),
	members: z.array(z.number()).optional(),
	checklist: z
		.array(
			z.object({
				id: z.number(),
				content: z.string(),
				completed: z.boolean()
			})
		)
		.optional()
})

export type EditTaskFormData = z.infer<typeof editTaskSchema>
