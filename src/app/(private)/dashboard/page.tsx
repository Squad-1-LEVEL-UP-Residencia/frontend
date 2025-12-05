"use client"

import { Container } from "@/components/private/ui/container"
import { PageContainer } from "@/components/private/ui/page-container"
import { TitleSection } from "@/components/private/ui/title-section"
import { Label } from "@/components/private/ui/label"
import { Select } from "@/components/private/ui/select"
import { TasksByUserChart } from "@/components/private/dashboard/tasks-by-user-chart"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDashboard } from "@/hooks/dashboard/use-dashboard"
import { TasksByListPerUserChart } from "@/components/private/dashboard/tasks-by-list-chart2"
import { useUsers } from "@/hooks/users/use-users"
import { useSearchParams } from "next/navigation"
import { useSearchQuery } from "@/hooks/user-search-query"
import { useAllUsers } from "@/hooks/users/use-all-users"
import { queryClient } from "@/lib/react-query"
import { SearchBar } from "@/components/private/ui/page-search-bar/searchbar"
import { User } from "@/types/users/user"
import { getAllUsers } from "@/actions/users/get-all-users"
import { hasPermission } from "@/data/helpers/hasPermission"
import { useAuth } from "@/contexts/auth-context"
import { PermissionsConstant } from "@/constants/permissions"
import { Title } from "@/components/private/ui/title"
import { Avatar } from "@/components/private/ui/avatar"

export default function Dashboard() {
	const [selectedUserId, setSelectedUserId] = useState<string>("")
	// const [isLoading, setIsLoading] = useState(true)
	const { search, handleSearch } = useSearchQuery("search")
	const { data: dashboardData, isLoading, error } = useDashboard(selectedUserId)
	const { data: usersData } = useAllUsers(search ?? "")
	const { user } = useAuth()
	console.log(selectedUserId)
	useEffect(() => {
		console.log(usersData)
	}, [selectedUserId, usersData])

	const currentHour = new Date().getHours()
	const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite"

	// invalida sempre que `search` mudar, passando o novo `search`
	useEffect(() => {
		if (search !== undefined) {
			queryClient.invalidateQueries({ queryKey: ["dashboard", selectedUserId] })
		}
	}, [selectedUserId, search])

	if (error) {
		toast.error("Erro ao carregar dados do dashboard")
	}

	function handleSelectUser(userId: string) {
		setSelectedUserId(userId)
		handleSearch(userId)
	}

	return (
		<PageContainer>
			<TitleSection title="Dashboard" paragraph="Visão geral das suas tarefas e atividades" />
			{user?.role.permissions && hasPermission(user?.role.permissions, PermissionsConstant.VIEW_DASHBOARD) ? (
				isLoading ? (
					<Container>
						<div className="flex items-center justify-center py-12">
							<span className="text-text-secondary">Carregando dados...</span>
						</div>
					</Container>
				) : (
					<div className="flex flex-col gap-6">
						<Container>
							<div className="flex flex-col gap-2">
								<Label htmlFor="user-filter">Filtrar por Usuário</Label>
								{/* <SearchBar
								placeholder={"Buscar usuário..."}
								noFilter
								className="shadow-none"
								onSearch={(q) => handleSearchUser(q)}
								search={userSearch}
							/> */}
								<Select
									id="user-filter"
									value={selectedUserId}
									onChange={(e) => handleSelectUser(e.target.value)}
									className="max-w-md"
								>
									<option value="">Selecione um usuário</option>
									{usersData &&
										usersData.map((user) => (
											<option key={user.id} value={user.id}>
												{user.name}
											</option>
										))}
								</Select>
								{selectedUserId && (
									<p className="text-sm text-indigo-600 font-medium">
										Visualizando tarefas de: {usersData && usersData.find((u) => u.id === selectedUserId)?.name}
									</p>
								)}
							</div>
						</Container>

						{/* Gráfico Geral - Tarefas por Usuário */}
						<Container>
							<div className="flex flex-col gap-4">
								<div className="border-b border-light-grey pb-3">
									<h2 className="text-xl font-bold text-text-primary">📊 Tarefas por Usuário</h2>
									<p className="text-sm text-text-secondary mt-1">Top 10 usuários com mais tarefas</p>
								</div>
								{dashboardData && dashboardData.length > 0 ? (
									<TasksByUserChart data={dashboardData} />
								) : (
									<div className="flex items-center justify-center py-12 text-text-secondary">
										Nenhum dado disponível
									</div>
								)}
							</div>
						</Container>

						{/* Gráfico Individual - Tarefas do Usuário por Lista (Só aparece quando seleciona) */}
						{/* {selectedUserId && (
						<Container>
							<div className="flex flex-col gap-4">
								<div className="border-l-4 border-indigo-600 pl-4 py-2">
									<h2 className="text-xl font-bold text-text-primary">
										📈 Tarefas de {users.find((u) => u.id === parseInt(selectedUserId))?.name} por Lista
									</h2>
									<p className="text-sm text-text-secondary mt-1">
										Distribuição das tarefas deste usuário em cada lista
									</p>
								</div>
								{tasksByList.length > 0 ? (
									<TasksByListChart data={tasksByList} />
								) : (
									<div className="flex items-center justify-center py-12 text-text-secondary">
										Este usuário não possui tarefas
									</div>
								)}
							</div>
						</Container>
					)} */}

						<Container>
							<div className="flex flex-col gap-4">
								<div className="border-l-4 border-indigo-600 pl-4 py-2">
									<h2 className="text-xl font-bold text-text-primary">📈 Tarefas por Lista</h2>
									<p className="text-sm text-text-secondary mt-1">Distribuição das tarefas dos usuário em cada lista</p>
								</div>
								{dashboardData && dashboardData.length > 0 ? (
									<TasksByListPerUserChart data={dashboardData} />
								) : (
									<div className="flex items-center justify-center py-12 text-text-secondary">
										Este usuário não possui tarefas
									</div>
								)}
							</div>
						</Container>

						{/* Mensagem quando nenhum usuário está selecionado */}
						{!selectedUserId && (
							<Container>
								<div className="flex flex-col items-center justify-center py-12 gap-3">
									<div className="text-5xl">📊</div>
									<p className="text-text-secondary text-center">
										Selecione um usuário acima para ver a distribuição de tarefas por lista
									</p>
								</div>
							</Container>
						)}
					</div>
				)
			) : (
				<div>
					<Container className="flex flex-col md:flex-col items-center md:items-start justify-between gap-6 mb-8">
						<Title className="flex items-center gap-4 mb-4">
							<Avatar name={user ? user.name! : "Convidado"} /> {greeting},{" "}
							<span className="text-indigo-600">{user ? user.name! : "Convidado"}</span>
						</Title>
						<div className="flex flex-col items-start gap-4 w-full">
							<div>
								<p className="text-sm text-slate-500">Olá</p>

								<p className="text-sm text-slate-500">Resumo rápido do seu espaço</p>
							</div>
							<main className="w-full">
								<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
									<div className="p-6 rounded-xl shadow-md border border-slate-100 w-full">
										<h2 className="text-lg font-medium text-slate-800 mb-4">Resumo</h2>
										<ul className="space-y-3 text-sm text-slate-700">
											<li className="flex items-center justify-between">
												<span className="text-slate-600">Tarefas pendentes</span>
												<span className="font-semibold text-slate-900">7</span>
											</li>
										</ul>
									</div>
								</section>
							</main>
						</div>
					</Container>
				</div>
			)}
		</PageContainer>
	)
}
