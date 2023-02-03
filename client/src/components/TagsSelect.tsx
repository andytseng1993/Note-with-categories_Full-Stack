import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { Tag } from './CategoryNoteList'
interface Option {
	readonly label: string
	readonly value: string
}
interface Props {
	selectTags: Tag[]
	setSelectTags: Dispatch<SetStateAction<Tag[]>>
	isMulti?: boolean
}

const TagsSelect = ({
	selectTags = [],
	setSelectTags,
	isMulti = true,
}: Props) => {
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
			isMulti={isMulti}
			placeholder="Select Tags"
			options={options}
			onChange={(newOptions) => {
				if (Array.isArray(newOptions)) {
					setSelectTags(
						newOptions?.map((option: Option) => {
							return { label: option.label, id: option.value }
						})
					)
				} else {
					const newOption = newOptions as { label: string; value: string }
					setSelectTags([{ label: newOption?.label, id: newOption!.value }])
				}
			}}
			value={selectTags.map((tag) => {
				return { label: tag.label, value: tag.id }
			})}
		/>
	)
}
export default TagsSelect
