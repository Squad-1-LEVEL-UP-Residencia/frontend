import React from "react"

export type ListTableColumn = {
	key: string
	label: string
	className?: string
	render?: (row: any) => React.ReactNode
}

export type ListTableProps = {
	columns: ListTableColumn[]
	data: any[]
	actions?: (row: any) => React.ReactNode
	className?: string
}

export function ListTable({
	columns,
	data,
	actions,
	className
}: ListTableProps) {
	return (
		<div
			className={`overflow-auto rounded-lg border border-light-grey bg-white ${
				className ?? ""
			}`}
		>
			<table className="min-w-full divide-y divide-light-grey">
				<thead>
					<tr>
						{columns.map((col) => (
							<th
								key={col.key} // Oq é essa key? melhor tirar da interface
								className={`px-6 py-4 text-left text-xs font-semibold text-gray-500 ${
									col.className ?? ""
								}`}
							>
								{col.label}
							</th>
						))}
						{actions && (
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
								Ações
							</th>
						)}
					</tr>
				</thead>
				<tbody className="divide-y divide-light-grey">
					{data.map((row, idx) => (
						<tr key={idx} className="hover:bg-gray-50">
							{columns.map((col) => (
								<td
									key={col.key}
									className={`px-6 py-4 align-middle ${col.className ?? ""}`}
								>
									{col.render ? col.render(row) : row[col.key]}
								</td>
							))}
							{actions && (
								<td className="px-6 py-4 align-middle">{actions(row)}</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
