import { FilterIcon } from "lucide-react"
import { Button } from "../button"
import { Input } from "../input"
import { Container } from "../container"

// TODO implementar strategy
interface SearchBarProps {
	search?: string
}

export function SearchBar({ search }: SearchBarProps) {
	return (
		// <div className="bg-white p-6 rounded-lg flex gap-2">
		<Container className="flex gap-2" variant="card">
			<Input placeholder="Pesquisar usuários" value={search} />
			<Button className="px-3">
				<FilterIcon size={16} />
			</Button>
		</Container>
		// </div>
	)
}
