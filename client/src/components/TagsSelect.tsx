import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
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
	const queryClient = useQueryClient()
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

	const mutation = useMutation({
		mutationFn: (newTag: object): Promise<AxiosResponse> => {
			return axios.post('/api/tags', newTag)
		},
		onSuccess: ({ data }) => {
			queryClient.invalidateQueries({ queryKey: ['tags'] })
			setSelectTags((prev) => [...prev, ...[data]])
		},
	})

	const handleCreate = (inputValue: string) => {
		mutation.mutate({ label: inputValue })
	}
	return (
		<CreatableSelect
			isMulti
			placeholder="Select Tags or Type Tag"
			isClearable
			isDisabled={mutation.isLoading}
			isLoading={mutation.isLoading}
			onChange={(newOptions) => {
				setSelectTags(
					newOptions.map((option) => {
						return { label: option.label, id: option.value }
					})
				)
			}}
			onCreateOption={handleCreate}
			options={options}
			value={selectTags.map((tag) => {
				return { label: tag.label, value: tag.id }
			})}
		/>
	)
}

export default TagsSelect
