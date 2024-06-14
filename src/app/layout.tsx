import type { Metadata, NextPage } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import SessionProvider from '@/providers/sessionProvider'
import SessionObserver from '@/providers/sessionObserver'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Project Hub',
}

type RootLayoutProps = {
	children: React.ReactNode
}

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<SessionProvider>
						<SessionObserver />
						{children}
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}

export default RootLayout
