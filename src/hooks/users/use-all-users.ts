import { getAllUsers } from "@/actions/users/get-all-users"
import { User } from "@/types/users/user"
import { useQuery } from "@tanstack/react-query"

export function useAllUsers(search?: string) {
	const searchKey = search ?? ""

	return useQuery<User[]>({
		queryKey: ["allUsers", searchKey],
		queryFn: () => getAllUsers(searchKey),
		staleTime: 5000 // 5 minutos
	})
}
