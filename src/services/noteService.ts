import axios from 'axios'
import type { Note } from '../types/note'

export interface FetchNotesResponse {
	notes: Note[]
	totalPages: number
	page: number
	perPage: number
}

export const fetchNotes = async (
	page: number,
	search?: string
): Promise<FetchNotesResponse> => {
	const token = import.meta.env.VITE_NOTEHUB_TOKEN

	const response = await axios.get(
		'https://notehub-public.goit.study/api/notes',
		{
			params: {
				page,
				perPage: 12,
				...(search ? { search } : {}),
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)

	return response.data
}

export interface CreateNoteData {
	title: string
	content: string
	tag: string
}

export const createNote = async (note: CreateNoteData): Promise<Note> => {
	const token = import.meta.env.VITE_NOTEHUB_TOKEN

	const response = await axios.post(
		'https://notehub-public.goit.study/api/notes',
		note,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)

	return response.data
}

export const deleteNote = async (id: number): Promise<void> => {
	const token = import.meta.env.VITE_NOTEHUB_TOKEN

	await axios.delete(`https://notehub-public.goit.study/api/notes/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}
