import { useState } from 'react'
import { Row, Col, Button, Stack, Container, Form } from 'react-bootstrap'
import AllNoteList from '../components/AllNoteList'
import { Tag } from '../components/CategoryNoteList'
import TagsEdit from '../components/TagsEdit'
import TagsSelect from '../components/TagsSelect'

const AllNotePage = () => {
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
						<TagsEdit />
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
				<AllNoteList selectTags={selectTags} titleFilter={titleFilter} />
			</Container>
		</>
	)
}
export default AllNotePage
