import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import NoteForm, { NoteMutateType } from '../components/NoteForm'

const EditPage = () => {
	const { noteId } = useParams()
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { data, isLoading, isError } = useQuery({
		queryKey: ['notes', noteId],
		queryFn: async () => {
			const { data } = await axios.get(`/api/notes/${noteId}`)
			return data
		},
	})
	const mutation = useMutation({
		mutationFn: (noteUpdate: NoteMutateType): Promise<AxiosResponse> => {
			return axios.put(`/api/notes/${noteId}`, noteUpdate)
		},
		onSuccess: ({ data }) => {
			queryClient.setQueriesData(['notes', noteId], data)
			navigate('..')
		},
	})
	return (
		<>
			<Container className="my-5 px-4 ">
				<h1 className="mb-4">Edit Note</h1>
				{isLoading ? (
					<h3>Loading...</h3>
				) : isError ? (
					<h3>Something Wrong...</h3>
				) : (
					<NoteForm
						mutation={mutation}
						title={data.title}
						markdown={data.body}
						tags={data.tags}
					/>
				)}
			</Container>
		</>
	)
}

export default EditPage