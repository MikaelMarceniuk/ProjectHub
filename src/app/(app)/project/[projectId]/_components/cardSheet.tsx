'use client'

import { Button } from '@/components/shadcn/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
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
import TiptapEditor from '@/components/tiptap/editor'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import StarterKit from '@tiptap/starter-kit'
import { cx } from 'class-variance-authority'
import { useEditor } from '@tiptap/react'
import TiptapToolbar from '@/components/tiptap/toolbar'
import { Popover, PopoverTrigger } from '@/components/shadcn/popover'
import DatePicker from '@/components/shadcn/datePicker'
import { useMutation } from '@tanstack/react-query'
import createCardApi from '@/api/createCardMutation'

type CardSheetCreateParams = {
	type: 'CREATE'
	columnId: string
}

type CardSheetParams = CardSheetCreateParams

const CardFormSchema = z.object({
	name: z.string().min(6),
	description: z.string().min(0).trim(),
	dueTo: z.date().optional(),
	assinedTo: z.string(),
})

type CardFormType = z.infer<typeof CardFormSchema>

const CardSheet: React.FC<CardSheetParams> = ({ type, columnId }) => {
	const methods = useForm<CardFormType>({
		resolver: zodResolver(CardFormSchema),
		defaultValues: {
			name: '',
			description: '',
			dueTo: undefined,
			assinedTo: '',
		},
	})

	const createCardMutation = useMutation({
		mutationFn: createCardApi,
		onSuccess(_data, _variables, _context) {
			methods.reset()
		},
	})

	const handleSubmit = methods.handleSubmit(
		async (values) =>
			await createCardMutation.mutateAsync({
				name: values.name,
				description: values.description,
				dueTo: values.dueTo,
				columnId,
			}),
	)

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
					<form className='h-full space-y-4' onSubmit={handleSubmit}>
						<div className='flex w-full gap-4'>
							<FormField
								control={methods.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Card name</FormLabel>
										<FormControl>
											<Input className='h-12' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={methods.control}
								name='dueTo'
								render={({ field }) => (
									<FormItem className='flex flex-col justify-end'>
										<FormLabel>Due to</FormLabel>
										<FormControl>
											<DatePicker
												value={field.value}
												handleOnSetDate={field.onChange}
												classname='h-12 w-56'
											/>
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
										<FormLabel>Assine to</FormLabel>
										<FormControl>
											<Input className='h-12' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={methods.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<TiptapEditor onChange={field.onChange} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex justify-end'>
							<Button type='submit' size='xlg'>
								Create
							</Button>
						</div>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}

export default CardSheet
