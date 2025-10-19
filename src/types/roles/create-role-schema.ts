import { z } from "zod"

export const createRoleSchema = z.object({
	name: z.string().min(2, "O nome do cargo é obrigatório"),
	permissions: z.array(z.string()).min(1, "Selecione ao menos uma permissão")
})

export type CreateRoleFormData = z.infer<typeof createRoleSchema>
