import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { PropsWithChildren, useState } from 'react'
import { Link } from 'react-router-dom'
import LoginModal from './Auth/LoginModal'
import RegisterModal from './Auth/RegisterModal'
import Logout from './Auth/Logout'
import { useUserAuth } from '../context/UserAuth'

interface AppNavbarProps extends PropsWithChildren {
	currentUser: {
		userName: string | null
		role: string | null
	}
}

const AppNavbar = ({ children, currentUser }: AppNavbarProps) => {
	const [show, setShow] = useState({
		showLoginModal: false,
		showRegisterModal: false,
	})

	return (
		<>
			<Navbar expand="md" bg="dark" variant="dark">
				<Container>
					<Navbar.Brand>
						<Link
							to={'/'}
							className={`text-reset text-decoration-none nav-link`}
						>
							NOTES
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse
						id="basic-navbar-nav"
						className="justify-content-end align-items-center"
					>
						<Nav className="text-light">
							{currentUser.userName === null ? null : currentUser.userName ===
							  '' ? (
								<>
									<Nav.Item className="me-4">
										<LoginModal show={show} setShow={setShow} />
									</Nav.Item>
									<Nav.Item>
										<RegisterModal show={show} setShow={setShow} />
									</Nav.Item>
								</>
							) : (
								<>
									{currentUser.role === 'ADMIN' ? (
										<Nav.Item className="p-2 mx-2 text-light">
											Welcome <strong>{currentUser.userName} : ADMIN</strong>
										</Nav.Item>
									) : (
										<Nav.Item className="p-2 mx-2 text-light">
											Welcome <strong>{currentUser.userName}</strong>
										</Nav.Item>
									)}
									<Nav.Item>
										<Logout />
									</Nav.Item>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{children}
		</>
	)
}

export default AppNavbar
