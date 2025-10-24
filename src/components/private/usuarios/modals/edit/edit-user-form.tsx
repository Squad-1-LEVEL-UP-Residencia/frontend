"use client"

import { editUser } from "@/actions/users/edit-user"
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
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export function EditUserForm() {
	const { data: roles, isLoading } = useRoles()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<EditUserFormData>({
		resolver: zodResolver(editUserSchema)
	})

	const { mutateAsync: editUserFn, isPending } = useMutation({
		mutationFn: editUser,
		onSuccess: (data) => {
			if (data.success) {
				toast.success("Usuário editado com sucesso!")

				queryClient.invalidateQueries({ queryKey: ["users"] })
			} else {
				toast.error(data.error)
			}
			// console.log("Created user:", data)
		}
	})

	async function handleEditUser({ id, name, email, role }: EditUserFormData) {
		await editUserFn({ id, name, email, role })
		reset()
	}

	return (
		<>
			<form id="edit-user-form" className="flex flex-col gap-4" onSubmit={handleSubmit(handleEditUser)}>
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
				<Select defaultValue="Selecione um cargo" id="cargo" {...register("role")}>
					<option disabled={true}>Selecione um cargo</option>
					{isLoading ? (
						<option disabled={true} value={undefined}>
							Carregando...
						</option>
					) : roles ? (
						roles.map((role: Role) => (
							<option key={role.id} value={role.id}>
								{role.name}
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
				<>
					{/* <form method="dialog"> */}

					<Button
						outline={true}
						disabled={isPending}
						className={`${isPending ? "opacity-70 cursor-not-allowed hover:" : ""} min-w-20 px-4`}
					>
						Cancelar
					</Button>
					{/* </form> */}
					<Button
						color="indigo"
						disabled={isPending}
						className={`${isPending ? "opacity-70 cursor-not-allowed" : ""} min-w-20 px-4`}
						type="submit"
						outline={false}
						form="edit-user-form"
					>
						{isPending ? "Editando..." : "Editar"}
					</Button>
				</>
			</ModalFooter>
		</>
	)
}
