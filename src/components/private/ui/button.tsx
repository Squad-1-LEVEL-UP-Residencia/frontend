/**
 * Button component with support for different visual outlines.
 *
 * - primary: Fat button with border (default).
 * - secondary: Fat button without border.
 * - tertiary: Slim colorized button (not currently implemented).
 */
interface ButtonProps extends React.ComponentProps<"button"> {
	outline: boolean
	color?: "white" | "indigo" | "transparent"
	size?: "slim" | "fat"
}

export function Button({ className, size, color, outline, ...props }: ButtonProps) {
	let bgClass: string = ""
	let textClass: string = ""
	let borderClass: string = ""
	let paddingClass: string = ""

	switch (color) {
		case "indigo":
			bgClass = "bg-indigo-primary hover:bg-indigo-primary/90"
			textClass = "text-white"
			break
		case "white":
			bgClass = "bg-white hover:bg-zinc-100"
			textClass = "text-text-primary"
			break
		case "transparent":
		default:
			// por padrao é transparente
			bgClass = "bg-transparent hover:bg-zinc-100"
			textClass = "text-text-primary"
			break
	}

	// 2- size controla o p se deve ser 2 ou 4
	switch (size) {
		case "slim":
			paddingClass = "p-2"
			break
		case "fat":
			paddingClass = "p-4"
		default:
			// por padrao é slim
			paddingClass = "p-2"
			break
	}

	// 3- outline controla se tem border, o primary é com borda
	switch (outline) {
		case true:
			borderClass = "border border-light-grey"
			break
		case false:
			borderClass = "border-none"
			break
		default:
			// por padrao tem borda
			borderClass = "border border-light-grey"
			break
	}

	switch (color) {
	}

	return (
		<button
			{...props}
			className={`
				flex items-center justify-center p-2 rounded-xl transition-colors
				${bgClass} ${textClass} ${borderClass} ${paddingClass} ${className}
			`}
		>
			{props.children}
		</button>
	)
}
