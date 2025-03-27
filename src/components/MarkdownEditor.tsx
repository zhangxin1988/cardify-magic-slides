
import React, { useEffect, useRef } from "react";
import { 
  Heading1, Heading2, Heading3, Bold, Italic, Underline, 
  Strikethrough, Link2, Image, List, ListOrdered, 
  Code, BracketsSquare, Minus 
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to get the correct scrollHeight
    textarea.style.height = "auto";
    textarea.style.height = `${Math.max(textarea.scrollHeight, 300)}px`;
  }, [value]);

  // Tab key handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      // Insert tab at cursor position
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onChange(newValue);

      // Move cursor after the inserted tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const insertMarkdown = (markdownSyntax: string, selectedText: string = '', placeholder: string = '') => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    let textToInsert = selectedText || placeholder;
    let newText: string;
    let newCursorPos: number;
    
    switch (markdownSyntax) {
      case 'h1':
        newText = text.substring(0, start) + `# ${textToInsert}` + text.substring(end);
        newCursorPos = start + 2 + (selectedText ? selectedText.length : placeholder.length);
        break;
      case 'h2':
        newText = text.substring(0, start) + `## ${textToInsert}` + text.substring(end);
        newCursorPos = start + 3 + (selectedText ? selectedText.length : placeholder.length);
        break;
      case 'h3':
        newText = text.substring(0, start) + `### ${textToInsert}` + text.substring(end);
        newCursorPos = start + 4 + (selectedText ? selectedText.length : placeholder.length);
        break;
      case 'bold':
        newText = text.substring(0, start) + `**${textToInsert}**` + text.substring(end);
        newCursorPos = start + 2 + (selectedText ? selectedText.length : 0);
        if (!selectedText) newCursorPos = start + 2;
        break;
      case 'italic':
        newText = text.substring(0, start) + `*${textToInsert}*` + text.substring(end);
        newCursorPos = start + 1 + (selectedText ? selectedText.length : 0);
        if (!selectedText) newCursorPos = start + 1;
        break;
      case 'underline':
        newText = text.substring(0, start) + `<u>${textToInsert}</u>` + text.substring(end);
        newCursorPos = start + 3 + (selectedText ? selectedText.length : 0);
        if (!selectedText) newCursorPos = start + 3;
        break;
      case 'strikethrough':
        newText = text.substring(0, start) + `~~${textToInsert}~~` + text.substring(end);
        newCursorPos = start + 2 + (selectedText ? selectedText.length : 0);
        if (!selectedText) newCursorPos = start + 2;
        break;
      case 'list':
        newText = text.substring(0, start) + `- ${textToInsert}` + text.substring(end);
        newCursorPos = start + 2 + (selectedText ? selectedText.length : 0);
        break;
      case 'ordered-list':
        newText = text.substring(0, start) + `1. ${textToInsert}` + text.substring(end);
        newCursorPos = start + 3 + (selectedText ? selectedText.length : 0);
        break;
      case 'link':
        newText = text.substring(0, start) + `[${textToInsert}](url)` + text.substring(end);
        newCursorPos = start + 1 + (selectedText ? selectedText.length : 0);
        if (!selectedText) newCursorPos = start + 1;
        break;
      case 'image':
        newText = text.substring(0, start) + `![${textToInsert}](image_url)` + text.substring(end);
        newCursorPos = start + 2 + (selectedText ? selectedText.length : 0);
        if (!selectedText) newCursorPos = start + 2;
        break;
      case 'code':
        newText = text.substring(0, start) + `\`${textToInsert}\`` + text.substring(end);
        newCursorPos = start + 1 + (selectedText ? selectedText.length : 0);
        if (!selectedText) newCursorPos = start + 1;
        break;
      case 'codeblock':
        newText = text.substring(0, start) + `\`\`\`\n${textToInsert}\n\`\`\`` + text.substring(end);
        newCursorPos = start + 4 + (selectedText ? selectedText.length : 0);
        break;
      case 'hr':
        newText = text.substring(0, start) + `---` + text.substring(end);
        newCursorPos = start + 3;
        break;
      default:
        newText = text;
        newCursorPos = start;
    }
    
    onChange(newText);
    
    // Set cursor position
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = newCursorPos;
      }
    }, 0);
  };

  const getSelectedText = (): string => {
    if (!textareaRef.current) return '';
    
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    
    return textareaRef.current.value.substring(start, end);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border bg-background/50 overflow-x-auto">
        <div className="flex items-center h-10 px-2">
          <button 
            className="p-1.5 rounded hover:bg-accent"
            onClick={() => insertMarkdown('h1', getSelectedText(), 'Heading 1')}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </button>
          <button 
            className="p-1.5 rounded hover:bg-accent"
            onClick={() => insertMarkdown('h2', getSelectedText(), 'Heading 2')}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </button>
          <button 
            className="p-1.5 rounded hover:bg-accent"
            onClick={() => insertMarkdown('h3', getSelectedText(), 'Heading 3')}
            title="Heading 3"
          >
            <Heading3 size={18} />
          </button>
          <div className="h-5 w-px bg-border mx-1.5"></div>
          <button 
            className="p-1.5 rounded hover:bg-accent"
            onClick={() => insertMarkdown('bold', getSelectedText(), 'Bold text')}
            title="Bold"
          >
            <Bold size={18} />
          </button>
          <button 
            className="p-1.5 rounded hover:bg-accent"
            onClick={() => insertMarkdown('italic', getSelectedText(), 'Italic text')}
            title="Italic"
          >
            <Italic size={18} />
          </button>
          <button 
            className="p-1.5 rounded hover:bg-accent"
            onClick={() => insertMarkdown('underline', getSelectedText(), 'Underlined text')}
            title="Underline"
          >
            <Underline size={18} />
          </button>
          <button 
            className="p-1.5 rounded hover:bg-accent"
            onClick={() => insertMarkdown('strikethrough', getSelectedText(), 'Strikethrough text')}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </button>
          <div className="h-5 w-px bg-border mx-1.5"></div>
          <button 
            className="p-1.5 rounded hover:bg-accent"
            onClick={() => insertMarkdown('link', getSelectedText(), 'Link text')}
            title="Link"
          >
            <Link2 size={18} />
          </button>
          <button 
            className="p-1.5 rounded hover:bg-accent"
            onClick={() => insertMarkdown('image', getSelectedText(), 'Image alt text')}
            title="Image"
          >
            <Image size={18} />
          </button>
          <div className="h-5 w-px bg-border mx-1.5"></div>
          <button 
            className="p-1.5 rounded hover:bg-accent"
            onClick={() => insertMarkdown('list', getSelectedText(), 'List item')}
            title="Bullet List"
          >
            <List size={18} />
          </button>
          <button 
            className="p-1.5 rounded hover:bg-accent"
            onClick={() => insertMarkdown('ordered-list', getSelectedText(), 'List item')}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </button>
          <div className="h-5 w-px bg-border mx-1.5"></div>
          <button 
            className="p-1.5 rounded hover:bg-accent"
            onClick={() => insertMarkdown('code', getSelectedText(), 'code')}
            title="Inline Code"
          >
            <Code size={18} />
          </button>
          <button 
            className="p-1.5 rounded hover:bg-accent"
            onClick={() => insertMarkdown('codeblock', getSelectedText(), 'code block')}
            title="Code Block"
          >
            <BracketsSquare size={18} />
          </button>
          <div className="h-5 w-px bg-border mx-1.5"></div>
          <button 
            className="p-1.5 rounded hover:bg-accent"
            onClick={() => insertMarkdown('hr', getSelectedText())}
            title="Horizontal Rule (Creates a new slide)"
          >
            <Minus size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative overflow-auto">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-full p-4 outline-none resize-none font-mono text-sm leading-relaxed"
          spellCheck="false"
          placeholder="Type your markdown here..."
        />
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground opacity-70">
          Line numbers available in pro version
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
