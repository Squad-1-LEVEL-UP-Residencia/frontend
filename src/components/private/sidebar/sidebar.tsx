"use client"
import FlapIconSvg from "../../public/flap-icon"
import { Briefcase, Building, ClipboardList, LayoutDashboardIcon, LogOutIcon, Settings, Users } from "lucide-react"
import { SidebarLi } from "./sidebar-li"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { PermissionsConstant } from "@/constants/permissions"
import { hasPermission } from "@/data/helpers/hasPermission"

export function Sidebar({ collapsed }: { collapsed: boolean }) {
	const pathname = usePathname()
	const { user } = useAuth()
	const permissions = user?.role?.permissions ?? []

	return (
		<aside
			style={{
				background: "var(--gradient-indigo)",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				minHeight: "100dvh",
				width: collapsed ? "5rem" : "15rem",
				minWidth: collapsed ? "5rem" : "15rem",
				overflow: "hidden"
			}}
			className={`flex flex-col gap-4 p-4 text-text-white transition-width duration-300`}
		>
			<div className="w-full flex-1 h-full">
				<ul className="w-full h-full flex flex-col justify-between gap-4 items-start">
					<div className="flex flex-col gap-2 w-full">
						<li className="p-2 mb-8">
							<FlapIconSvg />
						</li>
						{hasPermission(permissions, PermissionsConstant.VIEW_JOB) && (
							<SidebarLi
								pageName="Dashboard"
								icon={<LayoutDashboardIcon />}
								path="dashboard"
								isSelected={pathname === "/dashboard"}
								collapsed={collapsed}
							/>
						)}
						{hasPermission(permissions, PermissionsConstant.VIEW_JOB) && (
							<SidebarLi
								pageName="Tarefas"
								icon={<ClipboardList />}
								path="tarefas"
								isSelected={pathname === "/tarefas"}
								collapsed={collapsed}
							/>
						)}
						{hasPermission(permissions, PermissionsConstant.VIEW_USER) && (
							<SidebarLi
								pageName="Usuários"
								icon={<Users />}
								path="usuarios"
								isSelected={pathname === "/usuarios"}
								collapsed={collapsed}
							/>
						)}
						{hasPermission(permissions, PermissionsConstant.VIEW_CLIENT) && (
							<SidebarLi
								pageName="Clientes"
								icon={<Building />}
								path="clientes"
								isSelected={pathname === "/clientes"}
								collapsed={collapsed}
							/>
						)}
						{hasPermission(permissions, PermissionsConstant.VIEW_ROLE) && (
							<SidebarLi
								pageName="Cargos"
								icon={<Briefcase />}
								path="cargos"
								isSelected={pathname === "/cargos"}
								collapsed={collapsed}
							/>
						)}
						<SidebarLi
							pageName="Configurações"
							icon={<Settings />}
							path="configuracoes"
							isSelected={pathname === "/configuracoes"}
							collapsed={collapsed}
						/>
					</div>
					<div>
						<SidebarLi
							icon={<LogOutIcon />}
							pageName={"Sair"}
							path={"api/auth/sign-out"}
							isSelected={false}
							collapsed={collapsed}
							className="hover:text-red-500 hover:bg-red-500/10"
						/>
					</div>
				</ul>
			</div>
		</aside>
	)
}
