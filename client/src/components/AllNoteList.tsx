import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import { Tag } from './CategoryNoteList'
import Notecard from './Notecard'
import NoteLoading from './NoteLoading'

export interface NoteData {
	id: string
	title: string
	body: string
	createdAt: string
	tags: Tag[]
	categories: {
		id: string
	}
}
const AllNoteList = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['notes'],
		queryFn: async () => {
			const { data } = await axios.get<NoteData[]>('api/notes')
			return data
		},
	})

	return (
		<>
			<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
				{isLoading ? (
					<>
						<NoteLoading />
						<NoteLoading />
					</>
				) : isError ? (
					<h3>Something Wrong...</h3>
				) : (
					data.map((note) => (
						<Col key={note.id}>
							<Notecard
								id={note.id}
								category={note.categories}
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

export default AllNoteList
