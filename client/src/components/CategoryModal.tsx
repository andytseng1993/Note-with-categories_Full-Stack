import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { FormEvent, useState } from 'react'
import { Button, Modal, Form, Stack, Alert } from 'react-bootstrap'
import { useUserAuth } from '../context/UserAuth'
import { useUserToasts } from '../context/UserToasts'

const CategoryModal = () => {
	const { currentUser } = useUserAuth()
	const { setToastShow, setToastContent } = useUserToasts()
	const queryClient = useQueryClient()
	const [state, setState] = useState({
		modal: false,
		name: '',
		error: '',
	})
	const mutation = useMutation({
		mutationFn: (newCategory: { name: string }) => {
			return axios.post('api/categories', newCategory)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] })
			toggle()
		},
	})

	const toggle = () => {
		if (currentUser.userName === '' || currentUser.userName === null) {
			setToastShow(true)
			setToastContent({
				header: 'Please log in!',
				body: 'Member function only',
			})
			return
		}
		setState((pre) => ({ ...pre, modal: !pre.modal }))
	}

	return (
		<>
			<Button variant="primary" className="px-auto" onClick={toggle}>
				Add Category
			</Button>
			<Modal show={state.modal} onHide={toggle} centered>
				<Modal.Header closeButton>
					<Modal.Title>Create A New Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{state.error ? (
						<Alert key="danger" className="py-1" variant="danger">
							{state.error}
						</Alert>
					) : null}
					<Form>
						<Form.Group className="mb-3" controlId="categoryName">
							<Form.Label>Category Name</Form.Label>
							<Form.Control
								onChange={(e) =>
									setState((pre) => ({
										...pre,
										name: e.target.value,
										error: '',
									}))
								}
								type="text"
								placeholder="New Category"
							/>
							<Stack
								direction="horizontal"
								gap={3}
								className="mt-4 d-flex justify-content-end"
							>
								<Button variant="secondary" onClick={toggle}>
									Close
								</Button>
								<Button
									variant="primary"
									onClick={() => {
										if (state.name.trim() === '')
											return setState((pre) => ({
												...pre,
												error: 'Please enter all fields.',
											}))
										mutation.mutate({ name: state.name })
									}}
								>
									Create
								</Button>
							</Stack>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default CategoryModal
