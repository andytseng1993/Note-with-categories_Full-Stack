import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TagsSelect from './TagsSelect'

const NoteForm = () => {
	return (
		<Form>
			<Stack gap={4}>
				<Row className="mb-3">
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control type="text" required></Form.Control>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<TagsSelect />
						</Form.Group>
					</Col>
				</Row>
				<Form.Group>
					<Form.Label>Body</Form.Label>
					<Form.Control required as="textarea" rows={15}></Form.Control>
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
