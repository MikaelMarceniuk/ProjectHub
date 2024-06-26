'use client'

import { useEditor, EditorContent, EditorContentProps } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { cx } from 'class-variance-authority'
import TiptapToolbar from './toolbar'
import { FormEventHandler } from 'react'

type TiptapEditorProps = {
	onChange: FormEventHandler<HTMLDivElement> | undefined
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ onChange }) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: '<p>The description comes right here!</p>',
		editorProps: {
			attributes: {
				class: cx('rounded border border-input h-full min-h-64 p-2'),
			},
		},
	})

	if (!editor) return null

	return (
		<div className='space-y-2'>
			<TiptapToolbar editor={editor} />
			<EditorContent editor={editor} onChange={onChange} />
		</div>
	)
}

export default TiptapEditor
