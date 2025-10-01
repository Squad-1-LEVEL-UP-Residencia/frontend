"use client"

import { Trash2Icon } from "lucide-react"
import { Button } from "../ui/button"
import { Table } from "../ui/table"
import { Container } from "../ui/container"
import { getUsers } from "@/data/users/getUsers"
import { useQuery } from "@tanstack/react-query"
import { Avatar } from "../ui/avatar"
// import { User } from "@/types/user"

export function UsersList() {
	// const users = use(getUsers()) ?? []

	const { data: users, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: getUsers,
		// staleTime: 1000 * 60 * 5 // 5 minutes
		staleTime: 5000 // 5 minutes
	})

	return (
		<Container variant="page">
			<Table
				isLoading={isLoading}
				head={["Usuário", "Cargo", "Setor", "Ações"]}
				body={
					//precisa ser um array de componentes pois posso passar buttons e badges
					users &&
					users.map((element: any) => (
						<Table.Row key={element.id} variant="row">
							<Table.Data
								key={element.firstName}
								className="flex justify-start items-center gap-2"
							>
								<Avatar name={element.firstName} />
								{element.firstName}
							</Table.Data>
							<Table.Data key={element.company.title}>
								{element.company.title}
							</Table.Data>
							<Table.Data key={element.company.department}>
								{element.company.department}
							</Table.Data>
							<Table.Data
								key={element.id}
								className="flex justify-start items-center space-x-2"
							>
								<Button variant="primary">Editar</Button>
								<Button variant="secondary">
									<Trash2Icon width={16} height={16} />
								</Button>
							</Table.Data>
						</Table.Row>
					))
				}
			/>
		</Container>
	)
}
