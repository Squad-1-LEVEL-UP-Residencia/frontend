import { Input } from "../ui/input"

export function CreateUserForm() {
	return (
		<form className="flex flex-col gap-4">
			<label className="font-medium" htmlFor="name">
				Nome
			</label>
			<Input id="name" variant="no-placeholder" />
			<label className="font-medium" htmlFor="email">
				Email
			</label>
			<Input id="email" type="email" variant="no-placeholder" />
		</form>
	)
}
