"use client"

import { Role } from "@/types/roles/role"
import { Button } from "@/components/private/ui/button"
import { Input } from "@/components/private/ui/input"
import { ModalFooter } from "@/components/private/ui/modal"
import { useRoles } from "@/hooks/roles/use-roles"
import { SpanError } from "@/components/private/ui/span-error"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateUserFormData, createUserSchema } from "@/types/users/registerSchema"
import { createUser } from "@/actions/users/create-user"
import toast from "react-hot-toast"
import { Label } from "@/components/private/ui/label"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import Link from "next/link"
import { Select } from "@/components/private/ui/select"

export function CreateUserForm() {
	const { data: roles, isLoading } = useRoles()
	console.log("Roles in CreateUserForm:", roles)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<CreateUserFormData>({
		resolver: zodResolver(createUserSchema)
	})

	const { mutateAsync: createUserFn, isPending } = useMutation({
		mutationFn: createUser,
		onSuccess: (data) => {
			if (data.success) {
				toast.success("Usuário criado com sucesso!")
				queryClient.invalidateQueries({ queryKey: ["users"] })

				// Fechar modal
				const modal = document.getElementById("create_user_modal") as HTMLDialogElement
				modal?.close()
			} else {
				toast.error(data.error)
			}
		}
	})

	async function handleCreateUser({ role_id, email, name }: CreateUserFormData) {
		await createUserFn({ name, email, role_id })
		reset()
	}

	return (
		<>
			<form id="create-user-form" className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateUser)}>
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
				<Select defaultValue="Selecione um cargo" id="cargo" {...register("role_id", { valueAsNumber: true })}>
					<option disabled={true}>Selecione um cargo</option>
					{isLoading ? (
						<option disabled={true} value={undefined}>
							Carregando...
						</option>
					) : roles ? (
						roles.data.map((role: Role) => (
							<option key={role.id} value={role.id}>
								{role.name}
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
				<>
					{/* <form method="dialog"> */}

					<Button
						outline={true}
						disabled={isPending}
						onClick={() => reset()}
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
						form="create-user-form"
					>
						{isPending ? "Cadastrando..." : "Cadastrar"}
					</Button>
				</>
			</ModalFooter>
		</>
	)
}
