"use client"

import { useSearchQuery } from "@/hooks/user-search-query"
import { SearchBar } from "../ui/page-search-bar/searchbar"

export function ClientsSearch() {
	const { search, handleSearch } = useSearchQuery("search")
	return <SearchBar placeholder="Pesquisar clientes" search={search} onSearch={handleSearch} />
}
