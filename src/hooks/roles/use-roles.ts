import { getRoles } from "@/actions/roles/get-roles"
import { PaginatedRoles, Role } from "@/types/roles/role"
import { useQuery } from "@tanstack/react-query"

export function useRoles(page: number = 1, search?: string) {
	const searchKey = search ?? ""

	return useQuery<PaginatedRoles>({
		queryKey: ["roles", searchKey],
		queryFn: () => getRoles(page, searchKey),
		staleTime: 1000 * 60 * 5 // 5 minutos
	})
}
