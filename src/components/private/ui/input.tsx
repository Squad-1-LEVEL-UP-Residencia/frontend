import { ComponentProps } from "react"

interface InputProps extends ComponentProps<"input"> {
	variant: "placeholder" | "no-placeholder"
}

export function Input({ className, variant = "placeholder", ...props }: InputProps) {
	return (
		<input
			{...props}
			className={`border border-light-grey w-full py-2 px-4 rounded-xl bg-${
				variant === "placeholder" ? "white" : "bg-zinc-200/10"
			}/90 ${className}`}
		/>
	)
}
