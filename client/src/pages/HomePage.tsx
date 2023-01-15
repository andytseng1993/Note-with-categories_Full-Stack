import { Outlet } from 'react-router'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import { Button, ListGroup, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CategoryList from '../components/CategoryList'

const HomePage = () => {
	return (
		<Container fluid={true} className="d-flex flex-row flex-grow-1">
			<Row className="d-flex flex-grow-1">
				<Col xs={3} lg={3} xxl={2} className="bg-light d-flex flex-column p-3">
					<Nav as="ul" className="nav flex-column mb-auto nav-pills">
						<CategoryList />
					</Nav>
				</Col>
				<Col className="d-flex flex-column align-items-stretch">
					<Outlet />
				</Col>
			</Row>
		</Container>
	)
}

export default HomePage