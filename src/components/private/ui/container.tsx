interface ContainerProps extends React.ComponentProps<"div"> {
	variant?: "card" | "page"
}

export function Container({ className, variant, ...props }: ContainerProps) {
	const containerStyle = variant === "page" ? "h-[100dvh] rounded-b-none" : ""

	return (
		<div
			{...props}
			className={`w-full max-h-[70vh] p-6 mx-auto bg-white rounded-lg overflow-hidden shadow ${className} ${containerStyle}`}
		>
			{props.children}
		</div>
	)
}
