import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { FormEvent, useState } from 'react'
import { Button, Modal, Form, Stack, Alert } from 'react-bootstrap'

const CategoryModal = () => {
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
		setState((pre) => ({ ...pre, modal: !pre.modal }))
	}

	return (
		<>
			<Button variant="primary" className="px-auto" onClick={toggle}>
				+ Add Category
			</Button>
			<Modal show={state.modal} onHide={toggle}>
				<Modal.Header closeButton>
					<Modal.Title>Create a new category</Modal.Title>
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
