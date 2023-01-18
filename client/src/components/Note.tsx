import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Link } from 'react-router-dom'

const Note = () => {
	return (
		<>
			<Row className="align-items-center m-4 mx-2">
				<Col>
					<h1>Note Tile</h1>
					<Stack
						gap={1}
						direction="horizontal"
						className="justify-content-start align-items-center flex-wrap"
					>
						<Badge>tags</Badge>
						<Badge>tags</Badge>
					</Stack>
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to="edit">
							<Button variant="primary">Edit</Button>
						</Link>
						<Button variant="outline-danger">Delete</Button>
						<Link to="..">
							<Button variant="outline-secondary">Back</Button>
						</Link>
					</Stack>
				</Col>
			</Row>
			<div className="d-flex flex-grow-1 mx-3 mb-5 border rounded">
				<ReactMarkdown className="p-3">{'# Tilte'}</ReactMarkdown>
			</div>
		</>
	)
}

export default Note
