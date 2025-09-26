import { Button } from "@/components/private/ui/button"
import { Container } from "@/components/private/ui/container"
import { Table } from "@/components/private/ui/table"
import { Title } from "@/components/private/ui/title"
import { TitleSection } from "@/components/private/ui/title-section"
import { Trash2Icon } from "lucide-react"

export default function Home() {
	const users = [
		{ id: 1, name: "João", role: "Designer", sector: "Criação" },
		{ id: 2, name: "Maria", role: "Dev", sector: "Digital" }
	]
	return (
		<div className="flex flex-col gap-6 w-full h-full">
			<TitleSection title="Home" paragraph="Home mimimimi" />
			<Container variant="card">
				<Table
					head={[
						// ao inves de passar a table.head, eu passo direto os nomes
						"Usuário",
						"Cargo",
						"Setor",
						"Ações"
					]}
					body={
						//precisa ser um array de componentes pois posso passar buttons e badges
						users.map((element) => (
							<Table.Row key={element.id} variant="row">
								<Table.Data key={element.name}>{element.name}</Table.Data>
								<Table.Data key={element.role}>{element.role}</Table.Data>
								<Table.Data key={element.sector}>{element.sector}</Table.Data>
								<Table.Data
									key={element.id}
									className="flex justify-start items-center space-x-2"
								>
									<Button>Editar</Button>
									<Button variant="secondary">
										<Trash2Icon width={16} height={16} />
									</Button>
								</Table.Data>
							</Table.Row>
						))
					}
				/>
			</Container>
		</div>
	)
}
