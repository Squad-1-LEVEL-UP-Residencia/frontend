import { Client } from "@/types/clients/client"

export async function getClients(search?: string): Promise<Client[]> {
	const clients = new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: "1",
					companyName: "Flap Agência",
					cnpj: "12.345.678/0001-90",
					address: "Av. Paulista, 1000, São Paulo - SP",
					primaryContact: "Danillo",
					phone: "+55 (11) 91234-5678",
					email: "danillo@cliente.com",
					createdAt: "2024-01-10T10:00:00.000Z"
				},
				{
					id: "2",
					companyName: "Design Studio",
					cnpj: "987.654.321-00",
					address: "Rua das Flores, 200, Rio de Janeiro - RJ",
					primaryContact: "Maria",
					phone: "+55 (21) 99876-5432",
					email: "maria@cliente.com",
					createdAt: "2024-03-05T14:30:00.000Z"
				},
				{
					id: "3",
					companyName: "Analytica Ltda",
					cnpj: "23.456.789/0001-12",
					address: "Praça Central, 50, Belo Horizonte - MG",
					primaryContact: "João",
					phone: "+55 (31) 99123-4567",
					email: "joao@cliente.com",
					createdAt: "2024-04-20T09:15:00.000Z"
				}
			])
		}, 100) // simula delay de 100ms
	})

	if (clients && search) {
		const filteredClients = ((await clients) as Client[]).filter(
			(client) =>
				client.companyName.toLowerCase().includes(search.toLowerCase()) ||
				client.email.toLowerCase().includes(search.toLowerCase()) ||
				client.primaryContact.toLowerCase().includes(search.toLowerCase()) ||
				client.phone.toLowerCase().includes(search.toLowerCase())
		)
		return filteredClients
	}

	return clients as unknown as Client[]
}
