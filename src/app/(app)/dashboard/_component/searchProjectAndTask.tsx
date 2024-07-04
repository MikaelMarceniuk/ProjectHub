'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
} from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'
import { Search } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { searchFormType } from '../_providers/searchFormProvider'

const SearchProjectAndTask: React.FC = () => {
	const searchForm = useFormContext<searchFormType>()

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
