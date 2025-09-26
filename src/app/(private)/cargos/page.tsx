"use client"

import React, { useEffect, useMemo, useState } from "react"

type Tag = "Criação" | "Conteúdo" | "Digital"
type Pessoa = {
	id: string
	nome: string
	email: string
	cargo: string
	funcao: string
	tags: Tag[]
}
type Form = Partial<Pessoa> & {
	nome: string
	email: string
	cargo: string
	funcao: string
	tags: Tag[]
}

const TAGS: Tag[] = ["Criação", "Conteúdo", "Digital"]
const STORAGE_KEY = "cargos:data:v2"
const id = () =>
	typeof crypto !== "undefined" && "randomUUID" in crypto
		? crypto.randomUUID()
		: Math.random().toString(36).slice(2) + Date.now().toString(36)

const SEED: Pessoa[] = [
	{
		id: id(),
		nome: "Maria Rosa",
		email: "maria.rosa@gmail.com",
		cargo: "Gerente de Marketing",
		funcao: "Designer Gráfico",
		tags: ["Criação"]
	},
	{
		id: id(),
		nome: "Carlos Roberto",
		email: "carlos.roberto@gmail.com",
		cargo: "Gerente de Marketing",
		funcao: "Copywriter",
		tags: ["Conteúdo"]
	},
	{
		id: id(),
		nome: "Ana Maria",
		email: "ana.maria@gmail.com",
		cargo: "Gerente de Marketing",
		funcao: "Social Media",
		tags: ["Digital"]
	},
	{
		id: id(),
		nome: "Pedro Santos",
		email: "pedro.santos@outlook.com",
		cargo: "Gerente de Marketing",
		funcao: "Diretor Criativo",
		tags: ["Criação"]
	},
	{
		id: id(),
		nome: "Maria Rosa",
		email: "maria.rosa@gmail.com",
		cargo: "Gerente de Marketing",
		funcao: "Designer Gráfico",
		tags: ["Criação"]
	},
	{
		id: id(),
		nome: "Fernanda Lima",
		email: "fernanda.lima@hotmail.com",
		cargo: "Gerente de Marketing",
		funcao: "Analista de Marketing",
		tags: ["Digital"]
	}
]

const initials = (n: string) =>
	n
		.trim()
		.split(/\s+/)
		.map((p) => p[0])
		.slice(0, 2)
		.join("")
		.toUpperCase()

function TrashIcon({ className = "h-4 w-4" }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden className={className}>
			<path
				fill="currentColor"
				d="M9 3h6l1 1h4v2H4V4h4l1-1Zm-2 6h2v10H7V9Zm4 0h2v10h-2V9Zm4 0h2v10h-2V9ZM6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Z"
			/>
		</svg>
	)
}

