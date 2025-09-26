import { TrashIcon } from "lucide-react"

export function List() {
	function initials(nome: string): import("react").ReactNode {
		return nome.slice(0, 2).toUpperCase()
	}

	return (
		<section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
			//TODO List
			<div className="grid grid-cols-[2fr_1.5fr_1fr_160px] gap-2 border-b border-slate-100 px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
				<div>Cargo</div>
				<div></div>
				<div></div>
				<div className="text-right">Ações</div>
			</div>
			{groups.length === 0 && (
				<div className="px-6 py-10 text-center text-sm text-slate-500">
					Nenhum resultado.
				</div>
			)}
			{groups.map(([cargo, pessoas]) => (
				<div key={cargo} className="border-b border-slate-100 last:border-0">
					<div className="px-6 py-3 text-sm font-medium text-slate-700">
						{cargo}
					</div>
					{pessoas.map((p, i) => (
						<div
							key={p.id}
							className={`grid grid-cols-[2fr_1.5fr_1fr_160px] items-center gap-2 px-6 py-4 ${
								i !== pessoas.length - 1 ? "border-b border-slate-50" : ""
							}`}
						>
							<div className="flex items-center gap-3">
								<div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
									{initials(p.nome)}
								</div>
								<div className="min-w-0">
									<div className="truncate text-sm font-medium">{p.nome}</div>
									<div className="truncate text-xs text-slate-500">
										{p.email}
									</div>
								</div>
							</div>
							<div className="text-sm text-slate-700">{p.funcao}</div>
							<div className="flex flex-wrap gap-2">
								{p.tags.map((t) => (
									<span
										key={t}
										className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-slate-100"
									>
										{t}
									</span>
								))}
							</div>
							<div className="flex items-center justify-end gap-2">
								<button
									onClick={() => abrirEditar(p)}
									className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs hover:bg-slate-50"
								>
									Editar
								</button>
								<button
									onClick={() => excluir(p)}
									className="inline-flex items-center justify-center rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
									title="Excluir"
									aria-label={`Excluir ${p.nome}`}
								>
									<TrashIcon />
								</button>
							</div>
						</div>
					))}
				</div>
			))}
		</section>
	)
}

function abrirEditar(pessoa: any) {
	console.log("Editar:", pessoa)
}

function excluir(pessoa: any) {
	console.log("Excluir:", pessoa)
}

// Exemplo de dados para groups
const groups: [
	string,
	{
		id: number
		nome: string
		email: string
		funcao: string
		tags: string[]
	}[]
][] = [
	[
		"Designer",
		[
			{
				id: 1,
				nome: "João Silva",
				email: "joao@email.com",
				funcao: "Designer Gráfico",
				tags: ["Criação", "Digital"]
			},
			{
				id: 2,
				nome: "Maria Rosa",
				email: "maria@email.com",
				funcao: "Designer UI",
				tags: ["Criação"]
			}
		]
	],
	[
		"Dev",
		[
			{
				id: 3,
				nome: "Carlos Roberto",
				email: "carlos@email.com",
				funcao: "Frontend",
				tags: ["Digital"]
			}
		]
	]
]
