import { getUsers } from "@/actions/users/get-users"
import { User } from "@/types/users/user"
import { useQuery } from "@tanstack/react-query"

export function useUsers(search?: string) {
	const searchKey = search ?? ""

	return useQuery<User[]>({
		queryKey: ["users", searchKey],
		queryFn: () => getUsers(searchKey),
		staleTime: 5000 // 5 minutos
	})
}
