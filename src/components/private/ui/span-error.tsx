import { ComponentProps } from "react"

export function SpanError({ children, className, ...props }: ComponentProps<"span">) {
	return (
		<span className={`text-red-500 text-xs ${className}`} {...props}>
			{children}
		</span>
	)
}
