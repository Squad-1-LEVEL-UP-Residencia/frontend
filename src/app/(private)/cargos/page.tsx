"use client"

import { useMemo, useState } from "react"
import { TitleSection } from "@/components/private/ui/title-section"
import { Button } from "@/components/private/ui/button"
import { Container } from "@/components/private/ui/container"
import { Modal, ModalFooter, ModalTrigger } from "@/components/private/ui/modal"
import { Table } from "@/components/private/ui/table"
import { Plus, Trash2Icon } from "lucide-react"
import { Title } from "@/components/private/ui/title"
import { Paragraph } from "@/components/private/ui/paragraph"
import { EditRoleModal } from "@/components/private/cargos/edit/edit-role-modal"
import { CreateRoleModal } from "@/components/private/cargos/create/create-role-modal"
import { DeleteRoleModal } from "@/components/private/cargos/delete/delete-role-modal"

type Cargo = { id: string; nome: string }
const gid = () => String(Date.now() + Math.random())
const SEED: Cargo[] = [
	{ id: gid(), nome: "Gerente de Marketing" },
	{ id: gid(), nome: "Analista de Marketing" },
	{ id: gid(), nome: "Social Media" },
	{ id: gid(), nome: "Designer Gráfico" },
	{ id: gid(), nome: "Copywriter" }
]

export default function CargosPage() {
	const [list, setList] = useState<Cargo[]>(SEED)
	const [busca, setBusca] = useState("")
	const [novo, setNovo] = useState("")

	const view = useMemo(
		() => (busca ? list.filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase())) : list),
		[list, busca]
	)

	function addCargo(e: React.FormEvent) {
		e.preventDefault()
		const nome = novo.trim()
		if (!nome) return
		setList((ls) => [{ id: gid(), nome }, ...ls])
		setNovo("")
	}

	function editar(c: Cargo) {
		const nome = prompt("Editar cargo:", c.nome)?.trim()
		if (nome) setList((ls) => ls.map((x) => (x.id === c.id ? { ...x, nome } : x)))
	}

	function excluir(c: Cargo) {
		if (confirm(`Excluir "${c.nome}"?`)) setList((ls) => ls.filter((x) => x.id !== c.id))
	}

	return (
		<div className="flex flex-col gap-6 w-full h-full">
			<div className="flex items-center justify-between">
				<TitleSection title="Cargos" paragraph="Gerencie os Cargos" />
				<ModalTrigger id="add_role_modal">
					<Button outline={true} color="indigo" className="gap-2 px-4">
						<Plus /> Adicionar Cargo
					</Button>
				</ModalTrigger>
			</div>

			<input
				placeholder="Pesquisar cargos..."
				value={busca}
				onChange={(e) => setBusca(e.target.value)}
				className="w-full rounded-xl border border-mid-grey/40 bg-white-primary px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:ring-2 focus:ring-blue-primary/30"
			/>

			<Container variant="page">
				<Table
					head={["Cargo", "Ações"]}
					body={view.map((c) => (
						<Table.Row key={c.id} variant="row">
							<Table.Data className="w-full">{c.nome}</Table.Data>

							<Table.Data className="text-right pr-2 sm:pr-6">
								<span className="inline-flex items-center gap-2">
									<ModalTrigger id="edit_role_modal">
										<Button outline={true}>Editar</Button>
									</ModalTrigger>

									<ModalTrigger id="delete_role_modal">
										<Button
											outline={true}
											color="transparent"
											className="hover:text-red-500"
											aria-label={`Excluir ${c.nome}`}
										>
											<Trash2Icon width={16} height={16} />
										</Button>
									</ModalTrigger>
								</span>
							</Table.Data>
						</Table.Row>
					))}
				/>
			</Container>
			<EditRoleModal />
			<CreateRoleModal />
			<DeleteRoleModal />
		</div>
	)
}
