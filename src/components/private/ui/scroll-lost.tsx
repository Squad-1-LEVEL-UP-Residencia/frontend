import { ComponentProps } from "react"

export function ScrollList({ children, className, ...props }: ComponentProps<"div">) {
	return (
		<div className={`w-full max-h-[70vh] overflow-y-auto overflow-x-auto ${className}`} {...props}>
			{children}
		</div>
	)
}
