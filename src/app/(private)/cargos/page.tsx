type Pessoa = {
	id: string
	nome: string
	email: string
	cargo: string
	funcao: string
	tags: string[]
}
type Form = Partial<Pessoa> & {
	nome: string
	email: string
	cargo: string
	funcao: string
	tags: string[]
}

import { Container } from "@/components/private/ui/container"
import { PageContainer } from "@/components/private/ui/page-container"
import { TitleSection } from "@/components/private/ui/title-section"

export default function CargosCompact() {
	return (
		<PageContainer>
			<main className="mx-auto max-w-6xl px-6 py-8">
				<TitleSection title="Cargos" paragraph="Gerenciar cargos" />
				<header className="mb-6">
					<h1 className="text-2xl font-semibold">Cargos</h1>
					<p className="text-sm text-slate-500">Gerencie os Cargos</p>
				</header>
				<div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="relative flex-1">
						<input
							placeholder="Pesquisar usuários..."
							className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-24 text-sm outline-none focus:ring-2 focus:ring-slate-200"
						/>
						<div className="absolute right-1 top-1.5 flex gap-2">
							<button
								className="rounded-lg px-2 py-1 text-xs border border-slate-200 hover:bg-slate-50"
								title="Limpar filtros"
							>
								Limpar
							</button>
							<details className="relative">
								<summary className="list-none cursor-pointer rounded-lg px-2 py-1 text-xs border border-slate-200 hover:bg-slate-50">
									Filtros
								</summary>
								<div className="absolute right-0 z-10 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
									<div className="mb-2 text-xs font-medium text-slate-500">
										Tags
									</div>
									<div className="flex flex-wrap gap-2">{/* Tags aqui */}</div>
								</div>
							</details>
						</div>
					</div>
					<button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700">
						+ Adicionar Usuário
					</button>
				</div>
				<Container variant="page">
					<div className="grid grid-cols-[2fr_1.5fr_1fr_160px] gap-2 border-b border-slate-100 px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
						<div>Cargo</div>
						<div></div>
						<div></div>
						<div className="text-right">Ações</div>
					</div>
					{/* Lista de cargos e pessoas aqui */}
				</Container>
				<div className="mt-4 flex items-center justify-center gap-1">
					{/* Paginação aqui */}
				</div>
			</main>
		</PageContainer>
	)
}
