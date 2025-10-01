import { Input } from "../ui/input"

export function EditUserForm() {
	return (
		<form className="flex flex-col gap-4">
			<label className="font-medium" htmlFor="name">
				Nome
			</label>
			{/* adicionar valor */}
			<Input id="name" variant="no-placeholder" value={"Nome do Usuário"} />
			<label className="font-medium" htmlFor="email">
				Email
			</label>
			<Input id="email" type="email" variant="no-placeholder" value={"email@exemplo.com"} />
		</form>
	)
}
