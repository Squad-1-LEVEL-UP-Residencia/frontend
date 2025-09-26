interface ContainerProps extends React.ComponentProps<"div"> {
	variant?: "card" | "page"
}

export function Container({ className, variant, ...props }: ContainerProps) {
	const containerStyle = variant === "page" ? "h-screen" : ""

	return (
		<div
			{...props}
			className={`w-full p-6 mx-auto bg-white rounded-lg ${className} ${containerStyle}`}
		>
			{props.children}
		</div>
	)
}