export default function CargosCompact() {
	const [list, setList] = useState<Pessoa[]>(() => {
		try {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
		} catch {
			return []
		}
	})
	useEffect(() => {
		if (!list.length) {
			setList(SEED)
			localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED))
		}
	}, [])
	useEffect(() => {
		if (list.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
	}, [list])

	const [search, setSearch] = useState("")
	const [tags, setTags] = useState<Tag[]>([])
	const [page, setPage] = useState(1)
	const pageSize = 6

	const [open, setOpen] = useState(false)
	const emptyForm: Form = {
		nome: "",
		email: "",
		cargo: "",
		funcao: "",
		tags: []
	}
	const [form, setForm] = useState<Form>(emptyForm)

	const filtered = useMemo(() => {
		const q = search.toLowerCase().trim()
		let r = list
		if (q)
			r = r.filter((p) =>
				[p.nome, p.email, p.cargo, p.funcao].some((f) =>
					f.toLowerCase().includes(q)
				)
			)
		if (tags.length) r = r.filter((p) => tags.every((t) => p.tags.includes(t)))
		return r
	}, [list, search, tags])

	const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
	const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize)

	const groups = useMemo(() => {
		const map = pageItems.reduce<Record<string, Pessoa[]>>(
			(a, p) => ((a[p.cargo] ||= []).push(p), a),
			{}
		)
		return Object.entries(map)
	}, [pageItems])

	function toggleTag(t: Tag) {
		setTags((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))
		setPage(1)
	}
	function abrirNovo() {
		setForm(emptyForm)
		setOpen(true)
	}
	function abrirEditar(p: Pessoa) {
		setForm({ ...p })
		setOpen(true)
	}
	function salvar(e: React.FormEvent) {
		e.preventDefault()
		if (!form.nome || !form.email || !form.cargo || !form.funcao) return
		setList((curr) => {
			const novo: Pessoa = {
				id: form.id || id(),
				nome: form.nome.trim(),
				email: form.email.trim(),
				cargo: form.cargo.trim(),
				funcao: form.funcao.trim(),
				tags: form.tags
			}
			const exists = curr.some((p) => p.id === novo.id)
			return exists
				? curr.map((p) => (p.id === novo.id ? novo : p))
				: [novo, ...curr]
		})
		setOpen(false)
	}
	function excluir(p: Pessoa) {
		if (confirm(`Excluir ${p.nome}?`))
			setList((curr) => curr.filter((x) => x.id !== p.id))
	}

	return (
		// TODO PageContainer
		<div className="min-h-screen bg-slate-50">
			{/* //TODO TitleSection */}
			<main className="mx-auto max-w-6xl px-6 py-8">
				<header className="mb-6">
					<h1 className="text-2xl font-semibold">Cargos</h1>
					<p className="text-sm text-slate-500">Gerencie os Cargos</p>
				</header>
				{/* //TODO SearchBar */}
				<div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="relative flex-1">
						<input
							value={search}
							onChange={(e) => {
								setSearch(e.target.value)
								setPage(1)
							}}
							placeholder="Pesquisar usuários..."
							className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-24 text-sm outline-none focus:ring-2 focus:ring-slate-200"
						/>
						<div className="absolute right-1 top-1.5 flex gap-2">
							<button
								onClick={() => setTags([])}
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
									<div className="flex flex-wrap gap-2">
										{TAGS.map((t) => {
											const active = tags.includes(t)
											return (
												<button
													key={t}
													onClick={() => toggleTag(t)}
													className={`rounded-full px-3 py-1 text-xs border ${
														active
															? "bg-slate-900 text-white border-slate-900"
															: "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
													}`}
												>
													{t}
												</button>
											)
										})}
									</div>
								</div>
							</details>
						</div>
					</div>
					<button
						onClick={abrirNovo}
						className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
					>
						+ Adicionar Usuário
					</button>
				</div>
				{/* //TODO Container */}
				<section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
					{/* //TODO List */}
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
						<div
							key={cargo}
							className="border-b border-slate-100 last:border-0"
						>
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
										{/* avatar  */}
										<div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
											{initials(p.nome)}
										</div>
										<div className="min-w-0">
											<div className="truncate text-sm font-medium">
												{p.nome}
											</div>
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
				<div className="mt-4 flex items-center justify-center gap-1">
					<button
						className="rounded-lg border border-slate-200 px-2 py-1 text-sm hover:bg-slate-50 disabled:opacity-40"
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={page <= 1}
					>
						◀
					</button>
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
						<button
							key={n}
							onClick={() => setPage(n)}
							className={`h-8 min-w-[32px] rounded-lg border px-2 text-sm ${
								n === page
									? "border-slate-900 bg-slate-900 font-medium text-white"
									: "border-slate-200 bg-white hover:bg-slate-50"
							}`}
						>
							{n}
						</button>
					))}
					<button
						className="rounded-lg border border-slate-200 px-2 py-1 text-sm hover:bg-slate-50 disabled:opacity-40"
						onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
						disabled={page >= totalPages}
					>
						▶
					</button>
				</div>
			</main>
			{open && (
				<div
					className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4"
					onMouseDown={() => setOpen(false)}
				>
					<div
						className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl"
						onMouseDown={(e) => e.stopPropagation()}
					>
						<div className="mb-4 flex items-center justify-between">
							<h3 className="text-lg font-semibold">
								{form.id ? "Editar Usuário" : "Adicionar Usuário"}
							</h3>
							<button
								onClick={() => setOpen(false)}
								className="rounded-full p-2 hover:bg-slate-100"
								title="Fechar"
							>
								✕
							</button>
						</div>
						<form className="space-y-4" onSubmit={salvar}>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Field
									label="Nome"
									value={form.nome}
									onChange={(v) => setForm((f) => ({ ...f, nome: v }))}
								/>
								<Field
									label="E-mail"
									type="email"
									value={form.email}
									onChange={(v) => setForm((f) => ({ ...f, email: v }))}
								/>
								<Field
									label="Cargo (grupo)"
									value={form.cargo}
									onChange={(v) => setForm((f) => ({ ...f, cargo: v }))}
									placeholder="Ex.: Gerente de Marketing"
								/>
								<Field
									label="Função"
									value={form.funcao}
									onChange={(v) => setForm((f) => ({ ...f, funcao: v }))}
									placeholder="Ex.: Designer Gráfico"
								/>
							</div>

							<div>
								<div className="mb-2 text-xs font-medium text-slate-600">
									Tags
								</div>
								<div className="flex flex-wrap gap-2">
									{TAGS.map((t) => {
										const active = form.tags?.includes(t)
										return (
											<button
												key={t}
												type="button"
												onClick={() =>
													setForm((f) => ({
														...f,
														tags: active
															? (f.tags || []).filter((x) => x !== t)
															: [...(f.tags || []), t]
													}))
												}
												className={`rounded-full border px-3 py-1 text-xs font-medium ${
													active
														? "bg-slate-900 text-white border-slate-900"
														: "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
												}`}
											>
												{t}
											</button>
										)
									})}
								</div>
							</div>

							<div className="flex items-center justify-end gap-2 pt-2">
								<button
									type="button"
									onClick={() => setOpen(false)}
									className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
								>
									Cancelar
								</button>
								<button
									type="submit"
									className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
								>
									{form.id ? "Salvar alterações" : "Adicionar"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}

function Field(props: {
	label: string
	value?: string
	onChange: (v: string) => void
	type?: string
	placeholder?: string
}) {
	return (
		<label className="block">
			<span className="mb-1 block text-xs font-medium text-slate-600">
				{props.label}
			</span>
			<input
				value={props.value || ""}
				onChange={(e) => props.onChange(e.target.value)}
				type={props.type || "text"}
				placeholder={props.placeholder}
				required
				className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
			/>
		</label>
	)
}
