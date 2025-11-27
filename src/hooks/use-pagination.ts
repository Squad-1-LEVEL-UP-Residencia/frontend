import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export function usePagination() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [currentPage, setCurrentPage] = useState(1)

	function handlePageChange(page: number) {
		setCurrentPage(page)
		const params = new URLSearchParams(searchParams.toString())
		if (page > 1) {
			params.set("page", page.toString())
		} else {
			params.delete("page")
		}
		router.push(`?${params.toString()}`)
	}

	useEffect(() => {
		const pageParam = searchParams.get("page")
		const page = pageParam ? parseInt(pageParam, 10) : 1
		setCurrentPage(page)
	}, [searchParams])

	return { currentPage, handlePageChange }
}
