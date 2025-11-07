import { z } from "zod"

export const editRoleSchema = z.object({
	name: z.string().min(2, "O nome do cargo é obrigatório"),
	description: z.string().min(5, "A descrição do cargo é obrigatória"),
	permissions: z.array(z.number(), "Selecione ao menos uma permissão")
})

export type EditRoleFormData = z.infer<typeof editRoleSchema>
