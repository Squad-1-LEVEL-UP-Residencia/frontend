export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
	return (
		<label {...props} className={`label font-base text-sm text-text-primary ${props.className ?? ""}`}>
			{props.children}
		</label>
	)
}
