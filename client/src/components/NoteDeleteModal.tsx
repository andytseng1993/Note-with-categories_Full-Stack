import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { Button, Modal, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuth'

interface NoteDeleteModalProps {
	title: string
	noteId: string
	author: string
}
const NoteDeleteModal = ({ author, title, noteId }: NoteDeleteModalProps) => {
	const [show, setShow] = useState(false)
	const navigate = useNavigate()
	const { currentUser } = useUserAuth()

	const toggle = () => {
		setShow(!show)
	}
	const mutation = useMutation({
		mutationFn: () => {
			return axios.delete(`/api/notes/${noteId}`)
		},
		onSuccess: () => {
			toggle()
			navigate('..')
		},
	})
	const handleDelete = () => {
		mutation.mutate()
	}
	return (
		<>
			<Button variant="outline-danger" onClick={toggle}>
				Delete
			</Button>
			<Modal
				show={show}
				onHide={toggle}
				backdrop="static"
				keyboard={false}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete Comfirm</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Stack>
						{author === currentUser.userName || currentUser.role === 'ADMIN' ? (
							<>
								<p>
									Do you want to <strong>delete</strong> this note?
								</p>
								<h5>
									Title: <strong>{title}</strong>
								</h5>
							</>
						) : (
							<>
								<h5>Sorry! You cannot delete this note!</h5>
								<p>Only author and 'ADMIN' can Delete this.</p>
							</>
						)}
					</Stack>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={toggle}>
						Cancel
					</Button>
					{author === currentUser.userName || currentUser.role === 'ADMIN' ? (
						<Button variant="danger" onClick={handleDelete}>
							Delete It !{' '}
						</Button>
					) : null}
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default NoteDeleteModal
