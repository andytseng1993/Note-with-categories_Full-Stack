import { useState } from 'react'
import { Row, Col, Button, Stack, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CategoryNoteList, { Tag } from '../components/CategoryNoteList'
import EditTags from '../components/TagsEdit'
import TagsSelect from '../components/TagsSelect'

const NotePage = () => {
	const [selectTags, setSelectTags] = useState<Tag[]>([])
	const [titleFilter, setTitleFilter] = useState('')

	return (
		<>
			<Container className="my-4 h-100">
				<Row className="align-items-center mb-2">
					<Col>
						<h1>Notes</h1>
					</Col>
					<Col xs="auto">
						<Link to="new">
							<Button variant="primary">Create</Button>
						</Link>
					</Col>
				</Row>
				<Form className="mb-4">
					<Row>
						<Col>
							<Form.Group controlId="title">
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									value={titleFilter}
									onChange={(e) => setTitleFilter(e.target.value)}
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
				</Form>
				<CategoryNoteList titleFilter={titleFilter} selectTags={selectTags} />
			</Container>
		</>
	)
}
export default NotePage
