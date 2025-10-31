"use client"

import { Table } from "@/components/private/ui/table"
import { Button } from "@/components/private/ui/button"
import { ModalTrigger } from "@/components/private/ui/modal"
import { Trash2Icon } from "lucide-react"
import type { Role } from "@/types/roles/role"
import { useRoles } from "@/hooks/roles/use-roles"
import { Container } from "../ui/container"
import { ScrollList } from "../ui/scroll-lost"
import { useSearchParams } from "next/navigation"

export function RolesList() {
	const searchParams = useSearchParams()
	const search = searchParams.get("search") || undefined
	const { data: roles, isLoading } = useRoles(search)

	function openEdit(r: Role) {
		window.dispatchEvent(new CustomEvent("role:edit-open", { detail: r }))
	}

	function openDelete(r: Role) {
		window.dispatchEvent(new CustomEvent("role:delete-open", { detail: r }))
	}

	return (
		<Container variant="page">
			<ScrollList>
				<Table
					head={["Cargo", "Descrição", "Ações"]}
					isLoading={isLoading}
					body={
						roles &&
						roles.map((r: Role) => (
							<Table.Row key={r.id} variant="row">
								<Table.Data className="w-2/5">{r.name}</Table.Data>
								<Table.Data className="w-full">{r.description}</Table.Data>
								<Table.Data className="text-right pr-2 sm:pr-6">
									<span className="inline-flex items-center gap-2">
										<ModalTrigger id="edit_role_modal">
											<Button outline onClick={() => openEdit(r)}>Editar</Button>
										</ModalTrigger>

										<ModalTrigger id="delete_role_modal">
											<Button
												outline
												color="transparent"
												className="hover:text-red-500"
												aria-label={`Excluir ${r.name}`}
												onClick={() => openDelete(r)}
											>
												<Trash2Icon width={16} height={16} />
											</Button>
										</ModalTrigger>
									</span>
								</Table.Data>
							</Table.Row>
						))
					}
				/>
			</ScrollList>
		</Container>
	)
}
