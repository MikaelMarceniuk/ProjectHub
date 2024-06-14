'use client'

import { SessionProvider as NextSessionProvider } from 'next-auth/react'
import withChildren from '@/@types/withChildren'

const SessionProvider: React.FC<withChildren> = ({ children }) => {
	return <NextSessionProvider>{children}</NextSessionProvider>
}

export default SessionProvider
