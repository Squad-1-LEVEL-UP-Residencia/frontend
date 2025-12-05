import { getMe } from "@/actions/me/get-me"
import { User } from "@/types/users/user"
import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextProps {
	user: User | null | undefined
	login(userData: User): void
	logout(): void
}

const authContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null | undefined>(undefined)

	useEffect(() => {
		const fetchData = async () => {
			const res = await getMe()
			if (res && res.ok) {
				login(res.data)
			} else {
				setUser(null)
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
