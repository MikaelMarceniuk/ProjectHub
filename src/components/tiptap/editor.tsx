'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { cx } from 'class-variance-authority'
import TiptapToolbar from './toolbar'

type TiptapEditorProps = {
	onChange: (value: string) => void
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ onChange }) => {
	const editor = useEditor({
		extensions: [StarterKit],
		editorProps: {
			attributes: {
				class: cx('rounded border border-input h-full min-h-64 p-2'),
			},
		},
		onUpdate({ editor }) {
			onChange(editor.getHTML())
		},
	})

	if (!editor) return null

	return (
		<div className='space-y-2'>
			<TiptapToolbar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	)
}

export default TiptapEditor
