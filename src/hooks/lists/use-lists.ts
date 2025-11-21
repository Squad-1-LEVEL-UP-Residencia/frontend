import { getLists } from "@/actions/lists/get-lists"
import { PaginatedLists } from "@/types/lists/list"
import { useQuery } from "@tanstack/react-query"

export function useLists(page: number = 1, search?: string) {
	const searchKey = search ?? ""

	return useQuery<PaginatedLists>({
		queryKey: ["lists", searchKey],
		queryFn: () => getLists(page, searchKey),
		staleTime: 1000 * 60 * 5 // 5 minutos
	})
}
