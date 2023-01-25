import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import Select from 'react-select'
import { Tag } from './CategoryNoteList'
interface Option {
	readonly label: string
	readonly value: string
}
interface Props {
	selectTags: Tag[]
	setSelectTags: Dispatch<SetStateAction<Tag[]>>
}

const TagsSelect = ({ selectTags = [], setSelectTags }: Props) => {
	const [options, setOptions] = useState<Option[]>([])
	const { data } = useQuery({
		queryKey: ['tags'],
		queryFn: async () => {
			const { data } = await axios.get<Tag[]>('/api/tags')
			return data
		},
		onSuccess: (data) => {
			const options = data.map((tag) => {
				return { label: tag.label, value: tag.id }
			})
			setOptions(options)
		},
		refetchOnWindowFocus: false,
	})
	return (
		<Select
			isMulti
			placeholder="Select Tags"
			options={options}
			onChange={(newOptions) => {
				setSelectTags(
					newOptions.map((option) => {
						return { label: option.label, id: option.value }
					})
				)
			}}
			value={selectTags.map((tag) => {
				return { label: tag.label, value: tag.id }
			})}
		/>
	)
}
export default TagsSelect
