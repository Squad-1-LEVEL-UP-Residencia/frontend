import { forwardRef, SelectHTMLAttributes } from "react"

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
	label?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, children, ...props }, ref) => (
	<div className="flex flex-col gap-1">
		{label && (
			<label htmlFor={props.id} className="font-medium">
				{label}
			</label>
		)}
		<select
			ref={ref}
			{...props}
			className={`block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:bg-gray-100 disabled:text-gray-400 ${
				props.className ?? ""
			}`}
		>
			{children}
		</select>
	</div>
))

Select.displayName = "Select"
