import { ComponentProps } from "react"

interface TableRowProps extends ComponentProps<"tr"> {
	variant: "head" | "row"
}

function TableRow({ className, ...props }: TableRowProps) {
	return (
		<tr
			{...props}
			className={`
				${props.variant === "row" ? "border-t" : ""} 
				${className}
				border-light-grey
			`}
		>
			{props.children}
		</tr>
	)
}

function TableHead({ className, ...props }: ComponentProps<"th">) {
	return (
		<th
			className={`text-text-secondary text-sm font-medium px-6 py-4 text-left ${
				className ?? ""
			}`}
		>
			{props.children}
		</th>
	)
}

function TableData(props: ComponentProps<"td">) {
	return (
		<td
			className={`px-6 py-4 space-x-2 text-left ${props.className ?? ""}`}
			{...props}
		>
			{props.children}
		</td>
	)
}

interface TableProps {
	head: string[]
	body: React.ReactNode
}

function Table({ head, body }: TableProps) {
	return (
		<table className="table w-full overflow-auto bg-white">
			<thead className="">
				{/* foreach TableHead (ex: name, setor, cargo, action) */}
				<TableRow variant="head">
					{head.map((th, idx) => {
						const isLast = idx === head.length - 1
						return (
							<TableHead className={`${!isLast ? "pr-48" : ""}`} key={idx}>
								{th}
							</TableHead>
						)
					})}
				</TableRow>
			</thead>
			<tbody>{body}</tbody>
		</table>
	)
}

Table.Head = TableHead
Table.Data = TableData
Table.Row = TableRow

export { Table }
