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
import DatePicker from '@/components/shadcn/datePicker'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import getCardById from '@/api/getCardById'
import createCardApi from '@/api/createCard'
import updateCardApi from '@/api/updateCard'
import CardType from '@/@types/card'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ColumnDTOType } from '@/api/getProjectDetailsById'
import { useToast } from '@/hooks/useToast'

type CardSheetCreateParams = {
	type: 'CREATE'
	columnId: string
	cardId?: undefined
	trigger?: undefined
}

type CardSheetUpdateParams = {
	type: 'UPDATE'
	columnId: string
	cardId: string
	trigger: React.ReactElement
}

type CardSheetParams = CardSheetCreateParams | CardSheetUpdateParams

const CardFormSchema = z.object({
	name: z.string().min(6),
	description: z.string().min(0).trim(),
	dueTo: z.date().optional(),
	assinedTo: z.string(),
})

type CardFormType = z.infer<typeof CardFormSchema>

const CardSheet: React.FC<CardSheetParams> = ({
	type,
	columnId,
	cardId,
	trigger,
}) => {
	const queryClient = useQueryClient()
	const { projectId } = useParams<{ projectId: string }>()
	const [isSheetOpen, setIsSheetOpen] = useState(false)
	const { toast } = useToast()

	const methods = useForm<CardFormType>({
		resolver: zodResolver(CardFormSchema),
		defaultValues: {
			name: '',
			description: '',
			dueTo: undefined,
			assinedTo: '',
		},
	})

	const createCardMutatino = useMutation({
		mutationFn: createCardApi,
		onSuccess({ data }, { columnId }) {
			methods.reset()

			const [cachedProject] = queryClient.getQueriesData<{
				id: string
				name: string
				columns: ColumnDTOType
			}>({
				queryKey: ['project', projectId],
			})

			const [cacheKey, cache] = cachedProject
			const newCache = {
				...cache,
				columns: cache?.columns.map((column) => {
					if (column.id != columnId) return column

					return {
						...column,
						cards: [...column.cards, data],
					}
				}),
			}

			queryClient.setQueryData(cacheKey, newCache)
		},
	})

	const updateCardMutation = useMutation({
		mutationFn: updateCardApi,
		onSuccess({ isSuccess, data }, { id }, _context) {
			if (!isSuccess) {
				toast({
					title: 'Error in updating card.',
					description: 'Check your connection and try again later.',
					variant: 'destructive',
				})
				return Promise.reject()
			}

			const [cachedProject] = queryClient.getQueriesData<{
				id: string
				name: string
				columns: ColumnDTOType
			}>({
				queryKey: ['project', projectId],
			})

			const [cacheKey, cache] = cachedProject
			const newCache = {
				...cache,
				columns: cache?.columns.map((column) => {
					if (column.id != columnId) return column

					return {
						...column,
						cards: column.cards.map((card) => {
							if (card.id != id) return card

							return {
								...card,
								...data,
							}
						}),
					}
				}),
			}

			queryClient.setQueryData(cacheKey, newCache)
		},
	})

	const getCardQuery = useQuery({
		queryKey: ['card', { cardId }],
		queryFn: () => getCardById({ cardId: cardId! }),
		enabled: isSheetOpen,
	})

	useEffect(() => {
		if (getCardQuery.data) {
			const { data } = getCardQuery.data
			methods.setValue('name', data!.name)
			methods.setValue('dueTo', data!.dueTo ? new Date(data!.dueTo) : undefined)
			methods.setValue('description', data!.description || '')
		}
	}, [getCardQuery.data])

	const handleSubmit = methods.handleSubmit(async (values) => {
		if (type == 'CREATE') {
			await createCardMutatino.mutateAsync({
				name: values.name,
				description: values.description,
				dueTo: values.dueTo,
				columnId,
			})
		}

		if (type == 'UPDATE') {
			await updateCardMutation.mutateAsync({
				id: cardId,
				name: values.name,
				description: values.description,
				dueTo: values.dueTo,
				columnId,
			})
		}
	})

	const handleOnOpen = () => {
		setIsSheetOpen((oldValue) => !oldValue)

		if (type == 'CREATE') return
		if (!isSheetOpen) getCardQuery.refetch()
	}

	return (
		<Sheet onOpenChange={handleOnOpen}>
			{type == 'CREATE' && (
				<SheetTrigger asChild>
					<Button size='icon' variant='ghost'>
						<Plus />
					</Button>
				</SheetTrigger>
			)}
			{type == 'UPDATE' && (
				<SheetTrigger asChild className='w-full'>
					{trigger}
				</SheetTrigger>
			)}
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
										<TiptapEditor
											onChange={field.onChange}
											value={field.value}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex justify-end'>
							<Button type='submit' size='xlg'>
								{type == 'CREATE' ? 'Create' : 'Save'}
							</Button>
						</div>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}

export default CardSheet
