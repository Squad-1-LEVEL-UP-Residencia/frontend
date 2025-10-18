"use client"

import { Trash2Icon } from "lucide-react"
import { Button } from "../ui/button"
import { Table } from "../ui/table"
import { Container } from "../ui/container"
import { useQuery } from "@tanstack/react-query"
import { Avatar } from "../ui/avatar"
import { ModalTrigger } from "../ui/modal"
import { Client } from "@/types/clients/client"
import { ScrollList } from "../ui/scroll-lost"

export function ClientsList() {
	// const users = use(getUsers()) ?? []

	async function getClients(): Promise<Client[]> {
		return new Promise((resolve) => {
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
					}
					// {
					// 	id: "2",
					// 	companyName: "Design Studio",
					// 	cnpj: "987.654.321-00",
					// 	address: "Rua das Flores, 200, Rio de Janeiro - RJ",
					// 	primaryContact: "Maria",
					// 	phone: "+55 (21) 99876-5432",
					// 	email: "maria@cliente.com",
					// 	createdAt: "2024-03-05T14:30:00.000Z"
					// },
					// {
					// 	id: "3",
					// 	companyName: "Analytica Ltda",
					// 	cnpj: "23.456.789/0001-12",
					// 	address: "Praça Central, 50, Belo Horizonte - MG",
					// 	primaryContact: "João",
					// 	phone: "+55 (31) 99123-4567",
					// 	email: "joao@cliente.com",
					// 	createdAt: "2024-04-20T09:15:00.000Z"
					// }
				])
			}, 100) // simula delay de 100ms
		})
	}

	const { data: clients, isLoading } = useQuery<Client[]>({
		queryKey: ["clients"],
		queryFn: getClients,
		staleTime: 5000 // 5 minutos
	})

	return (
		<Container variant="page">
			<ScrollList>
				<Table
					isLoading={isLoading}
					head={["Empresa", "E-mail", "Contato", "Telefone", "Ações"]}
					body={
						clients &&
						clients.map((client: Client) => (
							<Table.Row key={client.id} variant="row">
								<Table.Data className="flex justify-start items-center gap-2">
									<Avatar name={client.companyName} />
									{client.companyName}
								</Table.Data>
								<Table.Data>{client.email}</Table.Data>
								<Table.Data>{client.primaryContact}</Table.Data>
								<Table.Data>{client.phone}</Table.Data>
								<Table.Data className="flex justify-start items-center space-x-2">
									<ModalTrigger id="edit_client_modal">
										<Button outline={true}>Editar</Button>
									</ModalTrigger>
									<ModalTrigger id="delete_client_modal">
										<Button outline={false} color="transparent" className="hover:text-red-500">
											<Trash2Icon width={16} height={16} />
										</Button>
									</ModalTrigger>
								</Table.Data>
							</Table.Row>
						))
					}
				/>
			</ScrollList>
		</Container>
	)
}
