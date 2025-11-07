"use client"

import { Button } from "@/components/private/ui/button"
import { Input } from "@/components/private/ui/input"
import { ModalFooter } from "@/components/private/ui/modal"
import { SpanError } from "@/components/private/ui/span-error"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { EditRoleFormData, editRoleSchema } from "@/types/roles/edit-role-schema"
import { queryClient } from "@/lib/react-query"
import { updateRole } from "@/actions/roles/update-role"
import { getPermissions } from "@/actions/roles/get-permissions"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Label } from "@/components/private/ui/label"
import { Role } from "@/types/roles/role"
import { useEffect } from "react"
import { Permission } from "@/types/roles/permission"

type Props = { role: Role | null }

export function EditRoleForm({ role }: Props) {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		setValue,
		formState: { errors }
	} = useForm<EditRoleFormData>({
		resolver: zodResolver(editRoleSchema)
	})

	const { data: permissions, isLoading } = useQuery({
		queryKey: ["permissions"],
		queryFn: getPermissions,
		staleTime: 1000 * 60 * 5
	})

	const selectedPermissions = watch("permissions") || []

	useEffect(() => {
		if (!role) return
		reset({
			name: role.name,
			description: role.description,
			permissions: role.permissions.map((p) => p.id)
		})
	}, [role, reset])

	function handleTogglePermission(permissionId: number) {
		console.log("Toggling permission:", permissionId)
		const updated = selectedPermissions.includes(permissionId)
			? selectedPermissions.filter((id: number) => id !== permissionId)
			: [...selectedPermissions, permissionId]
		setValue("permissions", updated)
		console.log(selectedPermissions)
	}

	useEffect(() => {
		const subscription = watch((value) => {
			console.log("🎯 Form atual:", value.permissions)
		})
		return () => subscription.unsubscribe()
	}, [watch])

	const { mutateAsync: updateRoleMutation, isPending } = useMutation({
		mutationFn: ({ id, data }: { id: number; data: EditRoleFormData }) => updateRole(id, data),
		onSuccess: (data) => {
			if (data.success === true) {
				toast.success("Cargo atualizado com sucesso!")
				queryClient.invalidateQueries({ queryKey: ["roles", ""] }) //TODO passar a page
			} else {
				toast.error(`Erro ao atualizar o cargo: ${data.error}`)
			}
		}
	})

	async function handleEditRole(formData: EditRoleFormData) {
		console.log("caiu aq")

		if (!role) {
			toast.error("Nenhum cargo selecionado")
			return
		}
		await updateRoleMutation({ id: role.id, data: formData })
	}

	{
		Object.keys(errors).length > 0 && <pre className="text-red-500 text-xs">{JSON.stringify(errors, null, 2)}</pre>
	}

	return (
		<>
			<form
				id="form-edit-role"
				className="flex flex-col gap-4"
				onSubmit={(e) => {
					e.preventDefault()
					console.log("🧠 handleSubmit executando...")
					handleSubmit(handleEditRole)(e)
				}}
			>
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
					form="form-edit-role"
				>
					{isPending ? "Salvando..." : "Salvar"}
				</Button>
			</ModalFooter>
		</>
	)
}
