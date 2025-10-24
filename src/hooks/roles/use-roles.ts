import { getRoles } from "@/actions/roles/get-roles"
import { Role } from "@/types/roles/role"
import { useQuery } from "@tanstack/react-query"

export function useRoles(search?: string) {
	const searchKey = search ?? ""

	return useQuery({
		queryKey: ["roles", searchKey],
		queryFn: () => getRoles(searchKey),
		staleTime: 1000 * 60 * 5 // 5 minutos
	})
}
