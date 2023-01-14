import { Container } from 'react-bootstrap'
import NoteForm from '../components/NoteForm'

const NewNotePage = () => {
	return (
		<>
			<Container className="my-4">
				<h1 className="mb-4">New Note</h1>
				<NoteForm />
			</Container>
		</>
	)
}

export default NewNotePage
