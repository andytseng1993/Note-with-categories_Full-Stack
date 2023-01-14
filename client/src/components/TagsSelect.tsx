import { useState } from 'react'
import CreatableSelect from 'react-select/creatable'

interface Option {
	readonly label: string
	readonly value: string
}
const createOption = (label: string) => ({
	label,
	value: label.toLowerCase().replace(/\W/g, ''),
})
const defaultOptions = [
	createOption('One'),
	createOption('Two'),
	createOption('Three'),
]
const TagsSelect = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [options, setOptions] = useState(defaultOptions)
	const [value, setValue] = useState<readonly Option[]>([])

	const handleCreate = (inputValue: string) => {
		setIsLoading(true)
		setTimeout(() => {
			const newOption = createOption(inputValue)
			setIsLoading(false)
			setOptions((prev) => [...prev, newOption])
			setValue((prev) => [...prev, newOption])
		}, 1000)
	}
	const onChange = (option: readonly Option[]) => {
		console.log(option)
	}
	return (
		<CreatableSelect
			isMulti
			isClearable
			isDisabled={isLoading}
			isLoading={isLoading}
			onChange={(newValue) => setValue(newValue)}
			onCreateOption={handleCreate}
			options={options}
			value={value}
		/>
	)
}

export default TagsSelect
