interface TitleProps extends React.ComponentProps<"h1"> {
	variant?: "lg" | "sm"
}

export function Title({ className, variant, ...props }: TitleProps) {
	return (
		<h1
			{...props}
			className={`text-text-primary ${
				variant === "sm" ? "text-xl" : "text-2xl"
			} leading-8 font-semibold capitalize ${className}`}
		>
			{props.children}
		</h1>
	)
}
