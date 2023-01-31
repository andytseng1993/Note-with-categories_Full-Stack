import { Dispatch, SetStateAction, useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

interface ToastProps {
	toastShow: boolean
	toastContent: {
		body: string
		header: string
	}
	setToastShow: Dispatch<SetStateAction<boolean>>
}
const Toasts = ({ toastShow, setToastShow, toastContent }: ToastProps) => {
	const toggle = () => {
		setToastShow(!toastShow)
	}
	return (
		<ToastContainer position={'bottom-end'} className="p-3">
			<Toast show={toastShow} onClose={toggle} delay={4000} autohide>
				<Toast.Header>
					<strong className="me-auto">{toastContent.header}</strong>
				</Toast.Header>
				<Toast.Body>{toastContent.body}</Toast.Body>
			</Toast>
		</ToastContainer>
	)
}

export default Toasts
