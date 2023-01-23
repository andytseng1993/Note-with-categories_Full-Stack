import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Link, useParams } from 'react-router-dom'
import { Tag } from './CategoryNoteList'

const Note = () => {
	const { noteId } = useParams()
	const { data, isLoading, isError } = useQuery({
		queryKey: ['notes', noteId],
		queryFn: async () => {
			const { data } = await axios.get(`/api/notes/${noteId}`)
			return data
		},
	})

	return (
		<>
			{isLoading ? (
				<h1>Loading...</h1>
			) : isError ? (
				<h2>Something Wrong...</h2>
			) : (
				<>
					<Row className="align-items-center m-3 mx-2">
						<Col>
							<h1>{data.title}</h1>
							<p className="fs-6 my-1 text-body-tertiary">
								Author: @{data.author?.userName}
							</p>
							<Stack
								gap={1}
								direction="horizontal"
								className="justify-content-start align-items-center flex-wrap"
							>
								{data.tags?.map((tag: Tag) => (
									<h5 key={tag.id}>
										<Badge>{tag.label}</Badge>
									</h5>
								))}
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
					<div
						className="d-flex flex-grow-1 mx-3 mb-5 border rounded"
						style={{ minHeight: '500px' }}
					>
						<ReactMarkdown className="p-3">{data.body}</ReactMarkdown>
					</div>
				</>
			)}
		</>
	)
}

export default Note
