import { ComponentProps } from "react"

type InputProps = ComponentProps<"input">

export function Input({ className, ...props }: InputProps) {
	return (
		<input
			{...props}
			className={`border border-light-grey w-full py-2 px-4 rounded-xl bg-white/90 ${className}`}
		/>
	)
}
