import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { FormEvent, useRef, useState } from 'react'
import {
	Alert,
	Button,
	Col,
	Form,
	Modal,
	Nav,
	Row,
	Stack,
} from 'react-bootstrap'

interface User {
	email: string
	password: string
}

const LoginModal = () => {
	const [show, setShow] = useState(false)
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const [error, setError] = useState('')

	const mutation = useMutation({
		mutationFn: async (userData: User) => {
			const { data } = await axios.post('api/users/login', userData)
			return data
		},
		onError: (err) => {
			setError(err?.response?.data)
		},
		onSuccess: () => {
			toggle()
		},
	})
	const toggle = () => {
		setShow(false)
		setError('')
		emailRef.current!.value = ''
		passwordRef.current!.value = ''
	}
	const handleLogIn = (e: FormEvent) => {
		e.preventDefault()

		const email = emailRef.current!.value
		const password = passwordRef.current!.value
		if (!email || !password) return setError('Please enter all fields.')
		const userData = {
			email,
			password,
		}
		mutation.mutate(userData)
	}

	return (
		<>
			<Nav.Link onClick={() => setShow(true)}>Log in</Nav.Link>
			<Modal show={show} onHide={toggle} centered backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>Log in</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{error ? (
						<Alert variant="danger" className="mx-4 py-2">
							{error}
						</Alert>
					) : null}
					<Form className="m-3" onSubmit={handleLogIn}>
						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm="3" className="ms-3">
								Email
							</Form.Label>
							<Col sm="8">
								<Form.Control
									type="text"
									autoFocus={true}
									ref={emailRef}
									required
								></Form.Control>
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-4">
							<Form.Label column sm="3" className="ms-3">
								Password
							</Form.Label>
							<Col sm="8">
								<Form.Control
									type="password"
									ref={passwordRef}
									required
								></Form.Control>
							</Col>
						</Form.Group>
						<Stack
							direction="horizontal"
							className="justify-content-end"
							gap={2}
						>
							<Button className="px-5" type="submit">
								Log in
							</Button>
						</Stack>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default LoginModal
