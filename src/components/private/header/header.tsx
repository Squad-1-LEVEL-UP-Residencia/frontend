"use client"
import { PanelLeftCloseIcon, PanelRightCloseIcon } from "lucide-react"

interface HeaderProps {
	collapsed: boolean
	toggleCollapsed: () => void
}

export function Header({ collapsed, toggleCollapsed }: HeaderProps) {
	return (
		<nav className="bg-transparent w-full h-16 flex items-center">
			<div className="w-full h-16 flex items-center bg-indigo-primary">
				<div className="w-full h-full rounded-tl-2xl bg-white flex items-center px-4">
					<button onClick={toggleCollapsed} aria-label="Toggle sidebar">
						{collapsed ? (
							<PanelRightCloseIcon className="text-text-primary" />
						) : (
							<PanelLeftCloseIcon className="text-text-primary" />
						)}
					</button>
				</div>
			</div>
		</nav>
	)
}
