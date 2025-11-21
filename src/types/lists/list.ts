import { Paginated } from "../global/paginated"
import { Task } from "../tasks/task"

export interface List {
	id: string
	title: string
	tasks: Task[]
}

export interface PaginatedLists extends Paginated {
	data: List[]
}
