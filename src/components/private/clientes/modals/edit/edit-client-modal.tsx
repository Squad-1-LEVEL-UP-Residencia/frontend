"use client"

import { Modal } from "../../../ui/modal"
import { Title } from "../../../ui/title"
import { Button } from "../../../ui/button"
import { Input } from "../../../ui/input"
import { EditClientForm } from "./edit-client-form"
import { useEffect, useState } from "react"
import { Client } from "@/types/clients/client"

export function EditClientModal() {
	const [client, setClient] = useState<Client | null>(null)

	useEffect(() => {
		const handler = (e: Event) => {
			const detail = (e as CustomEvent<Client>).detail
			setClient(detail ?? null)
		}
		window.addEventListener("client:edit-open", handler as EventListener)
		return () => window.removeEventListener("client:edit-open", handler as EventListener)
	}, [])

	return (
		<Modal id="edit_client_modal" hasCloseButton className="flex flex-col gap-16">
			<Title variant="sm">Editar cliente</Title>
			<EditClientForm client={client} />
		</Modal>
	)
}
