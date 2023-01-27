import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import Select from 'react-select'

interface Option {
	readonly label: string
	readonly value: string
}
interface CategoryData {
	id: string
	name: string
	createdAt: string
	updateAt: string
	_count: {
		notes: number
	}
}
interface SelectCategory {
	name: string
	id: string
}
interface CategorySelectProps {
	selectCategory: SelectCategory[]
	setSelectCategory: Dispatch<SetStateAction<SelectCategory[]>>
}

const CategorySelect = ({
	selectCategory,
	setSelectCategory,
}: CategorySelectProps) => {
	const [options, setOptions] = useState<Option[]>([])
	const { isLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const { data } = await axios.get<CategoryData[]>('/api/categories')
			return data
		},
		onSuccess: (data) => {
			const optionData = data.map((category) => {
				return { label: category.name, value: category.id }
			})
			setOptions(optionData)
		},
	})

	return (
		<Select
			isLoading={isLoading}
			options={options}
			onChange={(newOptions) => {
				if (!newOptions) return setSelectCategory([])
				setSelectCategory([{ name: newOptions?.label!, id: newOptions!.value }])
			}}
			value={selectCategory.map((category) => {
				return { label: category.name, value: category.id }
			})}
		/>
	)
}
export default CategorySelect
