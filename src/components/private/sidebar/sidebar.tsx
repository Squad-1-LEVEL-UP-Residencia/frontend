"use client"
import FlapIconSvg from "../../public/flap-icon"
import {
	Building,
	ClipboardList,
	HomeIcon,
	LayoutDashboardIcon,
	Settings,
	Users
} from "lucide-react"
import { SidebarLi } from "./sidebar-li"
import { usePathname } from "next/navigation"

export function Sidebar({ collapsed }: { collapsed: boolean }) {
	const pathname = usePathname()

	return (
		<aside
			style={{
				background: "var(--gradient-blue-primary)",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				minHeight: "100dvh",
				width: collapsed ? "5rem" : "15rem",
				minWidth: collapsed ? "5rem" : "15rem",
				overflow: "hidden"
			}}
			className={`flex flex-col gap-4 p-4 text-text-white transition-width duration-300`}
		>
			<div className="w-full flex-1">
				<ul className="w-full min-h-full flex flex-col gap-4 items-start">
					<li className="p-2">
						<FlapIconSvg />
					</li>
					<SidebarLi
						pageName="Home"
						icon={<HomeIcon />}
						path=""
						isSelected={pathname === "/"}
						collapsed={collapsed}
					/>
					<SidebarLi
						pageName="Dashboard"
						icon={<LayoutDashboardIcon />}
						path="dashboard"
						isSelected={pathname === "/dashboard"}
						collapsed={collapsed}
					/>
					<SidebarLi
						pageName="Tarefas"
						icon={<ClipboardList />}
						path="tarefas"
						isSelected={pathname === "/tarefas"}
						collapsed={collapsed}
					/>
					<SidebarLi
						pageName="Usuários"
						icon={<Users />}
						path="usuarios"
						isSelected={pathname === "/usuarios"}
						collapsed={collapsed}
					/>
					<SidebarLi
						pageName="Clientes"
						icon={<Building />}
						path="clientes"
						isSelected={pathname === "/clientes"}
						collapsed={collapsed}
					/>
					<SidebarLi
						pageName="Configurações"
						icon={<Settings />}
						path="configuracoes"
						isSelected={pathname === "/configuracoes"}
						collapsed={collapsed}
					/>
				</ul>
			</div>
		</aside>
	)
}
