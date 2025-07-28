import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNote } from '../../services/noteService'
import type { Note } from '../../types/note'
import css from './NoteList.module.css'

interface NoteListProps {
	notes: Note[]
	isLoading: boolean
	isError: boolean
}

export default function NoteList({ notes, isLoading, isError }: NoteListProps) {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: deleteNote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notes'] })
		},
	})

	if (isLoading) return <p>Loading...</p>
	if (isError) return <p>Something went wrong</p>
	if (notes.length === 0) return null

	return (
		<ul className={css.list}>
			{notes.map((note: Note) => (
				<li key={note.id} className={css.listItem}>
					<h2 className={css.title}>{note.title}</h2>
					<p className={css.content}>{note.content}</p>
					<div className={css.footer}>
						<span className={css.tag}>{note.tag}</span>
						<button
							className={css.button}
							onClick={() => mutation.mutate(note.id)}
						>
							Delete
						</button>
					</div>
				</li>
			))}
		</ul>
	)
}
