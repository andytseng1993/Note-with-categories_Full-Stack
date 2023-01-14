import { Row, Col, Button, Stack, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Notecard from '../components/Notecard'
import NoteList from '../components/NoteList'
import TagsSelect from '../components/TagsSelect'

const NotePage = () => {
	return (
		<>
			<Container className="my-4 h-100">
				<Row className="align-items-center mb-4">
					<Col>
						<h1>Notes</h1>
					</Col>
					<Col xs="auto">
						<Stack gap={2} direction="horizontal">
							<Link to="/new">
								<Button variant="primary">Create</Button>
							</Link>
							<Link to="/">
								<Button variant="outline-secondary">Edit Tags</Button>
							</Link>
						</Stack>
					</Col>
				</Row>
				<Form className="my-4">
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
export default NotePage
