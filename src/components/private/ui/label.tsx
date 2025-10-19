import { ComponentProps } from "react"

export function Label({ children, className, ...props }: ComponentProps<"label">) {
	return (
		<label className={`font-medium ${className}`} {...props}>
			{children}
		</label>
	)
}
