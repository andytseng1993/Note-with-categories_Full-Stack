import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { Alert, Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap'
import { Tag } from './CategoryNoteList'
import TagsSelect from './TagsSelect'

const TagsEdit = () => {
	const [selectTags, setSelectTags] = useState<Tag[]>([])
	const [show, setShow] = useState(false)
	const [deleteBtn, setDeleteBtn] = useState(false)
	const [editBtn, setEditBtn] = useState(false)
	const [errorMsg, setErrorMsg] = useState('')
	const [newTagName, setNewTagName] = useState('')
	const queryClient = useQueryClient()

	const mutationDelete = useMutation({
		mutationFn: (id: string) => {
			return axios.delete(`api/tags/${id}`)
		},
		onSuccess: () => {
			toggle()
			queryClient.invalidateQueries({ queryKey: ['notes'] })
		},
	})
	const mutationEdit = useMutation({
		mutationFn: async (editTag: Tag) => {
			const { data } = await axios.put(`api/tags/${editTag.id}`, {
				label: editTag!.label,
			})
			return data
		},
		onSuccess: () => {
			toggle()
			queryClient.invalidateQueries({ queryKey: ['notes'] })
		},
	})
	const toggle = () => {
		setShow(false)
		setDeleteBtn(false)
		setEditBtn(false)
		setErrorMsg('')
		setNewTagName('')
		setSelectTags([])
	}
	const handleDelete = () => {
		if (selectTags.length === 0) return setErrorMsg('Please select one tag.')
		setDeleteBtn(true)
	}
	const handleEdit = () => {
		if (selectTags.length === 0) return setErrorMsg('Please select one tag.')
		setEditBtn(true)
	}
	const DeleteTag = () => {
		if (selectTags.length === 0) return
		mutationDelete.mutate(selectTags[0].id)
	}
	const EditTag = (newTagName: string) => {
		if (selectTags.length === 0 || newTagName === '') return
		mutationEdit.mutate({ id: selectTags[0].id, label: newTagName })
	}
	return (
		<>
			<Button variant="outline-secondary" onClick={() => setShow(true)}>
				Edit Tags
			</Button>
			<Modal show={show} onHide={toggle} backdrop="static" centered>
				<Modal.Header closeButton>
					<Modal.Title>{!deleteBtn ? 'Edit Tags' : 'Delete Tag'}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{deleteBtn ? (
						<Stack gap={2}>
							<h5>
								Do you want to <strong>delete</strong> {'"'}
								{selectTags[0].label}
								{'"'} Tag?
							</h5>
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
								<Button variant="danger" onClick={DeleteTag}>
									Delete
								</Button>
							</Stack>
						</Stack>
					) : editBtn ? (
						<Stack gap={2}>
							<h5>
								Change {'"'} {selectTags[0].label} {'"'} to:
							</h5>
							<Form>
								<Form.Control
									type="text"
									value={newTagName}
									onChange={(e) => setNewTagName(e.target.value)}
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
								<Button variant="primary" onClick={() => EditTag(newTagName)}>
									Edit
								</Button>
							</Stack>
						</Stack>
					) : (
						<Stack gap={2}>
							<h5>Select which Tag to edit :</h5>
							{errorMsg && selectTags.length === 0 ? (
								<Alert variant="danger">{errorMsg}</Alert>
							) : null}
							<TagsSelect
								isMulti={false}
								selectTags={selectTags}
								setSelectTags={setSelectTags}
							></TagsSelect>
							<Stack
								direction="horizontal"
								gap={3}
								className="justify-content-end my-3"
							>
								<Button variant="outline-secondary" onClick={toggle}>
									Cancel
								</Button>
								<Button variant="danger" onClick={handleDelete}>
									Delete
								</Button>
								<Button variant="primary" onClick={handleEdit}>
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

export default TagsEdit
