import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { Button, Modal, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

interface NoteDeleteModalProps {
	title: string
	noteId: string
}
const NoteDeleteModal = ({ title, noteId }: NoteDeleteModalProps) => {
	const [show, setShow] = useState(false)
	const navigate = useNavigate()
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
						<p>
							Do you want to <strong>delete</strong> this note?
						</p>
						<h5>
							Title: <strong>{title}</strong>
						</h5>
					</Stack>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={toggle}>
						Cancel
					</Button>
					<Button variant="danger" onClick={handleDelete}>
						Delete It !{' '}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default NoteDeleteModal
