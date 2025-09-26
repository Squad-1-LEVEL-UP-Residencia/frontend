export function Title(props: React.ComponentProps<"h1">) {
	return (
		<h1
			{...props}
			className="text-text-primary text-2xl leading-8 font-semibold capitalize"
		>
			{props.children}
		</h1>
	)
}
