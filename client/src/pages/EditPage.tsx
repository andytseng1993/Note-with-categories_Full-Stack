import { useMutation } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import NoteForm, { NoteMutateType } from '../components/NoteForm'

const EditPage = () => {
	const { categoryId, noteId } = useParams()
	const navigate = useNavigate()
	const mutation = useMutation({
		mutationFn: (noteUpdate: NoteMutateType): Promise<AxiosResponse> => {
			return axios.put(`/api/notes/${noteId}`, noteUpdate)
		},
		onSuccess: () => {
			navigate('..')
		},
	})
	return (
		<>
			<Container className="my-5 px-4 ">
				<h1 className="mb-4">Edit Note</h1>
				<NoteForm mutation={mutation} />
			</Container>
		</>
	)
}

export default EditPage
