import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import css from './Modal.module.css'

interface ModalProps {
	onClose: () => void
	children: React.ReactNode
}

const modalRoot = document.getElementById('modal-root')!

export default function Modal({ onClose, children }: ModalProps) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.code === 'Escape') {
				onClose()
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [onClose])

	const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose()
		}
	}

	return createPortal(
		<div
			className={css.backdrop}
			role='dialog'
			aria-modal='true'
			onClick={handleBackdropClick}
		>
			<div className={css.modal}>{children}</div>
		</div>,
		modalRoot
	)
}
