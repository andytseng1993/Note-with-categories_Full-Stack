import { Badge, Card, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Note } from './NoteList'

const Notecard = ({ id, title, createdAt, tags }: Note) => {
	return (
		<Card
			as={Link}
			to={`/note/${id}`}
			className={'text-reset text-decoration-none h-100'}
		>
			<Card.Body>
				<Stack
					gap={2}
					className="align-items-center justify-content-center h-100"
				>
					<span className="d-flex justify-content-center align-items-center my-2 fs-3 w-75">
						{title}
					</span>
					<Stack
						gap={1}
						direction="horizontal"
						className="justify-content-center align-items-center flex-wrap"
					>
						{tags.length > 0
							? tags.map((tag) => (
									<Badge key={tag.id} className="text-truncate fs-7">
										{tag.name}
									</Badge>
							  ))
							: null}
					</Stack>
				</Stack>
			</Card.Body>
		</Card>
	)
}

export default Notecard
