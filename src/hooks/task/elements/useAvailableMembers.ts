import { getAvailableMembers } from "@/actions/tasks/get-available-members"
import { User } from "@/types/users/user"
import { useQuery } from "@tanstack/react-query"

export function useAvailableMembers(taskId: number) {
	return useQuery<User[]>({
		queryKey: ["available-members", taskId],
		queryFn: () => getAvailableMembers(taskId)
	})
}
