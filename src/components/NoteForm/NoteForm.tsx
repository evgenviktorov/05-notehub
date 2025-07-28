import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createNote } from '../../services/noteService'
import css from './NoteForm.module.css'

const initialValues = {
	title: '',
	content: '',
	tag: '',
}

const validationSchema = Yup.object({
	title: Yup.string().required('Title is required'),
	content: Yup.string().required('Content is required'),
	tag: Yup.string().required('Tag is required'),
})

interface NoteFormProps {
	onClose: () => void
}

export default function NoteForm({ onClose }: NoteFormProps) {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: createNote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notes'] }) // оновити список нотаток
		},
	})

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: values => {
			mutation.mutate(values, {
				onSuccess: () => {
					formik.resetForm()
					onClose() // <-- Закриває модалку
				},
			})
		},
	})

	return (
		<form className={css.form} onSubmit={formik.handleSubmit}>
			<div className={css.formGroup}>
				<label htmlFor='title'>Title</label>
				<input
					id='title'
					type='text'
					name='title'
					className={css.input}
					value={formik.values.title}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.title && formik.errors.title && (
					<span className={css.error}>{formik.errors.title}</span>
				)}
			</div>

			<div className={css.formGroup}>
				<label htmlFor='content'>Content</label>
				<textarea
					id='content'
					name='content'
					rows={8}
					className={css.textarea}
					value={formik.values.content}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.content && formik.errors.content && (
					<span className={css.error}>{formik.errors.content}</span>
				)}
			</div>

			<div className={css.formGroup}>
				<label htmlFor='tag'>Tag</label>
				<select
					id='tag'
					name='tag'
					className={css.select}
					value={formik.values.tag}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				>
					<option value=''>Select tag</option>
					<option value='Todo'>Todo</option>
					<option value='Work'>Work</option>
					<option value='Personal'>Personal</option>
					<option value='Meeting'>Meeting</option>
					<option value='Shopping'>Shopping</option>
				</select>
				{formik.touched.tag && formik.errors.tag && (
					<span className={css.error}>{formik.errors.tag}</span>
				)}
				<span className={css.error} />
			</div>

			<div className={css.actions}>
				<button
					type='button'
					className={css.cancelButton}
					onClick={() => {
						formik.resetForm()
						onClose()
					}}
				>
					Cancel
				</button>
				<button type='submit' className={css.submitButton} disabled={false}>
					Create note
				</button>
			</div>
		</form>
	)
}
