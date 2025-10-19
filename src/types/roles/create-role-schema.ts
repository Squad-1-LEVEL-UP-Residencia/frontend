import { z } from "zod"

export const createRoleSchema = z.object({
	name: z.string().min(2, "O nome do cargo é obrigatório"),
	description: z.string().min(5, "A descrição do cargo é obrigatória"),
	permissions: z.array(z.string(), "Selecione ao menos uma permissão")
})

export type CreateRoleFormData = z.infer<typeof createRoleSchema>
