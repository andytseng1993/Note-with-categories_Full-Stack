import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import Notecard from './Notecard'

export interface Note {
	id: string
	title: string
	createdAt: string
	tags: Tag[]
}
interface Tag {
	id: string
	name: string
}

const NoteList = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['notes'],
		queryFn: async () => {
			const { data } = await axios.get<Note[]>('api/notes')
			return data
		},
	})
	console.log(data)

	return (
		<>
			<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
				{isLoading ? (
					<h1>Loading...</h1>
				) : isError ? (
					<h3>Something Wrong...</h3>
				) : (
					data.map((note) => (
						<Col key={note.id}>
							<Notecard
								id={note.id}
								createdAt={note.createdAt}
								title={note.title}
								tags={note.tags}
							/>
						</Col>
					))
				)}
			</Row>
		</>
	)
}

export default NoteList
