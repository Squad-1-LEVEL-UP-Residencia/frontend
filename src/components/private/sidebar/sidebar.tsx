"use client"

import { useState } from "react"
import FlapIconSvg from "../../ui/public/flap-icon"
import {
	Building,
	ClipboardList,
	HomeIcon,
	LayoutDashboardIcon,
	ScreenShare,
	Settings,
	Users,
	Workflow
} from "lucide-react"
import { SidebarLi } from "./sidebar-li"

export function Sidebar() {
	const [collapsed, setCollapsed] = useState(false)

	const toggleCollapsed = () => {
		setCollapsed(!collapsed)
	}

	return (
		<aside
			style={{
				background: "var(--gradient-blue-primary)",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				minHeight: "100dvh", //? ta gerando um scroll na pagina
				width: collapsed ? "4.5rem" : "15rem"
			}}
			className={`flex flex-col gap-4 p-4 text-text-white transition-width duration-300`}
		>
			<button onClick={toggleCollapsed} aria-label="toggle sidebar">
				<FlapIconSvg />
			</button>
			<div className="w-full flex-1 pl-1">
				<ul className="w-full min-h-full flex flex-col gap-4 items-start">
					<SidebarLi
						pageName="Home"
						icon={<HomeIcon />}
						path=""
						collapsed={collapsed}
					/>
					<SidebarLi
						pageName="Dashboard"
						icon={<LayoutDashboardIcon />}
						path="dashboard"
						collapsed={collapsed}
					/>
					<SidebarLi
						pageName="Tarefas"
						icon={<ClipboardList />}
						path="tarefas"
						collapsed={collapsed}
					/>
					<SidebarLi
						pageName="Outro serviços"
						icon={<ScreenShare />}
						path="outros-servicos"
						collapsed={collapsed}
					/>
					<SidebarLi
						pageName="Usuários"
						icon={<Users />}
						path="usuarios"
						collapsed={collapsed}
					/>
					<SidebarLi
						pageName="Clientes"
						icon={<Building />}
						path="clientes"
						collapsed={collapsed}
					/>
					<SidebarLi
						pageName="Configurações"
						icon={<Settings />}
						path="configuracoes"
						collapsed={collapsed}
					/>
				</ul>
			</div>
		</aside>
	)
}
