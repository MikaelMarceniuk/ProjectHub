'use client'

import ReactAvatar from 'react-avatar'
import { useUserContext } from '@/providers/userProvider'

const Avatar = () => {
	const { user } = useUserContext()

	if (user?.type == 'NO_ACCOUNT') {
		return <ReactAvatar name={user.username} size='40' maxInitials={2} round />
	}
}

export default Avatar
