import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'

interface PaginationProps {
	totalPages: number
	currentPage: number
	onPageChange: (selectedPage: number) => void
}

export default function Pagination({
	totalPages,
	currentPage,
	onPageChange,
}: PaginationProps) {
	const handlePageClick = (event: { selected: number }) => {
		onPageChange(event.selected + 1) // бо нумерація з 0
	}

	return (
		<ReactPaginate
			breakLabel='...'
			nextLabel='→'
			onPageChange={handlePageClick}
			pageRangeDisplayed={3}
			marginPagesDisplayed={1}
			pageCount={totalPages}
			previousLabel='←'
			forcePage={currentPage - 1}
			containerClassName={css.pagination}
			activeClassName={css.active}
			disabledClassName={css.disabled}
		/>
	)
}
