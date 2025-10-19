import { getRoles } from "@/actions/roles/get-roles"
import { Role } from "@/types/roles/role"
import { useQuery } from "@tanstack/react-query"

export function useRoles(search?: string) {
	return useQuery({
		queryKey: ["roles", search],
		queryFn: () => getRoles(search),
		staleTime: 1000 * 60 * 5 // 5 minutos
	})
}
