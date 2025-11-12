import { z } from "zod"

export const createClientFormSchema = z.object({
	companyName: z.string().min(2, "Nome da empresa obrigatório"),
	cnpj: z.string().min(14, "CNPJ obrigatório"),
	address: z.string().min(5, "Endereço obrigatório"),
	primaryContact: z.string().min(2, "Contato principal obrigatório"),
	phone: z.string().min(8, "Telefone obrigatório"),
	email: z.email("E-mail inválido"),
	avatarUrl: z.url("URL do avatar inválida").optional(),
	agentUrl: z.url("URL do agente inválida").optional()
})

export type CreateClientFormData = z.infer<typeof createClientFormSchema>

// ...existing code...

export const editClientFormSchema = z.object({
	id: z.number(),
	companyName: z.string().min(2, "Nome da empresa obrigatório"),
	cnpj: z.string().min(14, "CNPJ obrigatório"),
	address: z.string().min(5, "Endereço obrigatório"),
	primaryContact: z.string().min(2, "Contato principal obrigatório"),
	phone: z.string().min(8, "Telefone obrigatório"),
	email: z.email("E-mail inválido"),
	avatarUrl: z.url("URL do avatar inválida").optional(),
	agentUrl: z.url("URL do agente inválida").optional()
})

export type EditClientFormData = z.infer<typeof editClientFormSchema>
