import 'bootstrap/dist/css/bootstrap.min.css'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
	RouterProvider,
	Routes,
} from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import NewNotePage from './pages/NewNotePage'
import HomePage from './pages/HomePage'
import NotePage from './pages/NotePage'
import Note from './components/Note'

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<HomePage />}>
				<Route index element={<NotePage />} />
				<Route path="/new" element={<NewNotePage />} />
				<Route path="/:categoryId">
					<Route index element={<h1>Show Category Notes</h1>} />
				</Route>
				<Route path="/note/:noteId">
					<Route index element={<Note />} />
					<Route path="edit" element={<h1>Edit</h1>} />
				</Route>
				<Route path="*" element={<Navigate to="/" />}></Route>
			</Route>
		)
	)
	return (
		<>
			<AppNavbar>
				<RouterProvider router={router} />
			</AppNavbar>
		</>
	)
}

export default App
