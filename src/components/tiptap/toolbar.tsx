import { type Editor } from '@tiptap/react'
import { Toggle } from '../shadcn/toggle'
import { Bold, Italic, Strikethrough } from 'lucide-react'

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
				pressed={editor.isActive('strike')}
				onPressedChange={() => editor.chain().focus().toggleStrike().run()}
			>
				<Strikethrough className='h-4 w-4' />
			</Toggle>
		</div>
	)
}

export default TiptapToolbar
