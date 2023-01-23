import { Outlet } from 'react-router'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import { Button, ListGroup, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CategoryList from '../components/CategoryList'
import AppNavbar from '../components/AppNavbar'

const HomePage = () => {
	return (
		<AppNavbar>
			<Container fluid={true} className="d-flex flex-row px-0" id="content">
				<Row className="d-flex flex-grow-1 mx-0">
					<Col
						xs={4}
						lg={3}
						xxl={2}
						className="bg-light d-flex flex-column p-3 overflow-y-auto h-100"
					>
						<Nav as="ul" className="nav flex-column mb-auto nav-pills">
							<CategoryList />
						</Nav>
					</Col>
					<Col className="d-flex flex-column align-items-stretch px-0 overflow-y-auto h-100">
						<Container style={{ maxWidth: '1100px' }}>
							<Outlet />
						</Container>
					</Col>
				</Row>
			</Container>
		</AppNavbar>
	)
}

export default HomePage
