import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
	Badge,
	Button,
	Col,
	OverlayTrigger,
	Row,
	Stack,
	Tooltip,
} from 'react-bootstrap'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { Tag } from './CategoryNoteList'
import NoteDeleteModal from './NoteDeleteModal'
import { BiLock, BiLockOpen } from 'react-icons/bi'
import { useUserAuth } from '../context/UserAuth'

interface NoteType {
	title: string
	body: string
	author: {
		userName: string
	}
	editor?: string
	tags: { id: string; label: string }[]
	categories: {
		id: string
		name: string
	}
	updateAt: string
	createdAt: string
	lock: boolean
}

const Note = () => {
	const { noteId } = useParams()
	const { currentUser } = useUserAuth()
	const navigate = useNavigate()
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

	const handleEdit = () => {
		navigate('edit')
	}

	return (
		<>
			{isLoading ? (
				<h1>Loading...</h1>
			) : isError ? (
				<h2>Something Wrong...</h2>
			) : (
				<>
					<Stack gap={1} className={'mx-4'}>
						<Row className="align-items-center">
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
							</Col>
							<Col xs="auto">
								<Stack gap={2} direction="horizontal">
									<Button
										variant="primary"
										disabled={
											data.lock
												? currentUser.userName! === data.author?.userName ||
												  currentUser.role === 'ADMIN'
													? false
													: true
												: false
										}
										onClick={handleEdit}
									>
										Edit
									</Button>

									<NoteDeleteModal
										author={data.author?.userName}
										title={data.title}
										noteId={noteId!}
									/>
									<Link to="..">
										<Button variant="outline-secondary">Back</Button>
									</Link>
								</Stack>
							</Col>
						</Row>
						<Stack gap={4} direction="horizontal" className="mb-2">
							<OverlayTrigger
								placement="bottom"
								delay={{ show: 250, hide: 400 }}
								overlay={
									<Tooltip id="button-tooltip">
										{data.lock
											? 'This note is protected, only the author or Admin can edit.'
											: 'Everyone can edit this note.'}
									</Tooltip>
								}
							>
								{data.lock ? (
									<strong>
										<BiLock />
									</strong>
								) : (
									<strong>
										<BiLockOpen />
									</strong>
								)}
							</OverlayTrigger>

							<small className=" text-body-tertiary">
								Author: @{data.author?.userName}
							</small>
							<small className="text-body-tertiary">
								Create Time: {dateFormatter.format(Date.parse(data.createdAt))}
							</small>
							{data.editor ? (
								<>
									<small className=" text-body-tertiary">
										Eidtor: @{data.editor}
									</small>
									<small className=" text-body-tertiary">
										Update Time:{' '}
										{dateFormatter.format(Date.parse(data.updateAt))}
									</small>
								</>
							) : null}
						</Stack>
					</Stack>
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
