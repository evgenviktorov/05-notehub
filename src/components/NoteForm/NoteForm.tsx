import { useFormik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '../../services/noteService'
import css from './NoteForm.module.css'

interface NoteFormProps {
	onClose: () => void
}

const validationSchema = Yup.object().shape({
	title: Yup.string()
		.min(3, 'Must be at least 3 characters')
		.max(50, 'Must be at most 50 characters')
		.required('Title is required'),
	content: Yup.string().max(500, 'Must be at most 500 characters'),
	tag: Yup.string()
		.oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
		.required('Tag is required'),
})

export default function NoteForm({ onClose }: NoteFormProps) {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: createNote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notes'] })
			onClose()
		},
	})

	const formik = useFormik({
		initialValues: {
			title: '',
			content: '',
			tag: '',
		},
		validationSchema,
		onSubmit: values => {
			mutation.mutate(values)
		},
	})

	return (
		<form className={css.form} onSubmit={formik.handleSubmit}>
			<label className={css.label}>
				Title
				<input
					className={css.input}
					type='text'
					name='title'
					value={formik.values.title}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				<ErrorMessage name='title' component='p' className={css.error} />
			</label>

			<label className={css.label}>
				Content
				<textarea
					className={css.input}
					name='content'
					value={formik.values.content}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				<ErrorMessage name='content' component='p' className={css.error} />
			</label>

			<label className={css.label}>
				Tag
				<select
					className={css.input}
					name='tag'
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
				<ErrorMessage name='tag' component='p' className={css.error} />
			</label>

			<div className={css.actions}>
				<button
					className={css.button}
					type='submit'
					disabled={mutation.isPending}
				>
					Create
				</button>
				<button className={css.button} type='button' onClick={onClose}>
					Cancel
				</button>
			</div>
		</form>
	)
}
