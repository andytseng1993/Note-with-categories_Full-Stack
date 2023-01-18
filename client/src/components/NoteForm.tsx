import { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Tag } from './CategoryNoteList'
import TagsSelect from './TagsSelect'

interface NoteFormProps {
	title?: string
	markdown?: string
	tags?: Tag[]
}

const NoteForm = ({ title = '', markdown = '', tags = [] }: NoteFormProps) => {
	const [selectTags, setSelectTags] = useState<Tag[]>(tags)
	const titleRef = useRef<HTMLInputElement>(null)
	const markdownRef = useRef<HTMLTextAreaElement>(null)
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		console.log(titleRef.current?.value)
		console.log(markdownRef.current?.value)
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
