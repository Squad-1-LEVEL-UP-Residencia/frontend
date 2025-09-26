export function Title({ className, ...props }: React.ComponentProps<"h1">) {
	return (
		<h1
			{...props}
			className={`text-text-primary text-2xl leading-8 font-semibold capitalize ${className}`}
		>
			{props.children}
		</h1>
	)
}
