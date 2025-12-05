import { getDashboardData } from "@/actions/dashboard/get-dashboard-data"
import { DashboardData } from "@/types/dashboard/dashboard"
import { useQuery } from "@tanstack/react-query"

export function useDashboard(userId?: string) {
	return useQuery<DashboardData[]>({
		queryKey: ["dashboard", userId],
		queryFn: ({ queryKey }) => {
			const [, id] = queryKey as [string, string?]
			return getDashboardData(id)
		},
		staleTime: 1000 * 60 * 5 // 5 minutos
	})
}
