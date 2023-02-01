import { PropsWithChildren } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuth'
import { useUserToasts } from '../context/UserToasts'

const ProtectedRouter = ({ children }: PropsWithChildren) => {
	const { currentUser } = useUserAuth()
	const { setToastShow, setToastContent } = useUserToasts()
	if (currentUser.userName === '') {
		setToastShow(true)
		setToastContent({ header: 'Please log in!', body: 'Member only' })
		return <Navigate to={'.'}></Navigate>
	}
	return <>{children ? children : <Outlet />}</>
}

export default ProtectedRouter
