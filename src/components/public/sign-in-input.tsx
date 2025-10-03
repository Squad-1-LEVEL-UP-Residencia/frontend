export function SignInInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			{...props}
			className={`input-neutral min-w-full border border-background rounded-2xl p-4 ${props.className ?? ""}`}
		/>
	)
}
