import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface CurrentUserAuth {
	currentUser: UserName
}
interface UserName {
	userName: string | null
	role: string | null
}

const UserAuthContext = createContext<CurrentUserAuth>({} as CurrentUserAuth)
export const UserAuthContextProvider = ({ children }: PropsWithChildren) => {
	const [currentUser, setCurrentUser] = useState<UserName>({
		userName: null,
		role: null,
	})
	const { data } = useQuery({
		queryFn: async () => {
			const { data } = await axios.get('/api/auth/user', {
				withCredentials: true,
				headers: {
					'content-Type': 'application/json',
				},
			})
			return data
		},
		retry: false,
		queryKey: ['user'],
		onSuccess: (data) => {
			setCurrentUser(data)
		},
		onError: (err) => {
			setCurrentUser({ userName: '', role: '' })
		},
	})

	const value = {
		currentUser,
	}
	return (
		<UserAuthContext.Provider value={value}>
			{children}
		</UserAuthContext.Provider>
	)
}

export const useUserAuth = () => {
	return useContext(UserAuthContext)
}
