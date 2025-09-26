export function Avatar({ name }: { name: string }) {
	function initials(name: string): import("react").ReactNode {
		return name.slice(0, 2).toUpperCase()
	}

	return (
		<div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
			{initials(name)}
		</div>
	)
}
