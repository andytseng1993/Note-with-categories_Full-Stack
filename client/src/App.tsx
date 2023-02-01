import 'bootstrap/dist/css/bootstrap.css'
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
import EditPage from './pages/EditPage'
import { UserAuthContextProvider } from './context/UserAuth'
import { UserToastsProvider } from './context/UserToasts'
import ProtectedRouter from './components/ProtectedRouter'

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<HomePage />}>
				<Route index element={<AllNotePage />} />
				<Route path="/:categoryId">
					<Route index element={<NotePage />} />
					<Route element={<ProtectedRouter />}>
						<Route path="new" element={<NewNotePage />} />
						<Route path="note/:noteId">
							<Route index element={<Note />} />
							<Route path="edit" element={<EditPage />} />
						</Route>
					</Route>
				</Route>
				{/* <Route path="*" element={<Navigate to="/" />}></Route> */}
			</Route>
		)
	)
	const queryClient = new QueryClient()
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<UserToastsProvider>
					<UserAuthContextProvider>
						<RouterProvider router={router} />
					</UserAuthContextProvider>
				</UserToastsProvider>
			</QueryClientProvider>
		</>
	)
}

export default App
