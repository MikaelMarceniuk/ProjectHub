'use client'

import { Button } from '@/components/shadcn/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/shadcn/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type CardSheetCreateParams = {
	type: 'CREATE'
	columnId: string
}

type CardSheetParams = CardSheetCreateParams

const CardFormSchema = z.object({
	name: z.string().min(6),
	description: z.string().min(0),
	dueTo: z.string().date(),
	assinedTo: z.string(),
})

type CardFormType = z.infer<typeof CardFormSchema>

const CardSheet: React.FC<CardSheetParams> = ({ type }) => {
	const methods = useForm<CardFormType>({
		resolver: zodResolver(CardFormSchema),
		defaultValues: {
			name: '',
			description: '',
			dueTo: '',
			assinedTo: '',
		},
	})

	return (
		<Sheet>
			<SheetTrigger asChild>
				{type == 'CREATE' && (
					<Button size='icon' variant='ghost'>
						<Plus />
					</Button>
				)}
			</SheetTrigger>
			<SheetContent className='w-full max-w-[80vw] sm:max-w-[80vw]'>
				<SheetHeader>
					<SheetTitle>{type == 'CREATE' && 'Create a new card'}</SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				<Form {...methods}>
					<form className='h-full space-y-4'>
						<div className='flex w-full gap-4'>
							<FormField
								control={methods.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder='Card name'
												className='h-12'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={methods.control}
								name='dueTo'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder='Due to' className='h-12' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={methods.control}
								name='assinedTo'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder='Assined to who?'
												className='h-12'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='h-full rounded border border-gray-500'></div>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}

export default CardSheet
