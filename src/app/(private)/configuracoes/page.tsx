import { Container } from "@/components/private/ui/container"
import { PageContainer } from "@/components/private/ui/page-container"
import { PageHeader } from "@/components/private/ui/page-header"
import { Title } from "@/components/private/ui/title"
import { TitleSection } from "@/components/private/ui/title-section"
import { ChangePasswordForm } from "@/components/private/configuracoes/change-password-form"

export default function Settings() {
	return (
		<PageContainer>
			<PageHeader>
				<TitleSection title="Configurações" paragraph="Gerenciar suas configurações de conta" />
			</PageHeader>

			<Container variant="page">
				<div className="space-y-8">
					<div>
						<Title variant="sm">Segurança</Title>
						<p className="text-sm text-gray-600 mb-6">
							Altere sua senha para manter sua conta segura
						</p>
						<ChangePasswordForm />
					</div>
				</div>
			</Container>
		</PageContainer>
	)
}
