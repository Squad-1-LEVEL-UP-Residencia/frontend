import { z } from "zod"

export const createRoleSchema = z.object({
	name: z.string().min(2, "O nome do cargo é obrigatório")
})

export type CreateRoleFormData = z.infer<typeof createRoleSchema>
