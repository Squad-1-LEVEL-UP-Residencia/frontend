import { getClients } from "@/actions/clients/get-clients"
import { Client } from "@/types/clients/client"
import { useQuery } from "@tanstack/react-query"
import { use } from "react"

export function useClients(page: number = 1, search?: string) {
	return useQuery<Client[]>({
		queryKey: ["clients", page, search],
		queryFn: () => getClients(page, search),
		staleTime: 5000 // 5 minutos
	})
}
