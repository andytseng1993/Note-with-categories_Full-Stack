import { Col, Row } from 'react-bootstrap'
import Notecard from './Notecard'

const NoteList = () => {
	return (
		<>
			<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
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
		</>
	)
}

export default NoteList
