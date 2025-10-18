"use client"
import { useState } from "react"
import { Sidebar } from "./sidebar/sidebar"
import { Header } from "./header/header"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/types/react-query"
import { AuthContextProvider } from "@/contexts/auth-context"

export function BaseLayout({ children }: { children: React.ReactNode }) {
	const [collapsed, setCollapsed] = useState(true)

	const toggleCollapsed = () => {
		setCollapsed(!collapsed)
	}

	return (
		<div className="flex h-full w-full">
			<AuthContextProvider>
				<Sidebar collapsed={collapsed} />
				{/* navbar */}
				<div className="flex flex-col w-full min-h-screen bg-white">
					<Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
					<QueryClientProvider client={queryClient}>
						<main className="px-8 pt-8 w-full text-text-primary h-full rounded-xl bg-background">{children}</main>
					</QueryClientProvider>
				</div>
			</AuthContextProvider>
		</div>
	)
}
