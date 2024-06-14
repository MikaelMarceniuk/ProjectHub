import db from '@/db'
import { UserSchema } from '@/db/schema'
import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import GitHubProvider from 'next-auth/providers/github'

// TODO Solve as string problem

const handler = NextAuth({
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
	],
	pages: {
		signIn: '/login',
		error: '/login', // Error code passed in query string as ?error=
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
				await db.insert(UserSchema).values({
					username: user.name,
					email: user.email,
					image: user.image,
					providerId: account?.type,
					providerName: account?.provider,
				})

				return true
			} catch (e) {
				console.log('SignIn/Error: ', e)
				return false
			}
		},
	},
})

export { handler as GET, handler as POST }
