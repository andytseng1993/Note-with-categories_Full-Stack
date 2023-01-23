import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

const AppNavbar = ({ children }: PropsWithChildren) => {
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
						className="justify-content-end"
					>
						<Nav>
							<Link to={'/'} className={'text-decoration-none nav-link'}>
								Register
							</Link>
							<Link to={'/'} className={'text-decoration-none nav-link'}>
								Login
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{children}
		</>
	)
}

export default AppNavbar
