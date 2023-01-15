import { Row, Col, Button, Stack, Container, Form } from 'react-bootstrap'
import NoteList from '../components/NoteList'
import TagsSelect from '../components/TagsSelect'

const AllNotePage = () => {
	return (
		<>
			<Container className="my-4 h-100">
				<Row className="align-items-center mb-2">
					<Col>
						<h1>Notes</h1>
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
								<TagsSelect />
							</Form.Group>
						</Col>
					</Row>
				</Form>
				<NoteList />
			</Container>
		</>
	)
}
export default AllNotePage
