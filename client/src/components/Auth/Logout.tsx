import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Nav } from 'react-bootstrap'

const Logout = () => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: async () => {
			await axios.get('/api/auth/logout')
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] })
		},
	})
	const logout = () => {
		mutation.mutate()
	}
	return <Nav.Link onClick={logout}>Log out</Nav.Link>
}

export default Logout
