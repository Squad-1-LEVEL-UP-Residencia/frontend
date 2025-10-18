import { getUsers } from "@/actions/users/get-users"
import { User } from "@/types/users/user"
import { useQuery } from "@tanstack/react-query"

export function useUsers() {
	return useQuery<User[]>({
		queryKey: ["users"],
		queryFn: getUsers,
		staleTime: 5000 // 5 minutos
	})
}
