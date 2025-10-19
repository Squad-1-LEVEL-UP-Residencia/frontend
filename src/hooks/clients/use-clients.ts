import { getClients } from "@/actions/clients/get-clients"
import { Client } from "@/types/clients/client"
import { useQuery } from "@tanstack/react-query"
import { use } from "react"

export function useClients(search?: string) {
	return useQuery<Client[]>({
		queryKey: ["clients", search],
		queryFn: () => getClients(search),
		staleTime: 5000 // 5 minutos
	})
}
