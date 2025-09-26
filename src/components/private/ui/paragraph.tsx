export function Paragraph({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			className={`text-text-secondary font-normal text-base ${className}`}
			{...props}
		></p>
	)
}
