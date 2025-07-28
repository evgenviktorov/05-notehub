import { useState } from 'react'
import css from './App.module.css'

export default function App() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				{/* Компонент SearchBox */}
				{/* Компонент Pagination */}
				<button className={css.button} onClick={() => setIsModalOpen(true)}>
					Create note +
				</button>
			</header>

			{/* Компонент NoteList */}
			{/* Компонент Modal (якщо isModalOpen === true) */}
		</div>
	)
}
