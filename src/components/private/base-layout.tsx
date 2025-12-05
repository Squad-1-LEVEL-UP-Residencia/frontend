"use client"
import { useEffect, useState } from "react"
import { Sidebar } from "./sidebar/sidebar"
import { Header } from "./header/header"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { AuthContextProvider, useAuth } from "@/contexts/auth-context"
import { usePathname, useRouter } from "next/navigation"
import { PermissionsConstant } from "@/constants/permissions"

interface AuthGateProps {
	children: React.ReactNode
	collapsed: boolean
	toggleCollapsed: () => void
}

export function BaseLayout({ children }: { children: React.ReactNode }) {
	const [collapsed, setCollapsed] = useState(true)

	const toggleCollapsed = () => {
		setCollapsed(!collapsed)
	}

	return (
		<AuthContextProvider>
			<AuthGate collapsed={collapsed} toggleCollapsed={toggleCollapsed}>
				{children}
			</AuthGate>
		</AuthContextProvider>
	)
}

function AuthGate({ children, collapsed, toggleCollapsed }: AuthGateProps) {
	const path = usePathname()
	const router = useRouter()
	const { user } = useAuth()

	let permission: string = "home_access"
	switch (path) {
		case "/dashboard":
			permission = PermissionsConstant.VIEW_DASHBOARD
			break
		case "/clientes":
			permission = PermissionsConstant.VIEW_CLIENT
			break
		case "/usuarios":
			permission = PermissionsConstant.VIEW_USER
			break
		case "/tarefas":
			permission = PermissionsConstant.VIEW_JOB
			break
		case "/cargos":
			permission = PermissionsConstant.VIEW_ROLE
			break
		case "/":
			permission = "home_access"
			break
	}

	useEffect(() => {
		// espera o carregamento do user
		if (user === undefined) return
		if (permission === "home_access") {
			return
		}
		const userHasPermission = !!(
			user &&
			Array.isArray(user.role?.permissions) &&
			user.role!.permissions.some((p) => p.slug === permission)
		)
		console.log("Checking permission for", path, "->", permission, ":", userHasPermission)
		if (!userHasPermission) {
			router.push("/unauthorized")
		}
	}, [permission, path, router, user])

	const isLoading = user === undefined
	return (
		<div className="flex h-full w-full">
			<Sidebar collapsed={collapsed} />
			{/* navbar */}
			<div className="flex flex-col w-full min-h-screen bg-white">
				<Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
				<QueryClientProvider client={queryClient}>
					<main className="px-8 pt-8 w-full text-text-primary h-full rounded-xl bg-background">
						{isLoading ? (
							<div className="flex items-center justify-center h-full">
								{/* spinner simples */}
								<svg
									className="animate-spin h-6 w-6 text-gray-600"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
								</svg>
							</div>
						) : (
							children
						)}
					</main>
				</QueryClientProvider>
			</div>
		</div>
	)
}
