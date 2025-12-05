"use client"

import { DashboardData } from "@/types/dashboard/dashboard"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts"

interface TasksByListChartProps {
	// recebe o payload do backend: cada item é um usuário com `tasks_by_list`
	data: DashboardData[]
}

const COLORS = [
	"#6366f1", // indigo
	"#8b5cf6", // violet
	"#ec4899", // pink
	"#f59e0b", // amber
	"#10b981", // emerald
	"#06b6d4", // cyan
	"#f97316" // orange
]

type ListDef = { listId: number; listName: string; key: string; color: string }

function prepareChartData(apiData: DashboardData[]) {
	// descobrir todas as listas presentes nos usuários, mantendo uma ordem estável
	const listMap = new Map<number, string>()
	apiData.forEach((user) => {
		user.tasks_by_list?.forEach((t) => listMap.set(t.list_id, t.list_name))
	})

	const lists: ListDef[] = Array.from(listMap.entries()).map(([id, name], idx) => ({
		listId: id,
		listName: name,
		key: `list_${id}`,
		color: COLORS[idx % COLORS.length]
	}))

	// transformar cada usuário em um objeto onde cada chave `list_<id>` tem a contagem
	const chartData = apiData.map((user) => {
		const obj: Record<string, any> = { user_name: user.user_name ?? "—" }
		lists.forEach((l) => {
			const found = user.tasks_by_list?.find((x) => x.list_id === l.listId)
			obj[l.key] = found ? found.count : 0
		})
		return obj
	})

	return { chartData, lists }
}

export function TasksByListPerUserChart({ data }: TasksByListChartProps) {
	const { chartData, lists } = prepareChartData(data)

	return (
		<ResponsiveContainer width="100%" height={400}>
			<BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
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
					cursor={{ fill: "rgba(99, 102, 241, 0.04)" }}
					formatter={(value: any, name: any) => [value, name]}
				/>
				<Legend />

				{lists.map((l) => (
					<Bar key={l.key} dataKey={l.key} name={l.listName} stackId={undefined} fill={l.color} radius={[8, 8, 0, 0]} />
				))}
			</BarChart>
		</ResponsiveContainer>
	)
}
