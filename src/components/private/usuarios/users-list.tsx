"use client"

import { Trash2Icon } from "lucide-react"
import { Button } from "../ui/button"
import { Table } from "../ui/table"
import { Container } from "../ui/container"
import { Avatar } from "../ui/avatar"
import { ModalTrigger } from "../ui/modal"
import { User } from "@/types/users/user"
import { useUsers } from "@/hooks/users/use-users"
import { ScrollList } from "../ui/scroll-lost"
import { useSearchParams } from "next/navigation"
import { Pagination } from "../ui/pagination"

export function UsersList() {
	const searchParams = useSearchParams()

	const { data: response, isLoading } = useUsers(
		searchParams.get("page") ? Number(searchParams.get("page")) : 1,
		searchParams.get("search") || ""
	)

	const users = response ? response.data : []

	function openView(u: User) {
		window.dispatchEvent(new CustomEvent("user:view-open", { detail: u }))
	}
	function openEdit(u: User) {
		window.dispatchEvent(new CustomEvent("user:edit-open", { detail: u }))
	}
	function openDelete(u: User) {
		window.dispatchEvent(new CustomEvent("user:delete-open", { detail: u }))
	}

	return (
		<Container variant="page" className="flex flex-col gap-4 justify-between">
			<ScrollList>
				<Table
					isLoading={isLoading}
					head={["Usuário", "E-mail", "Cargo", "Ações"]}
					body={
						users &&
						users.map((u: User) => (
							<Table.Row
								key={u.id}
								variant="row"
								onClick={() => openView(u)}
								className="cursor-pointer hover:bg-gray-100/50 transition-colors duration-150"
							>
								<Table.Data className="flex justify-start items-center gap-2">
									<Avatar name={u.name} />
									{u.name}
								</Table.Data>

								<Table.Data>{u.email}</Table.Data>

								<Table.Data>{u.role ? u.role.name : "-"}</Table.Data>

								<Table.Data className="flex justify-start items-center space-x-2" onClick={(e) => e.stopPropagation()}>
									<ModalTrigger id="edit_user_modal">
										<Button outline={true} onClick={() => openEdit(u)}>
											Editar
										</Button>
									</ModalTrigger>

									<ModalTrigger id="delete_user_modal">
										<Button
											outline={false}
											color="transparent"
											className="hover:text-red-500"
											onClick={() => openDelete(u)}
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

			<Pagination
				currentPage={response?.current_page!}
				lastPage={response?.last_page!}
				total={response?.total!}
				perPage={response?.per_page!}
				from={response?.from!}
				to={response?.to!}
			/>
		</Container>
	)
}
