import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useCallback, useMemo } from 'react'
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
interface CategoryNoteListProp {
	titleFilter: string
	selectTags: Tag[]
}
const CategoryNoteList = ({
	titleFilter = '',
	selectTags = [],
}: CategoryNoteListProp) => {
	const { categoryId } = useParams()
	const { data, isLoading, isError } = useQuery({
		queryKey: ['notes', { categoryId }],
		queryFn: async () => {
			const { data } = await axios.get<Notes>(`api/categories/${categoryId}`)
			return data.notes
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
			{isLoading ? (
				<Row xs={1} sm={2} lg={3} xl={4} className="g-3 mb-3">
					<NoteLoading />
					<NoteLoading />
				</Row>
			) : isError ? (
				<h3>Something Wrong...</h3>
			) : data.length > 0 ? (
				<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
					{dataFilter!.length > 0 ? (
						dataFilter!.map((note) => (
							<Col key={note.id}>
								<Notecard
									category={{ id: categoryId! }}
									id={note.id}
									title={note.title}
									tags={note.tags}
								/>
							</Col>
						))
					) : (
						<h4>Nothing on this filter</h4>
					)}
				</Row>
			) : (
				<h4>No Note in this category!</h4>
			)}
		</>
	)
}

export default CategoryNoteList
