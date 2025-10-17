import { ComponentProps, forwardRef } from "react"

interface InputProps extends ComponentProps<"input"> {
	variant: "placeholder" | "no-placeholder"
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, variant, ...props }, ref) => {
	return (
		<input
			{...props}
			ref={ref}
			className={`
				border border-light-grey w-full py-2 px-4 rounded-xl 
				${variant === "placeholder" ? "bg-white" : "bg-zinc-200/30"} 
				${className}
			`}
		/>
	)
})
Input.displayName = "Input"

// export function Input({ className, variant = "placeholder", ...props }: InputProps) {
// 	return (
// 		<input
// 			{...props}
// 			className={`
// 				border border-light-grey w-full py-2 px-4 rounded-xl
// 				${variant === "placeholder" ? "bg-white" : "bg-zinc-200/30"}
// 				${className}
// 			`}
// 		/>
// 	)
// }
