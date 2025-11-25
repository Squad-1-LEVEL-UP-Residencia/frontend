"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { Button } from "@/components/private/ui/button"
import { Input } from "@/components/private/ui/input"
import { Label } from "@/components/private/ui/label"
import { ModalFooter } from "@/components/private/ui/modal"
import { SpanError } from "@/components/private/ui/span-error"
import { List } from "@/types/lists/list"
import { useMutation } from "@tanstack/react-query"
import { createList } from "@/actions/lists/create-list"
import { queryClient } from "@/lib/react-query"

const createListSchema = z.object({
	name: z.string().min(1, "Nome da lista é obrigatório").min(2, "Mínimo 2 caracteres").max(30, "Máximo 30 caracteres")
})

export type CreateListFormData = z.infer<typeof createListSchema>

export function CreateListForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<CreateListFormData>({
		resolver: zodResolver(createListSchema)
	})

	const { mutate: createListMutation, variables } = useMutation({
		mutationFn: async (data: CreateListFormData) => {
			const res = await createList({ name: data.name })
			console.log("res.list", res.list)
			if (res.success && res.list) {
				return res
			} else {
				toast.error("Erro ao criar lista")
			}
		},
		onSuccess: (res) => {
			console.log(res)
			toast.success("Lista criada com sucesso!")
			reset()

			queryClient.setQueryData(["lists"], (old: any) => {
				if (!old || !old.data) return { data: [res!.list] }
				return { ...old, data: [...old.data, res!.list] }
			})

			const modal = document.getElementById("create_list_modal") as HTMLDialogElement
			modal?.close()
		},
		onError: (error) => {
			toast.error("Erro ao criar lista")
			console.error(error)
		}
	})

	const onSubmit = async (data: CreateListFormData) => {
		try {
			createListMutation(data)
		} catch (error) {
			toast.error("Erro ao criar lista")
			console.error(error)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<div>
				<Label htmlFor="title">Nome da lista</Label>
				<Input
					id="title"
					type="text"
					placeholder="Ex: Em revisão, Bloqueado, etc."
					variant="placeholder"
					{...register("name")}
				/>
				{errors.name && <SpanError>{errors.name.message}</SpanError>}
			</div>

			<ModalFooter>
				<Button
					type="button"
					outline
					className="min-w-20 px-4"
					onClick={() => {
						const modal = document.getElementById("create_list_modal") as HTMLDialogElement
						modal?.close()
						reset()
					}}
				>
					Cancelar
				</Button>
				<Button type="submit" color="indigo" outline={false} className="min-w-20 px-4">
					Criar
				</Button>
			</ModalFooter>
		</form>
	)
}
