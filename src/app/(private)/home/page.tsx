// ...existing code...
"use client"

import React from "react"
import { useAuth } from "@/contexts/auth-context"
import { Avatar } from "@/components/private/ui/avatar"
import Link from "next/link"
import { Container } from "@/components/private/ui/container"
import { PageContainer } from "@/components/private/ui/page-container"
import { Title } from "@/components/private/ui/title"
import { TitleSection } from "@/components/private/ui/title-section"

export default function Home() {
	// rename local variables to English for clarity
	const { user } = useAuth()
	const currentHour = new Date().getHours()
	const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite"

	return (
		<PageContainer>
			<TitleSection title="Dashboard" paragraph="Visão geral das suas tarefas e atividades" />

			<Container className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
				<Title className="flex items-center gap-4 mb-4">
					<Avatar name={user ? user.name! : "Convidado"} /> {greeting},{" "}
					<span className="text-indigo-600">{user ? user.name! : "Convidado"}</span>
				</Title>
				<div className="flex flex-col items-start gap-4 w-full md:w-auto">
					<div>
						<p className="text-sm text-slate-500">Olá</p>

						<p className="text-sm text-slate-500">Resumo rápido do seu espaço</p>
					</div>

					<main className="w-full">
						<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="p-6 rounded-xl shadow-md border border-slate-100">
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
		</PageContainer>
	)
}
