import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { FormEvent, useRef, useState } from 'react'
import {
	Alert,
	Button,
	Col,
	Form,
	InputGroup,
	Modal,
	Nav,
	Row,
	Stack,
} from 'react-bootstrap'

interface NewUser {
	email: string
	password: string
	userName: string
}

const RegisterModal = () => {
	const [show, setShow] = useState(false)
	const emailRef = useRef<HTMLInputElement>(null)
	const userNameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const [error, setError] = useState('')
	const queryClient = useQueryClient()
	const [isInvalid, setIsInvalid] = useState({
		email: false,
		username: false,
	})
	const toggle = () => {
		setShow(false)
		setError('')
		emailRef.current!.value = ''
		userNameRef.current!.value = ''
		passwordRef.current!.value = ''
		setIsInvalid({ email: false, username: false })
	}
	const mutation = useMutation({
		mutationFn: async (newUserData: NewUser) => {
			const { data } = await axios.post('/api/users', newUserData)
			return data
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (!err.response?.data.code && !err.response?.data.target) {
					return setError(JSON.stringify(err?.response?.data))
				}
				if (
					err.response?.data.code === 'P2002' &&
					err.response?.data.target === 'User_email_key'
				) {
					emailRef.current?.focus()
					return setIsInvalid({
						email: true,
						username: false,
					})
				}
				if (
					err.response?.data.code === 'P2002' &&
					err.response?.data.target === 'User_userName_key'
				) {
					userNameRef.current?.focus()
					return setIsInvalid({
						email: false,
						username: true,
					})
				}
			} else {
				setError('Unexpected error')
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['user'])
			toggle()
		},
	})
	const handleRegister = (e: FormEvent) => {
		e.preventDefault()

		const email = emailRef.current!.value
		const userName = userNameRef.current!.value
		const password = passwordRef.current!.value
		if (!email || !password) return setError('Please enter all fields.')
		const newUserData = {
			email,
			userName,
			password,
		}
		mutation.mutate(newUserData)
	}
	return (
		<>
			<Nav.Link onClick={() => setShow(true)}>Register</Nav.Link>
			<Modal show={show} onHide={toggle} centered backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>Register</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{error ? (
						<Alert variant="danger" className="mx-4 py-2">
							{error}
						</Alert>
					) : null}
					<Form className="m-3" onSubmit={handleRegister}>
						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm="3" className="ms-3">
								Email
							</Form.Label>
							<Col sm="8">
								<Form.Control
									type="text"
									autoFocus={true}
									ref={emailRef}
									placeholder="email@example.com"
									isInvalid={isInvalid.email}
								></Form.Control>
								<Form.Control.Feedback type="invalid">
									That email has already existed.
								</Form.Control.Feedback>
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm="3" className="ms-3">
								UserName
							</Form.Label>
							<Col sm="8">
								<InputGroup className="mb-2" hasValidation>
									<InputGroup.Text>@</InputGroup.Text>
									<Form.Control
										placeholder="Username"
										ref={userNameRef}
										isInvalid={isInvalid.username}
									/>
									<Form.Control.Feedback type="invalid">
										That username has been taken. Please choose another.
									</Form.Control.Feedback>
								</InputGroup>
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
									placeholder="Password"
								></Form.Control>
							</Col>
						</Form.Group>
						<Stack
							direction="horizontal"
							className="justify-content-end"
							gap={2}
						>
							<Button className="px-5" type="submit">
								Register
							</Button>
						</Stack>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default RegisterModal
