import { z } from "zod"

export const editUserSchema = z.object({
	id: z.uuid("ID inválido"),
	name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres").optional(),
	email: z.email("Email inválido").optional(),
	role_id: z.number().min(1, "Selecione um cargo")
})

export type EditUserFormData = z.infer<typeof editUserSchema>
