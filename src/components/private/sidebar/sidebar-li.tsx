type SideBarLiPRops = {
	icon: React.ReactNode
	pageName: string
	path: string
	isSelected: boolean
	collapsed: boolean
} & React.LiHTMLAttributes<HTMLLIElement>

export function SidebarLi({
	icon,
	pageName,
	path,
	isSelected,
	collapsed,
	...props
}: SideBarLiPRops) {
	return (
		<li {...props}>
			<a
				href={`/${path}`}
				className={`flex items-center rounded-xl p-3 gap-2 w-full ${
					collapsed ? "justify-center" : "justify-start"
				}
				${isSelected ? "bg-white/20" : ""}
				`}
			>
				{icon} {!collapsed && <span className="capitalize">{pageName}</span>}
			</a>
		</li>
	)
}
