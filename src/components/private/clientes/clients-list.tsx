"use client"

import { Trash2Icon } from "lucide-react"
import { Button } from "../ui/button"
import { Table } from "../ui/table"
import { Container } from "../ui/container"
import { Avatar } from "../ui/avatar"
import { ModalTrigger } from "../ui/modal"
import { Client } from "@/types/clients/client"
import { ScrollList } from "../ui/scroll-lost"
import { useClients } from "@/hooks/clients/use-clients"
import { useSearchParams } from "next/navigation"

export function ClientsList() {
	const searchParams = useSearchParams()
	const search = searchParams.get("search") || undefined
	const page = Number(searchParams.get("page")) || 1

	const { data: clients, isLoading } = useClients(page, search)

	function openEdit(u: Client) {
		window.dispatchEvent(new CustomEvent("client:edit-open", { detail: u }))
	}
	function openDelete(u: Client) {
		window.dispatchEvent(new CustomEvent("client:delete-open", { detail: u }))
	}

	return (
		<Container variant="page">
			<ScrollList>
				<Table
					isLoading={isLoading}
					head={["Empresa", "E-mail", "Contato", "Telefone", "Ações"]}
					body={
						clients &&
						clients.data.map((client: Client) => (
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
										<Button outline={true} onClick={() => openEdit(client)}>
											Editar
										</Button>
									</ModalTrigger>
									<ModalTrigger id="delete_client_modal">
										<Button
											outline={false}
											color="transparent"
											className="hover:text-red-500"
											onClick={() => openDelete(client)}
										>
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
