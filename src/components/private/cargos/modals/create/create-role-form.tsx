"use client"

import { Button } from "@/components/private/ui/button"
import { Input } from "@/components/private/ui/input"
import { ModalFooter } from "@/components/private/ui/modal"
import { SpanError } from "@/components/private/ui/span-error"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { CreateRoleFormData, createRoleSchema } from "@/types/roles/create-role-schema"
import { queryClient } from "@/lib/react-query"
import { createRole } from "@/actions/roles/create-role"
import { getPermissions } from "@/actions/roles/get-permissions"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Label } from "@/components/private/ui/label"
import { Permission } from "@/types/roles/permission"
import { closeModal } from "@/data/helpers/closeModal"

export function CreateRoleForm() {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		setValue,
		formState: { errors }
	} = useForm<CreateRoleFormData>({
		resolver: zodResolver(createRoleSchema)
	})

	const { data: permissions, isLoading } = useQuery({
		queryKey: ["permissions"],
		queryFn: getPermissions,
		staleTime: 1000 * 60 * 5
	})
	console.log("PERMISSIONS QUERY DATA:", permissions)

	const selectedPermissions = watch("permissions") || []

	function handleTogglePermission(permissionId: number) {
		const updated = selectedPermissions.includes(permissionId)
			? selectedPermissions.filter((id: number) => id !== permissionId)
			: [...selectedPermissions, permissionId]
		setValue("permissions", updated)
	}

	const { mutateAsync: createRoleMutation, isPending } = useMutation({
		mutationFn: createRole,
		onSuccess: (data) => {
			if (data.success === true) {
				toast.success("Cargo criado com sucesso!")
				queryClient.invalidateQueries({ queryKey: ["roles", ""] })

				// Fechar modal
				closeModal("create_role_modal")
			} else {
				toast.error(`Erro ao criar o cargo: ${data.error}`)
				closeModal("create_role_modal")
			}
		}
	})

	async function handleCreateRole({ name, permissions, description }: CreateRoleFormData) {
		await createRoleMutation({ name, permissions, description })
		reset()
	}

	return (
		<>
			<form id="create-role-form" className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateRole)}>
				<Label htmlFor="name">Nome do cargo</Label>
				<Input id="name" variant="no-placeholder" {...register("name")} />
				{errors.name && <SpanError>{errors.name.message as string}</SpanError>}

				<Label htmlFor="description">Descrição do cargo</Label>
				<Input variant="no-placeholder" {...register("description")} />
				{errors.description && <SpanError>{errors.description.message as string}</SpanError>}

				{errors.permissions && <SpanError>{errors.permissions.message as string}</SpanError>}
				{isLoading && <p>Carregando permissões...</p>}
				{permissions && (
					<div className="flex flex-col gap-2">
						{permissions.map((perm: Permission) => (
							<Label key={perm.id} className="flex items-center gap-2 p-2">
								<input
									type="checkbox"
									className="toggle border-zinc-950 bg-transparent text-zinc-200 checked:border-indigo-600 checked:bg-indigo-500 checked:text-white"
									checked={selectedPermissions.includes(perm.id)}
									onChange={() => handleTogglePermission(perm.id)}
								/>
								<span className="font-medium text-base">{perm.label}</span>
							</Label>
						))}
					</div>
				)}
			</form>
			<ModalFooter>
				<Button
					outline={true}
					disabled={isPending}
					onClick={() => reset()}
					className={`${isPending ? "opacity-70 cursor-not-allowed hover:" : ""} min-w-20 px-4`}
				>
					Cancelar
				</Button>
				<Button
					color="indigo"
					form="create-role-form"
					type="submit"
					outline={false}
					disabled={isPending}
					className={`${isPending ? "opacity-70 cursor-not-allowed" : ""} min-w-20 px-4`}
				>
					Cadastrar
				</Button>
			</ModalFooter>
		</>
	)
}
