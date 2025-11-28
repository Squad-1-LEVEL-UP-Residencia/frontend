"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { usePagination } from "@/hooks/use-pagination"

interface PaginationProps {
	currentPage: number
	lastPage: number
	total: number
	perPage: number
	from: number
	to: number
}

export function Pagination({ currentPage, lastPage, total, perPage, from, to }: PaginationProps) {
	const { handlePageChange } = usePagination()

	const getPageNumbers = () => {
		const pages: (number | string)[] = []
		const maxVisible = 5

		if (lastPage <= maxVisible) {
			for (let i = 1; i <= lastPage; i++) {
				pages.push(i)
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 4; i++) {
					pages.push(i)
				}
				pages.push("...")
				pages.push(lastPage)
			} else if (currentPage >= lastPage - 2) {
				pages.push(1)
				pages.push("...")
				for (let i = lastPage - 3; i <= lastPage; i++) {
					pages.push(i)
				}
			} else {
				pages.push(1)
				pages.push("...")
				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					pages.push(i)
				}
				pages.push("...")
				pages.push(lastPage)
			}
		}

		return pages
	}

	// if (lastPage <= 1) return null

	return (
		<div className="flex items-center justify-between px-4 py-3 border-t border-light-grey">
			<div className="flex items-center gap-2 text-sm text-text-secondary">
				<span>
					Mostrando <span className="font-medium text-text-primary">{from}</span> até{" "}
					<span className="font-medium text-text-primary">{to}</span> de{" "}
					<span className="font-medium text-text-primary">{total}</span> resultados
				</span>
			</div>

			<div className="flex items-center gap-2">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="flex items-center justify-center w-8 h-8 rounded-lg border border-light-grey
                     text-text-secondary hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
					aria-label="Página anterior"
				>
					<ChevronLeft width={16} height={16} />
				</button>

				{getPageNumbers().map((page, index) =>
					typeof page === "number" ? (
						<button
							key={index}
							onClick={() => handlePageChange(page)}
							className={`flex items-center justify-center min-w-8 h-8 px-2 rounded-lg border transition-colors
                        ${
													page === currentPage
														? "bg-indigo-primary text-white border-indigo-primary font-medium"
														: "border-light-grey text-text-secondary hover:bg-background"
												}`}
						>
							{page}
						</button>
					) : (
						<span key={index} className="flex items-center justify-center w-8 h-8 text-text-secondary">
							{page}
						</span>
					)
				)}

				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === lastPage}
					className="flex items-center justify-center w-8 h-8 rounded-lg border border-light-grey
                     text-text-secondary hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
					aria-label="Próxima página"
				>
					<ChevronRight width={16} height={16} />
				</button>
			</div>
		</div>
	)
}
