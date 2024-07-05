import { type Editor } from '@tiptap/react'
import { Toggle } from '../shadcn/toggle'
import {
	Baseline,
	Bold,
	Italic,
	Strikethrough,
	Type,
	Underline,
} from 'lucide-react'
import { Button } from '../shadcn/button'
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn/popover'
import { GradientPicker } from '../shadcn/colorPicker'

type TiptapToolbar = {
	editor: Editor
}

const TiptapToolbar: React.FC<TiptapToolbar> = ({ editor }) => {
	if (!editor) return null

	return (
		<div className='flex gap-1 rounded border border-input bg-transparent p-2'>
			<Toggle
				size='sm'
				pressed={editor.isActive('bold')}
				onPressedChange={() => editor.chain().focus().toggleBold().run()}
			>
				<Bold className='h-4 w-4' />
			</Toggle>
			<Toggle
				size='sm'
				pressed={editor.isActive('italic')}
				onPressedChange={() => editor.chain().focus().toggleItalic().run()}
			>
				<Italic className='h-4 w-4' />
			</Toggle>
			<Toggle
				size='sm'
				pressed={editor.isActive('underline')}
				onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
			>
				<Underline className='h-4 w-4' />
			</Toggle>
			<Toggle
				size='sm'
				pressed={editor.isActive('strike')}
				onPressedChange={() => editor.chain().focus().toggleStrike().run()}
			>
				<Strikethrough className='h-4 w-4' />
			</Toggle>

			<Popover>
				<PopoverTrigger asChild>
					<Button variant='ghost' size='tiptapToolbar'>
						<Type className='h-4 w-4' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-fit p-2'>
					<div className='flex flex-col gap-2'>
						<Button
							variant='ghost'
							className='justify-start'
							onClick={() => editor.chain().focus().setFontSize('12px').run()}
						>
							Tiny
						</Button>
						<Button
							variant='ghost'
							className='justify-start'
							onClick={() => editor.chain().focus().setFontSize('14px').run()}
						>
							Small
						</Button>
						<Button
							variant='ghost'
							className='justify-start'
							onClick={() => editor.chain().focus().setFontSize('16px').run()}
						>
							Default
						</Button>
						<Button
							variant='ghost'
							className='justify-start'
							onClick={() => editor.chain().focus().setFontSize('18px').run()}
						>
							Big
						</Button>
						<Button
							variant='ghost'
							className='justify-start'
							onClick={() => editor.chain().focus().setFontSize('20px').run()}
						>
							Huge
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default TiptapToolbar
