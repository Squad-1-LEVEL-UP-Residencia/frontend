"use client"
import { useState } from "react"
import { Sidebar } from "./sidebar/sidebar"
import { Navbar } from "./navbar/navbar"

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
				<Navbar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
				{children}
			</div>
		</div>
	)
}
