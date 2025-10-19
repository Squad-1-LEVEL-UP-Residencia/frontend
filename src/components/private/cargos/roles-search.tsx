"use client"

import { SearchBar } from "../ui/page-search-bar/searchbar"
import { useSearchQuery } from "@/hooks/user-search-query"

export function RolesSearch() {
	const { search, handleSearch } = useSearchQuery("search")

	return <SearchBar search={search} onSearch={handleSearch} placeholder={"Pesquisar cargos"} />
}
