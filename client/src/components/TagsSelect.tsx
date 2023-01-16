import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { Tag } from './CategoryNotList'

interface Option {
	readonly label: string
	readonly value: string
}
const createOption = (label: string) => ({
	label,
	value: label.toLowerCase().replace(/\W/g, ''),
})

const TagsSelect = () => {
	const queryClient = useQueryClient()
	const [options, setOptions] = useState<Option[]>([])
	const [selectTags, setSelectTags] = useState<Tag[]>([])
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
			placeholder="Select Tags or Create Tags"
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
