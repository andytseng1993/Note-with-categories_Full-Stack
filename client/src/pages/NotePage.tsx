import { useState } from 'react'
import { Row, Col, Button, Stack, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CategoryNoteList, { Tag } from '../components/CategoryNoteList'
import TagsSelect from '../components/TagsSelect'

const NotePage = () => {
	const [selectTags, setSelectTags] = useState<Tag[]>([])
	return (
		<>
			<Container className="my-4 h-100">
				<Row className="align-items-center mb-2">
					<Col>
						<h1>Notes</h1>
					</Col>
					<Col xs="auto">
						<Stack gap={2} direction="horizontal">
							<Link to="new">
								<Button variant="primary">Create</Button>
							</Link>
							<Link to="/">
								<Button variant="outline-secondary">Edit Tags</Button>
							</Link>
						</Stack>
					</Col>
				</Row>
				<Form className="mb-4">
					<Row>
						<Col>
							<Form.Group controlId="title">
								<Form.Label>Title</Form.Label>
								<Form.Control type="text"></Form.Control>
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
				</Form>
				<CategoryNoteList />
			</Container>
		</>
	)
}
export default NotePage
