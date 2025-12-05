import { getDashboardData } from "@/actions/dashboard/get-dashboard-data"
import { DashboardData } from "@/types/dashboard/dashboard"
import { useQuery } from "@tanstack/react-query"

export function useDashboard(userId?: string) {
	return useQuery<DashboardData[]>({
		queryKey: ["dashboard", userId ?? "all"],
		queryFn: () => getDashboardData(userId),
		staleTime: 1000 * 60 * 5 // 5 minutos
	})
}
