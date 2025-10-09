import { User } from "@/data/users/user"
import { cookies } from "next/headers"
import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextProps {
	user: User | null
	login(userData: User): void
	logout(): void
}
const authContext = createContext<AuthContextProps>({} as AuthContextProps)
//* talvez mover os metodos de logout e login para dentro do context e consumir na api

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)

	function login(userData: User) {
		console.log("caiu no login")

		setUser(userData)
		console.log(user)
	}

	function logout() {
		setUser(null)
	}

	// pegar user dos cookies?
	// metodo para setar o user pelo login?

	return <authContext.Provider value={{ user, login, logout }}>{children}</authContext.Provider>
}

export function useAuth() {
	return useContext(authContext)
}
