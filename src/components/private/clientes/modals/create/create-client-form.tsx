"use client"

import { Button } from "@/components/private/ui/button"
import { Input } from "@/components/private/ui/input"
import { ModalFooter } from "@/components/private/ui/modal"
import { SpanError } from "@/components/private/ui/span-error"
import { Label } from "@/components/private/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientFormSchema, type CreateClientFormData } from "@/types/clients/clientSchemas"
import { createClient } from "@/actions/clients/create-client"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"

export function CreateClientForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<CreateClientFormData>({
		resolver: zodResolver(createClientFormSchema)
	})

	const { mutateAsync: createClientFn, isPending } = useMutation({
		mutationFn: createClient,
		onSuccess: (data) => {
			if (data.success) {
				toast.success("Cliente criado com sucesso!")
				queryClient.invalidateQueries({ queryKey: ["clients"] })
			} else {
				toast.error(data.error)
			}
		}
	})

	async function handleCreateClient(formData: CreateClientFormData) {
		await createClientFn(formData)
		reset()
	}

	return (
		<>
			<form id="create-client-form" className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateClient)}>
				<Label className="font-medium" htmlFor="companyName">
					Empresa
				</Label>
				<Input id="companyName" variant="no-placeholder" {...register("companyName")} />
				{errors.companyName && <SpanError>{errors.companyName.message as string}</SpanError>}

				<Label className="font-medium" htmlFor="email">
					E-mail
				</Label>
				<Input id="email" type="email" variant="no-placeholder" {...register("email")} />
				{errors.email && <SpanError>{errors.email.message as string}</SpanError>}

				<Label className="font-medium" htmlFor="primaryContact">
					Contato
				</Label>
				<Input id="primaryContact" variant="no-placeholder" {...register("primaryContact")} />
				{errors.primaryContact && <SpanError>{errors.primaryContact.message as string}</SpanError>}

				<Label className="font-medium" htmlFor="phone">
					Telefone
				</Label>
				<Input id="phone" variant="no-placeholder" {...register("phone")} />
				{errors.phone && <SpanError>{errors.phone.message as string}</SpanError>}

				<Label className="font-medium" htmlFor="address">
					Endereço
				</Label>
				<Input id="address" variant="no-placeholder" {...register("address")} />
				{errors.address && <SpanError>{errors.address.message as string}</SpanError>}

				<Label className="font-medium" htmlFor="cnpj">
					CNPJ
				</Label>
				<Input id="cnpj" variant="no-placeholder" {...register("cnpj")} />
				{errors.cnpj && <SpanError>{errors.cnpj.message as string}</SpanError>}

				<Label className="font-medium" htmlFor="agentUrl">
					URL do agente
				</Label>
				<Input id="agentUrl" variant="no-placeholder" {...register("agentUrl")} />
				{errors.agentUrl && <SpanError>{errors.agentUrl.message as string}</SpanError>}

				<Label className="font-medium" htmlFor="avatarUrl">
					URL do avatar
				</Label>
				<Input id="avatarUrl" variant="no-placeholder" {...register("avatarUrl")} />
				{errors.avatarUrl && <SpanError>{errors.avatarUrl.message as string}</SpanError>}
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
					form="create-client-form"
				>
					{isPending ? "Cadastrando..." : "Cadastrar"}
				</Button>
			</ModalFooter>
		</>
	)
}
