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
import type { List } from "@/types/tasks/task"

const createColumnSchema = z.object({
	title: z.string().min(1, "Nome da lista é obrigatório").min(2, "Mínimo 2 caracteres").max(30, "Máximo 30 caracteres")
})

type CreateColumnFormData = z.infer<typeof createColumnSchema>

export function CreateColumnForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<CreateColumnFormData>({
		resolver: zodResolver(createColumnSchema)
	})

	const onSubmit = async (data: CreateColumnFormData) => {
		try {
			const newColumn: List = {
				id: crypto.randomUUID(),
				title: data.title,
				tasks: []
			}

			window.dispatchEvent(new CustomEvent("column:created", { detail: newColumn }))

			toast.success("Lista criada com sucesso!")
			reset()

			const modal = document.getElementById("create_column_modal") as HTMLDialogElement
			modal?.close()
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
					{...register("title")}
				/>
				{errors.title && <SpanError>{errors.title.message}</SpanError>}
			</div>

			<ModalFooter>
				<Button
					type="button"
					outline
					className="min-w-20 px-4"
					onClick={() => {
						const modal = document.getElementById("create_column_modal") as HTMLDialogElement
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
