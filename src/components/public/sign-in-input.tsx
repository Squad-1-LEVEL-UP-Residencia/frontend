import { forwardRef } from "react"

type SignInInputProps = React.InputHTMLAttributes<HTMLInputElement>

export const SignInInput = forwardRef<HTMLInputElement, SignInInputProps>(({ className, ...props }, ref) => {
	return (
		<input
			{...props}
			ref={ref}
			className={`input-neutral min-w-full border border-background rounded-2xl p-4 ${className ?? ""}`}
		/>
	)
})
SignInInput.displayName = "SignInInput" // Nome para facilitar o debug no React DevTools

// export function SignInInput(props: SignInInputProps) {
// 	return (
// 		<input
// 			{...props}
// 			className={`input-neutral min-w-full border border-background rounded-2xl p-4 ${props.className ?? ""}`}
// 		/>
// 	)
// }
