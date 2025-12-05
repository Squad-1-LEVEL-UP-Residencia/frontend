"use client"

import { DashboardData } from "@/types/dashboard/dashboard"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface TasksByUserChartProps {
	data: DashboardData[]
}

const COLORS = [
	"#6366f1", // indigo
	"#8b5cf6", // violet
	"#ec4899", // pink
	"#f59e0b", // amber
	"#10b981", // emerald
	"#3b82f6", // blue
	"#ef4444", // red
	"#14b8a6", // teal
	"#f97316", // orange
	"#84cc16" // lime
]

export function TasksByUserChart({ data }: TasksByUserChartProps) {
	// Pegar top 10 usuários
	const topUsers = data.slice(0, 10)
	return (
		<ResponsiveContainer width="100%" height={400}>
			<BarChart data={topUsers} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
				<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
				<XAxis dataKey="user_name" angle={-45} textAnchor="end" height={100} tick={{ fill: "#6b7280", fontSize: 12 }} />
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
				<Bar dataKey="total_tasks" fill="#6366f1" radius={[8, 8, 0, 0]}>
					{topUsers.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	)
}
