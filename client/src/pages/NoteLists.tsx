import { Row, Col, Button, Stack, Container, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import Notecard from "../components/Notecard"


const NoteLists = () => {
    return (
        <>
            <Container className="my-4 h-100">
                <Row className="align-items-center mb-4">
                    <Col><h1>Notes</h1></Col>
                    <Col xs='auto'>
                        <Stack gap={2} direction='horizontal'>
                            <Link to='/new'>
                                <Button variant='primary'>Create</Button>
                            </Link>
                            <Link to='/'>
                                <Button variant='outline-secondary'>Edit Tags</Button>
                            </Link>
                        </Stack>
                    </Col>
                </Row>
                <Form className="my-4">
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Tags</Form.Label>
                                <Form.Control></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Row xs={1} sm={2} lg={3} xl={4} className='g-3' >
                    <Col>
                        <Notecard />
                    </Col>
                    <Col>
                        <Notecard />
                    </Col>
                    <Col>
                        <Notecard />
                    </Col>
                    <Col>
                        <Notecard />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default NoteLists