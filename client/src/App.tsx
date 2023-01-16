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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AllNotePage from './pages/AllNotePage'

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<HomePage />}>
				<Route index element={<AllNotePage />} />
				<Route path="/:categoryId">
					<Route index element={<NotePage />} />
					<Route path="new" element={<NewNotePage />} />
				</Route>
				<Route path="/note/:noteId">
					<Route index element={<Note />} />
					<Route path="edit" element={<h1>Edit</h1>} />
				</Route>
				<Route path="*" element={<Navigate to="/" />}></Route>
			</Route>
		)
	)
	const queryClient = new QueryClient()
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AppNavbar>
					<RouterProvider router={router} />
				</AppNavbar>
			</QueryClientProvider>
		</>
	)
}

export default App
