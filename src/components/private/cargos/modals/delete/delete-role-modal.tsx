"use client"

import { Modal, ModalFooter } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { Paragraph } from "@/components/private/ui/paragraph"
import { Button } from "@/components/private/ui/button"
import { queryClient } from "@/lib/react-query"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { deleteRole } from "@/actions/roles/delete-role"
import { Role } from "@/types/roles/role"
import { useEffect, useState } from "react"
import { closeModal } from "@/data/helpers/closeModal"

export function DeleteRoleModal() {
	const [role, setRole] = useState<Role | null>(null)

	useEffect(() => {
		const handler = (e: Event) => {
			const detail = (e as CustomEvent<Role>).detail
			setRole(detail ?? null)
		}
		window.addEventListener("role:delete-open", handler as EventListener)
		return () => window.removeEventListener("role:delete-open", handler as EventListener)
	}, [])

	const { mutateAsync: deleteRoleMutation, isPending } = useMutation({
		mutationFn: async () => {
			if (!role) return { success: false, error: "Cargo não informado" }
			return deleteRole(role.id)
		},
		onSuccess: (res) => {
			if (res.success) {
				toast.success("Cargo removido com sucesso!")
				queryClient.invalidateQueries({ queryKey: ["roles", ""] })
				closeModal("delete_role_modal")
			} else {
				toast.error(res.error ?? "Erro ao remover cargo")
				closeModal("delete_role_modal")
			}
		}
	})

	async function onDeleteRole() {
		await deleteRoleMutation()
	}

	return (
		<Modal id="delete_role_modal" hasCloseButton className="flex flex-col gap-16">
			<Title variant="sm">Remover cargo</Title>
			<Paragraph>Tem certeza que deseja remover este cargo? Esta ação não pode ser desfeita.</Paragraph>
			<ModalFooter>
				<Button outline={true} className="min-w-20 px-4">
					Cancelar
				</Button>
				<Button color="danger" outline={false} className="min-w-20 px-4" onClick={() => onDeleteRole()}>
					Remover
				</Button>
			</ModalFooter>
		</Modal>
	)
}
