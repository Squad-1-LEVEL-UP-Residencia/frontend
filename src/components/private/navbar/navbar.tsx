"use client"
import { PanelLeftCloseIcon, PanelRightCloseIcon } from "lucide-react"

interface NavBarProps {
	collapsed: boolean
	toggleCollapsed: () => void
}

export function Navbar({ collapsed, toggleCollapsed }: NavBarProps) {
	return (
		<nav className="bg-white w-full h-16 flex items-center p-4">
			<button onClick={toggleCollapsed} aria-label="Toggle sidebar">
				{collapsed ? (
					<PanelRightCloseIcon className="text-text-primary" />
				) : (
					<PanelLeftCloseIcon className="text-text-primary" />
				)}
			</button>
			<div>receba</div>
		</nav>
	)
}
