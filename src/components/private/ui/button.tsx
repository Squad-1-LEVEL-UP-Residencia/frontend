/**
 * Button component with support for different visual variants.
 *
 * - primary: Fat button with border (default).
 * - secondary: Fat button without border.
 * - tertiary: Slim button (not currently implemented).
 */
interface ButtonProps extends React.ComponentProps<"button"> {
	variant?: "primary" | "secondary" | "tertiary"
}

export function Button({ className, variant, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={`bg-white/90 p-2 rounded-xl ${
				variant === "secondary" ? "" : "border border-light-grey"
			} hover:bg-white transition-colors text-text-primary ${className}`}
		>
			{props.children}
		</button>
	)
}
