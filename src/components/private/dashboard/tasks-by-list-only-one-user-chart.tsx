"use client"

import { DashboardData } from "@/types/dashboard/dashboard"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface TasksByListChartProps {
	data: DashboardData[]
}

const COLORS = [
	"#6366f1", // indigo
	"#8b5cf6", // violet
	"#ec4899", // pink
	"#f59e0b", // amber
	"#10b981" // emerald
]

export function TasksByListOnlyOneUser({ data }: TasksByListChartProps) {
	return (
		<ResponsiveContainer width="100%" height={400}>
			<BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
				<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
				<XAxis dataKey="listName" angle={-45} textAnchor="end" height={100} tick={{ fill: "#6b7280", fontSize: 12 }} />
				<YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
				<Tooltip
					contentStyle={{
						backgroundColor: "#fff",
						border: "1px solid #e5e7eb",
						borderRadius: "8px",
						padding: "8px 12px"
					}}
					labelStyle={{ color: "#111827", fontWeight: 600 }}
					cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
				/>
				<Bar dataKey="taskCount" fill="#6366f1" radius={[8, 8, 0, 0]}>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	)
}
