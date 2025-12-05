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

export default function Dashboard() {
	const [selectedUserId, setSelectedUserId] = useState<string>("")
	// const [isLoading, setIsLoading] = useState(true)
	const { search, handleSearch } = useSearchQuery("search")
	const { data: dashboardData, isLoading, error } = useDashboard(selectedUserId)
	const { data: usersData } = useAllUsers(search ?? "")
	console.log(selectedUserId)
	useEffect(() => {
		console.log(usersData)
	}, [selectedUserId, usersData])

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

			{isLoading ? (
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
								<div className="flex items-center justify-center py-12 text-text-secondary">Nenhum dado disponível</div>
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
			)}
		</PageContainer>
	)
}
