import { Card, Col, Placeholder } from 'react-bootstrap'

const NoteLoading = () => {
	return (
		<>
			<Col>
				<Card className="h-100">
					<Card.Body className="d-felx justify-content-center align-items-center">
						<Placeholder
							as={Card.Title}
							animation="glow"
							style={{
								display: 'flex',
								justifyContent: 'center',
								height: '27px',
								margin: '20px 5px',
							}}
						>
							<Placeholder xs={6} size="lg" style={{ marginRight: '3px' }} />
							<Placeholder xs={4} size="lg" />
						</Placeholder>
						<div className="d-flex justify-content-center">
							<Placeholder.Button
								animation="wave"
								variant="primary"
								size="lg"
								xs={3}
								style={{ marginRight: '5px' }}
							/>
							<Placeholder.Button
								animation="wave"
								variant="primary"
								size="lg"
								xs={3}
							/>
						</div>
					</Card.Body>
				</Card>
			</Col>
		</>
	)
}

export default NoteLoading
