"use client"

import { Button } from "@/components/private/ui/button"
import { Modal, ModalFooter } from "@/components/private/ui/modal"
import { Paragraph } from "@/components/private/ui/paragraph"
import { Title } from "@/components/private/ui/title"
import { useEffect, useState } from "react"
import { User } from "@/types/users/user"
import { useMutation } from "@tanstack/react-query"
import { removeUser } from "@/actions/users/remove-user"
import { queryClient } from "@/lib/react-query"
import toast from "react-hot-toast"

export function DeleteUserModal() {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const handler = (e: Event) => {
			const detail = (e as CustomEvent<User>).detail
			setUser(detail ?? null)
		}
		window.addEventListener("user:delete-open", handler as EventListener)
		return () => window.removeEventListener("user:delete-open", handler as EventListener)
	}, [])

	const { mutateAsync: deleteUserMutation, isPending } = useMutation({
		mutationFn: async () => {
			if (!user) return { success: false, error: "Usuário não informado" }
			return removeUser({ id: user.id })
		},
		onSuccess: (res) => {
			if (res.success) {
				toast.success("Usuário removido com sucesso!")
				queryClient.invalidateQueries({ queryKey: ["users", ""] })
			} else {
				toast.error(res.error ?? "Erro ao remover usuário")
			}
		}
	})

	async function deleteUser() {
		await deleteUserMutation()

		queryClient.invalidateQueries({ queryKey: ["users"] })
	}

	return (
		<Modal id="delete_user_modal" hasCloseButton className="flex flex-col gap-16">
			<Title variant="sm">Remover usuário</Title>
			<Paragraph>
				Tem certeza que deseja remover {user?.name ?? "este usuário"}? Esta ação não pode ser desfeita.
			</Paragraph>

			<ModalFooter>
				<Button outline={true} className="min-w-20 px-4" disabled={isPending}>
					Cancelar
				</Button>
				<Button
					color="danger"
					outline={false}
					className="min-w-20 px-4"
					disabled={isPending}
					onClick={() => deleteUser()}
				>
					{isPending ? "Removendo..." : "Remover"}
				</Button>
			</ModalFooter>
		</Modal>
	)
}
