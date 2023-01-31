import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from 'react'

interface Content {
	body: string
	header: string
}
interface ToastsProps {
	toastShow: boolean
	setToastShow: Dispatch<SetStateAction<boolean>>
	toastContent: Content
	setToastContent: Dispatch<SetStateAction<Content>>
}

const UserToasts = createContext<ToastsProps>({} as ToastsProps)

export const UserToastsProvider = ({ children }: PropsWithChildren) => {
	const [toastShow, setToastShow] = useState(false)
	const [toastContent, setToastContent] = useState({
		body: '',
		header: '',
	})
	const value = {
		toastShow,
		setToastShow,
		toastContent,
		setToastContent,
	}
	return <UserToasts.Provider value={value}>{children}</UserToasts.Provider>
}

export const useUserToasts = () => {
	return useContext(UserToasts)
}
