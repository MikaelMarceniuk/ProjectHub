'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/shadcn/button'
import { Calendar } from '@/components/shadcn/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/shadcn/popover'

type DatePickerProps = {
	value: Date
	handleOnSetDate: (value: Date | undefined) => void
	classname: string
}

const DatePicker: React.FC<DatePickerProps> = ({
	value,
	handleOnSetDate,
	classname,
}) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-full justify-start text-left font-normal',
						!value && 'text-muted-foreground',
						classname,
					)}
				>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{value ? format(value, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={value}
					onSelect={handleOnSetDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}

export default DatePicker
