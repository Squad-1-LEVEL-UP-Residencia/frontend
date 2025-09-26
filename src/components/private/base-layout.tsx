"use client"
import { useState } from "react"
import { Sidebar } from "./sidebar/sidebar"
import { Header } from "./header/header"

export function BaseLayout({ children }: { children: React.ReactNode }) {
	const [collapsed, setCollapsed] = useState(false)

	const toggleCollapsed = () => {
		setCollapsed(!collapsed)
	}

	return (
		<div className="flex min-h-[100dvh] w-full">
			<Sidebar collapsed={collapsed} />
			{/* navbar */}
			<div className="flex flex-col w-full">
				<Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
				<main className="px-8 pt-8 w-full text-text-primary">{children}</main>
			</div>
		</div>
	)
}
