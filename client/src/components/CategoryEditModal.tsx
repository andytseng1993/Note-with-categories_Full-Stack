import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { Alert, Button, Form, Modal, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CategorySelect from './CategorySelect'

interface SelectCategory {
	name: string
	id: string
}

const CategoryEditModal = () => {
	const [show, setShow] = useState(false)
	const [selectCategory, setSelectCategory] = useState<SelectCategory[]>([])
	const [deleteBtn, setDeleteBtn] = useState(false)
	const [editBtn, setEditBtn] = useState(false)
	const [errorMsg, setErrorMsg] = useState('')
	const [newCategoryName, setNewCategoryName] = useState('')
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const mutationDelete = useMutation({
		mutationFn: (id: string) => {
			return axios.delete(`api/categories/${id}`)
		},
		onSuccess: () => {
			toggle()
			queryClient.invalidateQueries({ queryKey: ['categories'] })
			navigate('/')
		},
	})
	const mutationEdit = useMutation({
		mutationFn: async (editCategory: SelectCategory) => {
			const { data } = await axios.put(`api/categories/${editCategory.id}`, {
				name: editCategory!.name,
			})
			return data
		},
		onSuccess: () => {
			toggle()
			queryClient.invalidateQueries({ queryKey: ['categories'] })
			navigate('/')
		},
	})

	const toggle = () => {
		setShow(false)
		setEditBtn(false)
		setDeleteBtn(false)
		setErrorMsg('')
		setNewCategoryName('')
		setSelectCategory([])
	}
	const handleFn = (fn: Function) => {
		if (selectCategory.length === 0) {
			return setErrorMsg('Please select one category.')
		}
		fn(true)
	}
	const DeleteCategory = () => {
		if (selectCategory.length === 0) return
		mutationDelete.mutate(selectCategory[0].id)
	}
	const EditCategory = () => {
		if (selectCategory.length === 0 || newCategoryName == '') return
		mutationEdit.mutate({ name: newCategoryName, id: selectCategory[0].id })
	}

	return (
		<>
			<Button
				variant="outline-secondary"
				className="px-auto"
				onClick={() => setShow(true)}
			>
				Edit Category
			</Button>
			<Modal show={show} onHide={toggle} backdrop="static" centered>
				<Modal.Header closeButton>
					<Modal.Title>Edit Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{deleteBtn ? (
						<Stack gap={2}>
							<h5>
								Do you want to <strong>delete</strong> {'"'}
								{selectCategory[0].name}
								{'"'} Category?
							</h5>
							<h6>
								# All notes in {'"'}
								{selectCategory[0].name}
								{'"'} will be deleted.
							</h6>
							<Stack
								direction="horizontal"
								gap={3}
								className="justify-content-end my-3"
							>
								<Button
									variant="outline-secondary"
									onClick={() => setDeleteBtn(!deleteBtn)}
								>
									Cancel
								</Button>
								<Button variant="danger" onClick={DeleteCategory}>
									Delete
								</Button>
							</Stack>
						</Stack>
					) : editBtn ? (
						<Stack gap={2}>
							<h5>
								Change {'"'} {selectCategory[0].name} {'"'} to:
							</h5>
							<Form>
								<Form.Control
									type="text"
									value={newCategoryName}
									onChange={(e) => setNewCategoryName(e.target.value)}
									placeholder={selectCategory[0].name}
									autoFocus={true}
								/>
							</Form>
							<Stack
								direction="horizontal"
								gap={3}
								className="justify-content-end my-3"
							>
								<Button
									variant="outline-danger"
									onClick={() => setEditBtn(false)}
								>
									Cancel
								</Button>
								<Button variant="primary" onClick={() => EditCategory()}>
									Edit
								</Button>
							</Stack>
						</Stack>
					) : (
						<Stack gap={2}>
							<h5>Select which Category to edit :</h5>
							{errorMsg && selectCategory.length === 0 ? (
								<Alert variant="danger">{errorMsg}</Alert>
							) : null}
							<CategorySelect
								selectCategory={selectCategory}
								setSelectCategory={setSelectCategory}
							/>
							<Stack
								direction="horizontal"
								gap={3}
								className="justify-content-end my-3"
							>
								<Button variant="outline-secondary" onClick={toggle}>
									Cancel
								</Button>
								<Button variant="danger" onClick={() => handleFn(setDeleteBtn)}>
									Delete
								</Button>
								<Button variant="primary" onClick={() => handleFn(setEditBtn)}>
									Edit
								</Button>
							</Stack>
						</Stack>
					)}
				</Modal.Body>
			</Modal>
		</>
	)
}

export default CategoryEditModal
