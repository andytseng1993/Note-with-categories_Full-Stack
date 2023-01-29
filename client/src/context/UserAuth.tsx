import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface CurrentUserAuth {
	currentUser: {
		userName: string
	}
}

const UserAuthContext = createContext<CurrentUserAuth>({} as CurrentUserAuth)
export const UserAuthContextProvider = ({ children }: PropsWithChildren) => {
	const [currentUser, setCurrentUser] = useState({ userName: '' })
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
		refetchOnWindowFocus: false,
		retry: false,
		queryKey: ['user'],
		onSuccess: (data) => {
			setCurrentUser(data)
		},
		onError: () => {
			setCurrentUser({ userName: '' })
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
