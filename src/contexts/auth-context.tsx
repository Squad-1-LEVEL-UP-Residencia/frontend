import { User } from "@/types/users/user"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextProps {
	user: User | null
	login(userData: User): void
	logout(): void
}

export interface AccessTokenJwtPayload {
	nameid: string
	unique_name: string
	email: string
	active: string
	role: string
	nbf: number
	exp: number
	iat: number
	iss: string
	aud: string
	avatarUrl: string
}

const authContext = createContext<AuthContextProps>({} as AuthContextProps)
//* talvez mover os metodos de logout e login para dentro do context e consumir na api

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const token = Cookies.get("accessToken")
		if (token) {
			const decoded = jwtDecode<AccessTokenJwtPayload>(token)
			const parsedUser: User = {
				id: decoded.nameid,
				name: decoded.unique_name,
				email: decoded.email,
				role: [decoded.role],
				avatarUrl: decoded.avatarUrl
			}
			login(parsedUser)
		}
	}, [])

	function login(userData: User) {
		setUser(userData)
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
