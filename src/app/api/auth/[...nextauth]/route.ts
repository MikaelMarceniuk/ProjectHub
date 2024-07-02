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
			if (account) {
				const apiResp = await getUserByProviderId(account.providerAccountId)

				if (!apiResp.isSuccess) return false
				if (apiResp.data) return true

				const userCreated = await createUserApi({
					username: user.name!,
					email: user.email!,
					image: user.image!,
					providerId: account.providerAccountId,
					providerName: account.provider,
				})

				return userCreated.isSuccess
			}

			return false
		},
		async jwt({ token, account, profile }) {
			if (token.sub) {
				const apiResp = await getUserByProviderId(token.sub)
				if (apiResp.isSuccess && apiResp.data) {
					token.userId = apiResp.data.id
				}
			}

			return token
		},
		async session({ session, token }) {
			session.user.id = token.userId
			session.user.providerId = token.sub

			return session
		},
	},
})

export { handler as GET, handler as POST }
