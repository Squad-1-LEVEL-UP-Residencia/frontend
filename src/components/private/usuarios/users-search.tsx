"use client"

import { useSearchParams } from "next/navigation"
import { SearchBar } from "../ui/page-search-bar/searchbar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchQuery } from "@/hooks/user-search-query"

export function UserSearch() {
	const { search, handleSearch } = useSearchQuery("search")

	return <SearchBar search={search} onSearch={handleSearch} placeholder={"Pesquisar usuários"} />
}
