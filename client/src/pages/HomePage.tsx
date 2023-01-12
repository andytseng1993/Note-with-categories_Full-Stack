import { Outlet } from "react-router"
import Offcanvas from 'react-bootstrap/Offcanvas'
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const HomePage = () => {
    return (
        <Container fluid={true} className='d-flex flex-row flex-grow-1' >
            <Row className="d-flex flex-grow-1">
                <Col xs={3} lg={3} xxl={2} className='bg-light'>123</Col>
                <Col><Outlet /></Col>
            </Row>
        </Container>
    )
}

export default HomePage
