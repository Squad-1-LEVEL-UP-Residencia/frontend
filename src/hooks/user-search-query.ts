import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export function useSearchQuery(searchKey: string) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [search, setSearch] = useState("")

	function handleSearch(query: string) {
		setSearch(query)
		const params = new URLSearchParams(searchParams.toString())
		if (query) {
			params.set(searchKey, query)
		} else {
			params.delete(searchKey)
		}
		router.push(`?${params.toString()}`)
	}

	useEffect(() => {
		const fetchSearch = searchParams.get(searchKey) || ""
		setSearch(fetchSearch)
	}, [searchParams])

	return { search, handleSearch }
}
