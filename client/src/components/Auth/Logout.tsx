import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { Button, Modal, Nav, Spinner, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useUserToasts } from '../../context/UserToasts'

const Logout = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const [show, setShow] = useState(false)
	const { setToastShow, setToastContent } = useUserToasts()

	const mutation = useMutation({
		mutationFn: async () => {
			await axios.get('/api/auth/logout')
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] })
			navigate('/')
			setToastShow(true)
			setToastContent({
				header: `See you next time :)`,
				body: 'Success Log Out!',
			})
		},
	})
	const logout = () => {
		mutation.mutate()
	}
	const toggle = () => {
		setShow(false)
	}
	return (
		<>
			<Nav.Link onClick={() => setShow(true)}>Log out</Nav.Link>
			<Modal show={show} onHide={toggle} centered>
				<Modal.Header closeButton>
					<Modal.Title>Log out</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{mutation.isLoading ? (
						<Stack
							direction="horizontal"
							gap={3}
							className={'align-items-center'}
						>
							<Spinner animation="border" />
							<h5 className="my-0">Loading...</h5>
						</Stack>
					) : (
						<h5>Do you want to log out?</h5>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={toggle}>
						Close
					</Button>
					<Button onClick={logout}>Log out</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default Logout
