import createUserApi from '@/api/createUser'
import getUserByProviderId from '@/api/getUserByProviderId'
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
			// TODO Solve the error
			// @ts-ignore
			const dbUser = await getUserByProviderId(account?.providerAccountId)

			if (!dbUser.success) return false
			if (dbUser.data?.length == 1) return true

			await createUserApi({
				username: user.name!,
				email: user.email!,
				image: user.image!,
				providerId: account?.providerAccountId!,
				providerName: account?.provider!,
			})

			return true
		},
		async jwt({ token, account, profile }) {
			// TODO Solve the error
			// @ts-ignore
			const dbUser = await getUserByProviderId(token.sub)
			// TODO Solve the error
			// @ts-ignore
			if (dbUser.success && dbUser.data?.length > 0) {
				// TODO Solve the error
				// @ts-ignore
				token.userId = dbUser.data[0].id
			}

			return token
		},
		async session({ session, token }) {
			// TODO Solve the error
			// @ts-ignore
			session.user.providerId = token.sub
			// TODO Solve the error
			// @ts-ignore
			session.user.id = token.userId

			return session
		},
	},
})

export { handler as GET, handler as POST }
