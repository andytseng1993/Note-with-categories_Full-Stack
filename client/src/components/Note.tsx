import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Link, useParams } from 'react-router-dom'
import { Tag } from './CategoryNoteList'
import NoteDeleteModal from './NoteDeleteModal'

interface NoteType {
	title: string
	body: string
	author: {
		userName: string
	}
	tags: { id: string; label: string }[]
	categories: {
		id: string
		name: string
	}
	updateAt: string
}

const Note = () => {
	const { noteId } = useParams()
	const { data, isLoading, isError } = useQuery({
		queryKey: ['notes', noteId],
		queryFn: async () => {
			const { data } = await axios.get<NoteType>(`/api/notes/${noteId}`)
			return data
		},
	})
	const dateFormatter = new Intl.DateTimeFormat(undefined, {
		dateStyle: 'medium',
		timeStyle: 'short',
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
							<Stack
								gap={1}
								direction="horizontal"
								className="justify-content-start align-items-center flex-wrap"
							>
								{data.tags?.map((tag: Tag) => (
									<h5 key={tag.id} className={'mb-1'}>
										<Badge>{tag.label}</Badge>
									</h5>
								))}
							</Stack>
							<Stack gap={5} direction="horizontal">
								<small className="mb-2 text-body-tertiary">
									Author: @{data.author?.userName}
								</small>
								<small className="mb-2 text-body-tertiary">
									Update Time: {dateFormatter.format(Date.parse(data.updateAt))}
								</small>
							</Stack>
						</Col>
						<Col xs="auto">
							<Stack gap={2} direction="horizontal">
								<Link to="edit">
									<Button variant="primary">Edit</Button>
								</Link>
								<NoteDeleteModal title={data.title} noteId={noteId!} />
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
