"use client"

import { FilterIcon } from "lucide-react"
import { Button } from "../button"
import { Input } from "../input"
import { ComponentProps } from "react"

interface SearchBarProps extends ComponentProps<"div"> {
	search?: string
	placeholder: string
	onSearch?: (query: string) => void
}

export function SearchBar({ search, placeholder, onSearch, className, ...props }: SearchBarProps) {
	return (
		// <div className="bg-white p-6 rounded-lg flex gap-2">
		<div
			className={`flex gap-2 w-full max-h-[70dvh] p-6 mx-auto bg-white rounded-lg overflow-hidden shadow ${className}`}
			{...props}
		>
			<Input
				variant="placeholder"
				placeholder={placeholder}
				value={search}
				onChange={(e) => onSearch?.(e.target.value)}
			/>
			<Button outline={true} className="px-3">
				<FilterIcon size={16} />
			</Button>
		</div>
		// </div>
	)
}
