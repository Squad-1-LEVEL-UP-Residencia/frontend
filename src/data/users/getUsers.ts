export async function getUsers() {
	const response = await fetch("https://dummyjson.com/users")
	const data = await response.json()

	// const users = [
	// 	{ id: 1, name: "João", role: "Designer", sector: "Criação" },
	// 	{ id: 2, name: "Maria", role: "Dev", sector: "Digital" }
	// ]

	return data.users
}
