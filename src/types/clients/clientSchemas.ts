import { z } from "zod"

export const createClientFormSchema = z.object({
	companyName: z.string().min(2, "Nome da empresa obrigatório"),
	cnpj: z.string().min(14, "CNPJ obrigatório"),
	address: z.string().min(5, "Endereço obrigatório"),
	primaryContact: z.string().min(2, "Contato principal obrigatório"),
	phone: z.string().min(8, "Telefone obrigatório"),
	email: z.string().email("E-mail inválido"),
	avatarUrl: z.string().url("URL do avatar inválida").optional(),
	agentUrl: z.string().url("URL do agente inválida").optional()
})

export type CreateClientFormData = z.infer<typeof createClientFormSchema>
