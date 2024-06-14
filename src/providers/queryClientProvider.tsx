'use client'

import {
	QueryClient,
	QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query'
import withChildren from '@/@types/withChildren'

const queryClient = new QueryClient()

const QueryClientProvider: React.FC<withChildren> = ({ children }) => {
	return (
		<ReactQueryClientProvider client={queryClient}>
			{children}
		</ReactQueryClientProvider>
	)
}

export default QueryClientProvider
