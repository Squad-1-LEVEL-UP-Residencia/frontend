"use client"

import { useSearchParams } from "next/navigation"
import { SearchBar } from "../ui/page-search-bar/searchbar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function UserSearch() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [search, setSearch] = useState("")

	//TODO criar helper ou service de search, algo abstrato
	function handleSearch(query: string) {
		setSearch(query)
		const params = new URLSearchParams(searchParams.toString())
		if (query) {
			params.set("search", query)
		} else {
			params.delete("search")
		}
		router.push(`?${params.toString()}`)
	}

	useEffect(() => {
		const fetchSearch = searchParams.get("search") || ""
		setSearch(fetchSearch)
	}, [searchParams])

	return <SearchBar search={search} onSearch={handleSearch} placeholder={"Pesquisar usuários"} />
}
