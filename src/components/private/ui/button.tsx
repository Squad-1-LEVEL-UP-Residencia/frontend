interface ButtonProps extends React.ComponentProps<"button"> {}

export function Button({ className, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={`bg-white/90 p-2 rounded-xl border border-light-grey hover:bg-white transition-colors text-text-primary ${className}`}
		>
			{props.children}
		</button>
	)
}
