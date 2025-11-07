import { getUsers } from "@/actions/users/get-users"
import { User } from "@/types/users/user"
import { useQuery } from "@tanstack/react-query"

export interface PaginatedUsers {
	current_page: number
	data: User[]
	first_page_url: string
	from: number
	last_page: number
	last_page_url: string
	links: Array<{ url: string | null; label: string; active: boolean }>
	next_page_url: string | null
	path: string
	per_page: number
	prev_page_url: string | null
	to: number
	total: number
}

export function useUsers(search?: string, page: number = 1) {
	const searchKey = search ?? ""

	return useQuery<PaginatedUsers>({
		queryKey: ["users", page, searchKey],
		queryFn: () => getUsers(page, searchKey),
		staleTime: 5000 // 5 minutos
	})
}
