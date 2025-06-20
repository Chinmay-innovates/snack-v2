import { Editor } from '@tiptap/react';
import EmojiPicker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { Bold, Code, Italic, List, ListOrdered, SquareCode, Strikethrough } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Typography } from './ui/typography';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { BsEmojiSmile } from 'react-icons/bs';
export const MenuBar = ({ editor }: { editor: Editor }) => {
  const { resolvedTheme } = useTheme();
  return (
    <div className="flex items-center flex-wrap gap-2 absolute z-10 top-0 left-0 w-full p-2 bg-neutral-100 dark:bg-neutral-900">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'border-white' : 'border-black'}
      >
        <Bold className="size-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'border-white' : 'border-black'}
      >
        <Italic className="size-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'border-white' : 'border-black'}
      >
        <Strikethrough className="size-4" />
      </button>
      <Typography text="|" variant="h6" className="m-0" />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'border-white' : 'border-black'}
      >
        <List className="size-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'border-white' : 'border-black'}
      >
        <ListOrdered className="size-4" />
      </button>
      <Typography text="|" variant="h6" className="m-0" />
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'border-white' : 'border-black'}
      >
        <Code className="size-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'border-white' : 'border-black'}
      >
        <SquareCode className="size-4" />
      </button>
      <Typography text="|" variant="h6" className="m-0" />
      <Popover>
        <PopoverTrigger>
          <button className="flex items-center">
            <BsEmojiSmile size={16} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <EmojiPicker
            theme={resolvedTheme}
            data={data}
            onEmojiSelect={(emoji: any) => editor.chain().focus().insertContent(emoji.native).run()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
