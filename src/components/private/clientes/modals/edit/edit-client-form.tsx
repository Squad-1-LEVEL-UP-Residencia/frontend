"use client"

import { Button } from "@/components/private/ui/button"
import { Input } from "@/components/private/ui/input"
import { ModalFooter } from "@/components/private/ui/modal"
import { SpanError } from "@/components/private/ui/span-error"
import { Label } from "@/components/private/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { editClientFormSchema, EditClientFormData } from "@/types/clients/clientSchemas"
import { Client } from "@/types/clients/client"
import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { updateClient } from "@/actions/clients/update-client"

type Props = {
	client: Client | null
}

export function EditClientForm({ client }: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<EditClientFormData>({
		resolver: zodResolver(editClientFormSchema),
		defaultValues: client ?? {}
	})

	useEffect(() => {
		if (!client) return
		reset({
			id: client.id,
			companyName: client.companyName,
			email: client.email,
			primaryContact: client.primaryContact,
			phone: client.phone,
			address: client.address,
			cnpj: client.cnpj,
			agentUrl: client.agentUrl,
			avatarUrl: client.avatarUrl
		})
	}, [client, reset])

	const { mutateAsync: updateClientMutation, isPending } = useMutation({
		mutationFn: updateClient,
		onSuccess: (data) => {
			if (data.success) {
				toast.success("Cliente editado com sucesso!")
				queryClient.invalidateQueries({ queryKey: ["clients"] })
			} else {
				toast.error(data.error)
			}
		}
	})

	async function handleEditClient(data: EditClientFormData) {
		await updateClientMutation(data)
		toast.success("Cliente atualizado com sucesso!")
	}

	return (
		<>
			<form id="form-edit-client" className="flex flex-col gap-4" onSubmit={handleSubmit(handleEditClient)}>
				<input type="hidden" {...register("id")} />

				<Label htmlFor="companyName">Empresa</Label>
				<Input id="companyName" variant="no-placeholder" {...register("companyName")} />
				{errors.companyName && <SpanError>{errors.companyName.message as string}</SpanError>}

				<Label htmlFor="email">E-mail</Label>
				<Input id="email" type="email" variant="no-placeholder" {...register("email")} />
				{errors.email && <SpanError>{errors.email.message as string}</SpanError>}

				<Label htmlFor="primaryContact">Contato</Label>
				<Input id="primaryContact" variant="no-placeholder" {...register("primaryContact")} />
				{errors.primaryContact && <SpanError>{errors.primaryContact.message as string}</SpanError>}

				<Label htmlFor="phone">Telefone</Label>
				<Input id="phone" variant="no-placeholder" {...register("phone")} />
				{errors.phone && <SpanError>{errors.phone.message as string}</SpanError>}

				<Label htmlFor="address">Endereço</Label>
				<Input id="address" variant="no-placeholder" {...register("address")} />
				{errors.address && <SpanError>{errors.address.message as string}</SpanError>}

				<Label htmlFor="cnpj">CNPJ</Label>
				<Input id="cnpj" variant="no-placeholder" {...register("cnpj")} />
				{errors.cnpj && <SpanError>{errors.cnpj.message as string}</SpanError>}

				<Label htmlFor="agentUrl">URL do agente</Label>
				<Input id="agentUrl" variant="no-placeholder" {...register("agentUrl")} />
				{errors.agentUrl && <SpanError>{errors.agentUrl.message as string}</SpanError>}
			</form>
			<ModalFooter>
				<Button outline={true} onClick={() => reset()} className="min-w-20 px-4">
					Cancelar
				</Button>
				<Button
					color="indigo"
					disabled={isPending}
					className={`${isPending ? "opacity-70 cursor-not-allowed" : ""} min-w-20 px-4`}
					outline={false}
					type="submit"
					form="form-edit-client"
				>
					{isPending ? "Salvando..." : "Salvar alterações"}
				</Button>
			</ModalFooter>
		</>
	)
}
