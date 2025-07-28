import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { fetchNotes } from '../../services/noteService'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'
import NoteList from '../NoteList/NoteList'
import Pagination from '../Pagination/Pagination'
import SearchBox from '../SearchBox/SearchBox'
import css from './App.module.css'

export default function App() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [page, setPage] = useState(1)
	const [search, setSearch] = useState('')
	const [debouncedSearch] = useDebounce(search, 500)
	const { data, isLoading, isError } = useQuery({
		queryKey: ['notes', page, debouncedSearch],
		queryFn: () => fetchNotes(page, debouncedSearch),
		placeholderData: previousData => previousData,
	})

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<button className={css.button} onClick={() => setIsModalOpen(true)}>
					Create note +
				</button>
				{data && data.totalPages > 1 && (
					<Pagination
						currentPage={page}
						totalPages={data.totalPages}
						onPageChange={setPage}
					/>
				)}
				<SearchBox value={search} onChange={setSearch} />
			</header>

			<NoteList
				notes={data?.notes ?? []}
				isLoading={isLoading}
				isError={isError}
			/>
			{isModalOpen && (
				<Modal onClose={() => setIsModalOpen(false)}>
					<NoteForm onClose={() => setIsModalOpen(false)} />
				</Modal>
			)}
		</div>
	)
}
