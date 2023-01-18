import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Notecard from './Notecard'
import NoteLoading from './NoteLoading'

export interface NoteData {
	id: string
	title: string
	body: string
	createdAt: string
	updateAt: string
	tags: Tag[]
}
export interface Notes {
	notes: NoteData[]
}
export interface Tag {
	id: string
	label: string
}

const CategoryNoteList = () => {
	const { categoryId } = useParams()
	const { data, isLoading, isError } = useQuery({
		queryKey: ['notes', { categoryId }],
		queryFn: async () => {
			const { data } = await axios.get<Notes>(`api/categories/${categoryId}`)
			return data.notes
		},
	})

	return (
		<>
			{isLoading ? (
				<Row xs={1} sm={2} lg={3} xl={4} className="g-3 mb-3">
					<NoteLoading />
					<NoteLoading />
				</Row>
			) : isError ? (
				<h3>Something Wrong...</h3>
			) : data.length > 0 ? (
				<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
					{data.map((note) => (
						<Col key={note.id}>
							<Notecard
								id={note.id}
								createdAt={note.createdAt}
								title={note.title}
								tags={note.tags}
							/>
						</Col>
					))}
				</Row>
			) : (
				<h4>No Note in this category!</h4>
			)}
		</>
	)
}

export default CategoryNoteList
