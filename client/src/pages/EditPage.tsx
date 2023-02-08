import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import NoteForm from '../components/NoteForm'
import { useUserAuth } from '../context/UserAuth'

export interface NoteMutateType {
	title: string
	body: string
	editor?: string
	tagIdArray: TagId[]
	categoryId: string
}
interface TagId {
	id: string
}

const EditPage = () => {
	const { noteId } = useParams()
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { currentUser } = useUserAuth()

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

	useEffect(() => {
		if (!data) return
		if (!currentUser) return
		if (
			data.lock &&
			currentUser.role !== 'ADMIN' &&
			currentUser.userName !== data.author.userName
		) {
			navigate('..')
		}
	}, [data, currentUser.userName])

	return (
		<>
			<Container className="my-3 px-4 ">
				<h1 className="mb-3">Edit Note</h1>
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
						lock={data.lock}
						author={data.author?.userName}
					/>
				)}
			</Container>
		</>
	)
}

export default EditPage
