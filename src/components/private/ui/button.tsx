/**
 * Button component with support for different visual variants.
 *
 * - primary: Fat button with border (default).
 * - secondary: Fat button without border.
 * - tertiary: Slim colorized button (not currently implemented).
 */
interface ButtonProps extends React.ComponentProps<"button"> {
	variant?: "primary" | "secondary" | "tertiary"
}

export function Button({ className, variant, ...props }: ButtonProps) {
	let colorVariant: string

	switch (variant) {
		case "secondary":
			colorVariant = "bg-white/90 hover:text-zinc-700 text-text-primary"
			break
		case "tertiary":
			colorVariant = "bg-indigo-primary hover:bg-indigo-primary/90 text-white"
			break
		case "primary":
		default:
			colorVariant =
				"bg-white/90 hover:bg-zinc-300/20 border border-light-grey text-text-primary"
			break
	}

	return (
		<button
			{...props}
			className={`flex items-center justify-center p-2 rounded-xl ${colorVariant} transition-colors  ${className}`}
		>
			{props.children}
		</button>
	)
}
