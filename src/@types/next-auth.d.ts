import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			providerId: string
		} & DefaultSession['user']
	}
}
