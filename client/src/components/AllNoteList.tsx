import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import { NoteData } from './CategoryNotList'
import Notecard from './Notecard'
import NoteLoading from './NoteLoading'

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

export default AllNoteList
