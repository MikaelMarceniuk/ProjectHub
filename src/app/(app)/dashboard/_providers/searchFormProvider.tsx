'use client'

import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import withChildren from '@/@types/withChildren'

const searchSchema = z.object({
	query: z.string(),
})

export type searchFormType = z.infer<typeof searchSchema>

const SearchFormProvider: React.FC<withChildren> = ({ children }) => {
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()

	const form = useForm<searchFormType>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			query: '',
		},
		values: {
			query: searchParams.get('query') || '',
		},
	})

	const queryValue = form.watch('query')

	useEffect(() => {
		const params = new URLSearchParams()
		params.set('query', queryValue)

		router.push(pathname + '?' + params.toString())
	}, [queryValue])

	return <FormProvider {...form}>{children}</FormProvider>
}

export default SearchFormProvider
