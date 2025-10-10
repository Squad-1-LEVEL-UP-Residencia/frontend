"use client"

import { Trash2Icon } from "lucide-react"
import { Button } from "../ui/button"
import { Table } from "../ui/table"
import { Container } from "../ui/container"
import { useQuery } from "@tanstack/react-query"
import { Avatar } from "../ui/avatar"
import { ModalTrigger } from "../ui/modal"
import { User } from "@/data/users/user"
import { getUsers } from "@/actions/users/get-users"

export function UsersList() {
	// const users = use(getUsers()) ?? []

	const { data: users, isLoading } = useQuery<User[]>({
		queryKey: ["users"],
		queryFn: getUsers,
		staleTime: 5000 // 5 minutos
	})

	return (
		<Container variant="page">
			<Table
				isLoading={isLoading}
				head={["Usuário", "E-mail", "Cargo", "Ações"]}
				body={
					users &&
					users.map((element: User) => (
						<Table.Row key={element.id} variant="row">
							<Table.Data className="flex justify-start items-center gap-2">
								<Avatar name={element.name} />
								{element.name}
							</Table.Data>
							<Table.Data>{element.email}</Table.Data>
							<Table.Data>{Array.isArray(element.role) ? element.role.join(", ") : "-"}</Table.Data>
							<Table.Data className="flex justify-start items-center space-x-2">
								<ModalTrigger id="edit_user_modal">
									<Button outline={true}>Editar</Button>
								</ModalTrigger>
								<ModalTrigger id="delete_user_modal">
									<Button outline={false} color="transparent" className="hover:text-red-500">
										<Trash2Icon width={16} height={16} />
									</Button>
								</ModalTrigger>
							</Table.Data>
						</Table.Row>
					))
				}
			/>
		</Container>
	)
}
