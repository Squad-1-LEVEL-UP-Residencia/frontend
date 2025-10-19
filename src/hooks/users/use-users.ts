import { getUsers } from "@/actions/users/get-users"
import { User } from "@/types/users/user"
import { useQuery } from "@tanstack/react-query"

export function useUsers(search?: string) {
	return useQuery<User[]>({
		queryKey: ["users", search],
		queryFn: () => getUsers(search),
		staleTime: 5000 // 5 minutos
	})
}
