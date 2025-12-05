"use client"

import { Container } from "@/components/private/ui/container"
import { PageContainer } from "@/components/private/ui/page-container"
import { Title } from "@/components/private/ui/title"
import { TitleSection } from "@/components/private/ui/title-section"
import { useAuth } from "@/contexts/auth-context"

export default function Dashboard() {
	const { user } = useAuth()
	return (
		<PageContainer>
			<TitleSection title="Dashboard" paragraph="Visão geral das suas tarefas e atividades" />
			<Container>
				<Title>{user?.name}</Title>
			</Container>
		</PageContainer>
	)
}
