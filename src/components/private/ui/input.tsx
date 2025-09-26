import { ComponentProps } from "react"

interface InputProps extends ComponentProps<"input"> {
	// variant?: string
}

export function Input({ className, ...props }: InputProps) {
	return (
		<input
			{...props}
			className={`border border-light-grey w-full py-2 px-4 rounded-xl bg-white/90 ${className}`}
		/>
	)
}
