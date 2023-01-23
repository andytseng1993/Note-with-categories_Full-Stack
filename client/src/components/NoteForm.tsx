import {
	useMutation,
	UseMutationOptions,
	UseMutationResult,
} from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { Tag } from './CategoryNoteList'
import TagsSelect from './TagsSelect'

export interface NoteMutateType {
	title: string
	body: string
	authorName: string
	tagIdArray: TagId[]
	categoryId: string
}
interface TagId {
	id: string
}

interface NoteFormProps {
	mutation: UseMutationResult<
		AxiosResponse<any, any>,
		unknown,
		NoteMutateType,
		unknown
	>
	title?: string
	markdown?: string
	tags?: Tag[]
}

const NoteForm = ({
	mutation,
	title = '',
	markdown = '',
	tags = [],
}: NoteFormProps) => {
	const { categoryId } = useParams()
	const [selectTags, setSelectTags] = useState<Tag[]>(tags)
	const titleRef = useRef<HTMLInputElement>(null)
	const markdownRef = useRef<HTMLTextAreaElement>(null)

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		const tagIdArray = selectTags.map((tag) => {
			return { id: tag.id }
		})
		const NewNoteData = {
			title: titleRef.current!.value,
			body: markdownRef.current!.value,
			authorName: 'Andy',
			tagIdArray: tagIdArray,
			categoryId: categoryId!,
		}
		mutation.mutate(NewNoteData)
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row className="mb-3">
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
							<TagsSelect
								selectTags={selectTags}
								setSelectTags={setSelectTags}
							/>
						</Form.Group>
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
