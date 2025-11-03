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
			role: Array.isArray(user.role) ? user.role[0] : (user.role as string | undefined)
		})
	}, [user, reset])

	const { mutateAsync: updateUserFn, isPending } = useMutation({
		mutationFn: updateUser,
		onSuccess: (data) => {
			if (data.success) {
				toast.success("Usuário editado com sucesso!")
				queryClient.invalidateQueries({ queryKey: ["users"] })
			} else {
				toast.error(data.error)
			}
		}
	})

	async function handleEditUser(payload: EditUserFormData) {
		await updateUserFn(payload)
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
				<Select id="cargo" defaultValue="Selecione um cargo" {...register("role")}>
					<option disabled>Selecione um cargo</option>
					{isLoading ? (
						<option disabled>Carregando...</option>
					) : roles ? (
						roles.map((r: Role) => (
							<option key={r.id} value={r.id}>
								{r.description}
							</option>
						))
					) : null}
				</Select>
				<Link href="/cargos" className="text-blue-500 hover:underline">
					Criar novo cargo
				</Link>
				{errors.role && <SpanError>{errors.role.message as string}</SpanError>}
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
