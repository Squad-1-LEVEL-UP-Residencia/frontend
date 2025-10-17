import { getRoles } from "@/actions/roles/get-roles"
import { Role } from "@/data/roles/role"
import { useQuery } from "@tanstack/react-query"

export function useRoles() {
	// <Role[] | undefined>
	return useQuery({
		queryKey: ["roles"],
		queryFn: getRoles,
		staleTime: 1000 * 60 * 5 // 5 minutos
	})
}
