import {
	useMutation,
	UseMutationOptions,
	UseMutationResult,
} from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { FormEvent, useRef, useState } from 'react'
import {
	Button,
	Col,
	Form,
	OverlayTrigger,
	Row,
	Stack,
	Tooltip,
} from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuth'
import { Tag } from './CategoryNoteList'
import TagsCreatableSelect from './TagsCreatableSelect'

interface NoteFormProps {
	mutation: UseMutationResult<AxiosResponse<any, any>, unknown, any, unknown>
	title?: string
	markdown?: string
	tags?: Tag[]
	lock?: boolean
	author?: string
}

const NoteForm = ({
	mutation,
	title = '',
	markdown = '',
	lock = false,
	tags = [],
	author = '',
}: NoteFormProps) => {
	const { categoryId } = useParams()
	const [selectTags, setSelectTags] = useState<Tag[]>(tags)
	const titleRef = useRef<HTMLInputElement>(null)
	const markdownRef = useRef<HTMLTextAreaElement>(null)
	const [protect, setProtect] = useState(lock)
	const { currentUser } = useUserAuth()

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		const tagIdArray = selectTags.map((tag) => {
			return { id: tag.id }
		})
		const NewNoteData = {
			title: titleRef.current!.value,
			body: markdownRef.current!.value,
			authorName: currentUser.userName,
			editor: currentUser.userName,
			tagIdArray: tagIdArray,
			categoryId: categoryId!,
			lock: protect,
		}
		mutation.mutate(NewNoteData)
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row className="">
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								required
								defaultValue={title}
								ref={titleRef}
							></Form.Control>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<TagsCreatableSelect
								selectTags={selectTags}
								setSelectTags={setSelectTags}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col>
						<OverlayTrigger
							placement="bottom"
							delay={{ show: 250, hide: 400 }}
							overlay={
								<Tooltip id="button-tooltip">
									{author === currentUser.userName ||
									currentUser.role === 'ADMIN' ||
									author === ''
										? 'If check this, only the author or Admin can edit.'
										: 'Only author and Adimin can change protection.'}
								</Tooltip>
							}
						>
							{
								<div className="d-inline-block">
									<Form.Check
										type="checkbox"
										label="Protect this note"
										id="protectCheck"
										defaultChecked={lock}
										onChange={(e) => setProtect(e.target.checked)}
										disabled={
											!(
												author === currentUser.userName ||
												currentUser.role === 'ADMIN' ||
												author === ''
											)
										}
									/>
								</div>
							}
						</OverlayTrigger>
					</Col>
				</Row>

				<Form.Group>
					<Form.Label>Body</Form.Label>
					<Form.Control
						required
						as="textarea"
						rows={15}
						defaultValue={markdown}
						ref={markdownRef}
					></Form.Control>
				</Form.Group>
				<Stack direction="horizontal" gap={4} className="justify-content-end">
					<Link to="..">
						<Button type="button" variant="outline-secondary">
							Cancel
						</Button>
					</Link>
					<Button type="submit" variant="primary">
						Save
					</Button>
				</Stack>
			</Stack>
		</Form>
	)
}

export default NoteForm
