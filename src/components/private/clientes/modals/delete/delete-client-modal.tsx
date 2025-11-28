"use client"

import { Client } from "@/types/clients/client"
import { useState, useEffect } from "react"
import { Button } from "../../../ui/button"
import { Modal, ModalFooter } from "../../../ui/modal"
import { Paragraph } from "../../../ui/paragraph"
import { Title } from "../../../ui/title"
import { queryClient } from "@/lib/react-query"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { removeClient } from "@/actions/clients/remove-client"
import { closeModal } from "@/data/helpers/closeModal"

export function DeleteClientModal() {
	const [client, setClient] = useState<Client | null>(null)

	useEffect(() => {
		const handler = (e: Event) => {
			const detail = (e as CustomEvent<Client>).detail
			setClient(detail ?? null)
		}
		window.addEventListener("client:delete-open", handler as EventListener)
		return () => window.removeEventListener("client:delete-open", handler as EventListener)
	}, [])
	const { mutateAsync: deleteClientMutation, isPending } = useMutation({
		mutationFn: async () => {
			if (!client) return { success: false, error: "Cliente não informado" }
			return removeClient({ id: client.id })
		},
		onSuccess: (res) => {
			if (res.success) {
				toast.success("Cliente removido com sucesso!")
				queryClient.invalidateQueries({ queryKey: ["clients"] })
				closeModal("delete_client_modal")
			} else {
				toast.error(res.error ?? "Erro ao remover Cliente")
				closeModal("delete_client_modal")
			}
		}
	})

	async function deleteClient() {
		await deleteClientMutation()

		queryClient.invalidateQueries({ queryKey: ["clients"] })
	}
	return (
		<Modal id="delete_client_modal" hasCloseButton className="flex flex-col gap-16">
			<Title variant="sm">Remover cliente</Title>
			<Paragraph>Tem certeza que deseja remover este cliente? Esta ação não pode ser desfeita.</Paragraph>
			<ModalFooter>
				<Button outline={true} className="min-w-20 px-4">
					Cancelar
				</Button>
				<Button
					color="danger"
					outline={false}
					className="min-w-20 px-4"
					disabled={isPending}
					onClick={() => deleteClient()}
				>
					{isPending ? "Removendo..." : "Remover"}
				</Button>
			</ModalFooter>
		</Modal>
	)
}
