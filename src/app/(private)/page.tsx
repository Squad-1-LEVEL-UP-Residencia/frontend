import { Container } from "@/components/private/ui/container"
import { TitleSection } from "@/components/private/ui/title-section"

export default function Home() {
	return (
		<div className="flex flex-col gap-6 w-full h-full">
			<TitleSection title="Home" paragraph="Home mimimimi" />
			<Container variant="card">
				<ul>
					<li>Fulanin de tal</li>
					<li>Beltrano de tal</li>
					<li>Ciclano de tal</li>
					<li>Fulano de tal</li>
				</ul>
			</Container>
		</div>
	)
}
