interface ContainerProps extends React.ComponentProps<"div"> {
	variant?: "card" | "page"
}

export function Container({ className, variant, ...props }: ContainerProps) {
	const containerStyle = variant === "page" ? "h-full rounded-b-none" : ""

	return (
		<div {...props} className={`w-full p-6 mx-auto bg-white rounded-lg shadow ${className} ${containerStyle}`}>
			{props.children}
		</div>
	)
}
