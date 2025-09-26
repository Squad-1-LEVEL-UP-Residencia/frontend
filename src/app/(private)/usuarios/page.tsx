import { Paragraph } from "@/components/private/ui/paragraph"
import { Title } from "@/components/private/ui/title"
import { TitleSection } from "@/components/private/ui/title-section"

export default function Users() {
	return (
		<div>
			<TitleSection
				title="Usuários"
				paragraph="Gerencie os membros da sua equipe"
			/>
			<ul>
				<li>Fulanin de tal</li>
				<li>Beltrano de tal</li>
				<li>Ciclano de tal</li>
				<li>Fulano de tal</li>
			</ul>
		</div>
	)
}
