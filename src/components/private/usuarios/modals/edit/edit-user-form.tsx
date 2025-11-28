"use client"

import { Button } from "@/components/private/ui/button"
import { Input } from "@/components/private/ui/input"
import { ModalFooter } from "@/components/private/ui/modal"
import { Select } from "@/components/private/ui/select"
import { SpanError } from "@/components/private/ui/span-error"
import { Label } from "@/components/public/label"
import { useRoles } from "@/hooks/roles/use-roles"
import { queryClient } from "@/lib/react-query"
import { Role } from "@/types/roles/role"
import { EditUserFormData, editUserSchema } from "@/types/users/edit-user-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { User } from "@/types/users/user"
import { updateUser } from "@/actions/users/update-user"
import { closeModal } from "@/data/helpers/closeModal"

type Props = { user: User | null }

export function EditUserForm({ user }: Props) {
	const { data: roles, isLoading } = useRoles()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<EditUserFormData>({
		resolver: zodResolver(editUserSchema)
	})

	useEffect(() => {
		if (!user) return
		reset({
			id: user.id,
			name: user.name,
			email: user.email,
			role_id: user.role.id
		})
	}, [user, reset])

	const { mutateAsync: updateUserFn, isPending } = useMutation({
		mutationFn: updateUser,
		onSuccess: (data) => {
			if (data.success) {
				toast.success("Usuário editado com sucesso!")
				queryClient.invalidateQueries({ queryKey: ["users"] })
				closeModal("edit_user_modal")
			} else {
				toast.error(data.error)
				closeModal("edit_user_modal")
			}
		}
	})

	async function handleEditUser(payload: EditUserFormData) {
		await updateUserFn({
			id: payload.id!,
			name: payload.name,
			email: payload.email,
			role_id: payload.role_id
		})
	}

	return (
		<>
			<form id="edit-user-form" className="flex flex-col gap-4" onSubmit={handleSubmit(handleEditUser)}>
				<input type="hidden" {...register("id")} />

				<Label className="font-medium" htmlFor="name">
					Nome
				</Label>
				<Input id="name" variant="no-placeholder" {...register("name")} />
				{errors.name && <SpanError>{errors.name.message as string}</SpanError>}

				<Label className="font-medium" htmlFor="email">
					Email
				</Label>
				<Input id="email" type="email" variant="no-placeholder" {...register("email")} />
				{errors.email && <SpanError>{errors.email.message as string}</SpanError>}

				<Label className="font-medium" htmlFor="cargo">
					Cargo
				</Label>
				<Select id="cargo" {...register("role_id", { valueAsNumber: true })}>
					<option value="">Selecione um cargo</option>
					{isLoading ? (
						<option disabled>Carregando...</option>
					) : roles ? (
						roles.data.map((r: Role) => (
							<option key={r.id} value={r.id}>
								{r.name}
							</option>
						))
					) : null}
				</Select>
				<Link href="/cargos" className="text-blue-500 hover:underline">
					Criar novo cargo
				</Link>
				{errors.role_id && <SpanError>{errors.role_id.message as string}</SpanError>}
			</form>

			<ModalFooter>
				<Button
					outline={true}
					disabled={isPending}
					onClick={() => reset()}
					className={`${isPending ? "opacity-70 cursor-not-allowed" : ""} min-w-20 px-4`}
				>
					Cancelar
				</Button>

				<Button
					color="indigo"
					disabled={isPending}
					className={`${isPending ? "opacity-70 cursor-not-allowed" : ""} min-w-20 px-4`}
					type="submit"
					outline={false}
					form="edit-user-form"
				>
					{isPending ? "Salvando..." : "Salvar"}
				</Button>
			</ModalFooter>
		</>
	)
}
