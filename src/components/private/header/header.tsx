"use client"
import { PanelLeftCloseIcon, PanelRightCloseIcon } from "lucide-react"
import { Avatar } from "../ui/avatar"
import { useAuth } from "@/contexts/auth-context"

interface HeaderProps {
	collapsed: boolean
	toggleCollapsed: () => void
}

export function Header({ collapsed, toggleCollapsed }: HeaderProps) {
	const { user } = useAuth()

	return (
		<nav className="w-full h-16 flex items-center bg-indigo-primary">
			<div className="w-full h-full rounded-tl-2xl bg-white flex items-center justify-between px-4">
				<button onClick={toggleCollapsed} aria-label="Toggle sidebar">
					{collapsed ? (
						<PanelRightCloseIcon className="text-text-primary" />
					) : (
						<PanelLeftCloseIcon className="text-text-primary" />
					)}
				</button>
				{user?.name && <Avatar name={user?.name!} />}
			</div>
		</nav>
	)
}
