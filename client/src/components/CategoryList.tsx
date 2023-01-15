import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button, Nav } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

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
			const { data } = await axios.get<CategoryData[]>('api/categories')
			return data
		},
	})

	return (
		<>
			{isLoading ? (
				<h1>Loading</h1>
			) : isError ? (
				<h3>Sometihing was wrong...</h3>
			) : (
				<>
					<Nav.Item as="li">
						<Link
							to="/new"
							className="d-flex flex-column justify-content-center "
						>
							<Button variant="primary" className="px-auto">
								+ Add Category
							</Button>
						</Link>
					</Nav.Item>
					<hr className="mt-1" />
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
