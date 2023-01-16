import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button, Nav, Placeholder } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import CategoryModal from './CategoryModal'

interface CategoryData {
	id: string
	name: string
	createdAt: string
	updateAt: string
	_count: {
		notes: number
	}
}

const CategoryList = () => {
	const params = useParams()
	const { isLoading, data, isError } = useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const { data } = await axios.get<CategoryData[]>('/api/categories')
			return data
		},
	})

	return (
		<>
			<Nav.Item as="li" className="d-flex flex-column justify-content-center">
				<CategoryModal />
			</Nav.Item>
			<hr className="mt-3" />
			<Nav.Item as="li">
				<Link
					to={`/`}
					className={`text-reset text-decoration-none nav-link my-1 ${
						!params.categoryId ? 'active' : ''
					}`}
				>
					All Notes
				</Link>
			</Nav.Item>
			{isLoading ? (
				<>
					<Placeholder animation="glow" style={{ marginBottom: '10px' }}>
						<Placeholder
							xs={10}
							style={{ height: '32px', borderRadius: '5px' }}
						/>
					</Placeholder>
					<Placeholder animation="glow" style={{ marginBottom: '10px' }}>
						<Placeholder
							xs={7}
							style={{ height: '32px', borderRadius: '5px' }}
						/>
					</Placeholder>
				</>
			) : isError ? (
				<h3>Sometihing was wrong...</h3>
			) : (
				<>
					{data.map((category) => (
						<Nav.Item key={category.id} as="li">
							<Link
								to={`/${category.id}`}
								className={`text-reset text-decoration-none nav-link my-1 ${
									params.categoryId === category.id ? 'active' : ''
								}`}
							>
								{category.name}
							</Link>
						</Nav.Item>
					))}
				</>
			)}
		</>
	)
}

export default CategoryList
