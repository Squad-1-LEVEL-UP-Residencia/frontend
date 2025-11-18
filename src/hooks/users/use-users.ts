import { getUsers } from "@/actions/users/get-users"
import { PaginatedUsers, User } from "@/types/users/user"
import { useQuery } from "@tanstack/react-query"

export function useUsers(page: number = 1, search?: string) {
	const searchKey = search ?? ""

	return useQuery<PaginatedUsers>({
		queryKey: ["users", page, searchKey],
		queryFn: () => getUsers(page, searchKey),
		staleTime: 5000 // 5 minutos
	})
}
