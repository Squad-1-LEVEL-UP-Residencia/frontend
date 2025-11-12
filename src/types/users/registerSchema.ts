import { z } from "zod"

export const createUserSchema = z.object({
	name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
	email: z.email("Email inválido"),
	role_id: z.number("Id do cargo deve ser um numero").min(1, "Selecione um cargo")
})

export type CreateUserFormData = z.infer<typeof createUserSchema>
