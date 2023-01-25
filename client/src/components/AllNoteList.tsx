import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useMemo } from 'react'
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
interface CategoryNoteListProp {
	titleFilter: string
	selectTags: Tag[]
}
const AllNoteList = ({
	titleFilter = '',
	selectTags = [],
}: CategoryNoteListProp) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['notes'],
		queryFn: async () => {
			const { data } = await axios.get<NoteData[]>('api/notes')
			return data
		},
	})
	const dataFilter = useMemo(() => {
		return data?.filter((note) => {
			return (
				(titleFilter === '' ||
					note.title
						.toLocaleLowerCase()
						.includes(titleFilter.toLocaleLowerCase())) &&
				(selectTags.length === 0 ||
					selectTags.every((tag) =>
						note.tags.some((noteTag) => noteTag.id === tag.id)
					))
			)
		})
	}, [data, titleFilter, selectTags])
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
				) : data.length > 0 ? (
					<>
						{dataFilter!.length > 0 ? (
							dataFilter!.map((note) => (
								<Col key={note.id}>
									<Notecard
										category={note.categories}
										id={note.id}
										title={note.title}
										tags={note.tags}
									/>
								</Col>
							))
						) : (
							<h4>Nothing on this filter</h4>
						)}
					</>
				) : (
					<h4>No Note in this category!</h4>
				)}
			</Row>
		</>
	)
}

export default AllNoteList
