import { Outlet } from 'react-router'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import { Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomePage = () => {
	return (
		<Container fluid={true} className="d-flex flex-row flex-grow-1">
			<Row className="d-flex flex-grow-1">
				<Col xs={3} lg={3} xxl={2} className="bg-light d-flex flex-column p-3">
					<Stack gap={3} className="nav flex-column mb-auto">
						<Link to="/new">
							<Button variant="primary">+add Category</Button>
						</Link>
						<hr className="mt-1" />
						<Link to="/1" className="text-reset text-decoration-none">
							{' '}
							First
						</Link>
						<Link to="/1" className="text-reset text-decoration-none">
							{' '}
							Second item
						</Link>
						<Link to="/1" className="text-reset text-decoration-none">
							{' '}
							Third item
						</Link>
					</Stack>
				</Col>
				<Col className="d-flex flex-column align-items-stretch">
					<Outlet />
				</Col>
			</Row>
		</Container>
	)
}

export default HomePage
