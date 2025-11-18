import { getClients } from "@/actions/clients/get-clients"
import { Client, PaginatedClients } from "@/types/clients/client"
import { useQuery } from "@tanstack/react-query"
import { use } from "react"

export function useClients(page: number = 1, search?: string) {
	return useQuery<PaginatedClients>({
		queryKey: ["clients", page, search],
		queryFn: () => getClients(page, search),
		staleTime: 5000 // 5 minutos
	})
}
