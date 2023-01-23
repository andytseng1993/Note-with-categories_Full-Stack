import { useMutation } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import NoteForm from '../components/NoteForm'

interface NoteUpdateType {
	title: string
	body: string
	authorName: string
	tagIdArray: TagId[]
}
interface TagId {
	id: string
}
const NewNotePage = () => {
	const navigate = useNavigate()
	const mutation = useMutation({
		mutationFn: (newNote: NoteUpdateType): Promise<AxiosResponse> => {
			return axios.post('/api/notes', newNote)
		},
		onSuccess: () => {
			navigate('..')
		},
	})
	return (
		<>
			<Container className="my-5 px-4 ">
				<h1 className="mb-4">New Note</h1>
				<NoteForm mutation={mutation} />
			</Container>
		</>
	)
}

export default NewNotePage
