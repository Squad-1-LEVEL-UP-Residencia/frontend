import { getMe } from "@/actions/me/get-me"
import { User } from "@/types/users/user"
import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextProps {
	user: User | null
	login(userData: User): void
	logout(): void
}

const authContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			const res = await getMe()
			//TODO lidar com o error
			if (res && res.ok) {
				login(res.data)
			}
		}
		fetchData()
	}, [])

	function login(userData: User) {
		setUser(userData)
	}

	function logout() {
		setUser(null)
	}

	return <authContext.Provider value={{ user, login, logout }}>{children}</authContext.Provider>
}

export function useAuth() {
	return useContext(authContext)
}
