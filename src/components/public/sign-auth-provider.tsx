"use client"
import { AuthContextProvider } from "@/contexts/auth-context"

export function SignInAuthProvider({ children }: { children: React.ReactNode }) {
	return <AuthContextProvider>{children}</AuthContextProvider>
}
