type SideBarLiPRops = {
	icon: React.ReactNode
	pageName: string
	path: string
	collapsed: boolean
} & React.LiHTMLAttributes<HTMLLIElement>

export function SidebarLi({
	icon,
	pageName,
	path,
	collapsed,
	...props
}: SideBarLiPRops) {
	return (
		<li {...props}>
			<a
				href={`/${path}`}
				className={`flex items-center gap-2 w-full ${
					collapsed ? "justify-center" : "justify-start"
				}`}
			>
				{icon} <span className="capitalize">{!collapsed && pageName}</span>
			</a>
		</li>
	)
}
