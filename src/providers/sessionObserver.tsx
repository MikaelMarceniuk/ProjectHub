'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SessionObserver = () => {
	const router = useRouter()
	const { status } = useSession()

	useEffect(() => {
		if (status == 'authenticated') router.push('/dashboard')
		if (status == 'unauthenticated') router.push('/login')
	}, [status])

	return null
}

export default SessionObserver
