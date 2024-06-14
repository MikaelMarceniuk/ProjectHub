'use client'

import withChildren from '@/@types/withChildren'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
	user: UserType
	logIn: (user: noAccountUser) => void
	logOut: () => void
}

const UserContext = createContext<UserContextType>({} as UserContextType)

export const useUserContext = () => useContext(UserContext)

type noAccountUser = {
	type: 'NO_ACCOUNT'
	username: string
}

type UserType = noAccountUser | undefined

const UserProvider: React.FC<withChildren> = ({ children }) => {
	const router = useRouter()
	const [user, setUser] = useState<UserType>(undefined)

	useEffect(() => {
		const appLocaldata = localStorage.getItem('@project-hub/v1.0')
		if (appLocaldata == null) return

		const { type, username } = JSON.parse(appLocaldata)
		setUser({ type, username })
	}, [])

	const logIn = (user: noAccountUser) => {
		if (user.type == 'NO_ACCOUNT') {
			localStorage.clear()
			localStorage.setItem(
				'@project-hub/v1.0',
				JSON.stringify({ ...user, projects: [] }),
			)
			setUser(user)
		}

		router.push('/dashboard')
	}

	const logOut = () => {
		localStorage.clear()
		setUser(undefined)
		router.push('/login')
	}

	return (
		<UserContext.Provider
			value={{
				user,
				logIn,
				logOut,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
