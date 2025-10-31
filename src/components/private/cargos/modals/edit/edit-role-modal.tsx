"use client"

import { Modal } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { EditRoleForm } from "./edit-role-form"
import { useEffect, useState } from "react"
import { Role } from "@/types/roles/role"

export function EditRoleModal() {
	const [role, setRole] = useState<Role | null>(null)

	useEffect(() => {
		const handler = (e: Event) => {
			const detail = (e as CustomEvent<Role>).detail
			setRole(detail ?? null)
		}
		window.addEventListener("role:edit-open", handler as EventListener)
		return () =>
			window.removeEventListener("role:edit-open", handler as EventListener)
	}, [])

	return (
		<Modal id="edit_role_modal" className="flex flex-col gap-16" hasCloseButton>
			<Title variant="sm">Editar cargo</Title>
			<EditRoleForm role={role} />
		</Modal>
	)
}
