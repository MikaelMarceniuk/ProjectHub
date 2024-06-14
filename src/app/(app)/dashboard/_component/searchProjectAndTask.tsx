'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
} from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const searchSchema = z.object({
	query: z.string(),
})

type searchSchemaType = z.infer<typeof searchSchema>

const SearchProjectAndTask: React.FC = () => {
	const searchForm = useForm<searchSchemaType>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			query: '',
		},
	})

	return (
		<Form {...searchForm}>
			<FormField
				control={searchForm.control}
				name='query'
				render={({ field }) => (
					<div className='relative flex h-12 w-full'>
						<Search className='absolute left-3 top-3' />
						<FormItem className='flex-1'>
							<FormControl>
								<Input
									type='search'
									placeholder='Search for Projects or Tasks...'
									className='h-full pl-11'
									{...field}
								/>
							</FormControl>
						</FormItem>
					</div>
				)}
			/>
		</Form>
	)
}

export default SearchProjectAndTask
