
import React, { useEffect, useRef } from "react";
import { Braces, Hash, Bold, Italic, List, ListOrdered, Quote, Image, Link, Code } from "lucide-react";

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
      case 'heading':
        newText = text.substring(0, start) + `# ${textToInsert}` + text.substring(end);
        newCursorPos = start + 2 + (selectedText ? selectedText.length : placeholder.length);
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
      case 'list':
        newText = text.substring(0, start) + `- ${textToInsert}` + text.substring(end);
        newCursorPos = start + 2 + (selectedText ? selectedText.length : 0);
        break;
      case 'ordered-list':
        newText = text.substring(0, start) + `1. ${textToInsert}` + text.substring(end);
        newCursorPos = start + 3 + (selectedText ? selectedText.length : 0);
        break;
      case 'blockquote':
        newText = text.substring(0, start) + `> ${textToInsert}` + text.substring(end);
        newCursorPos = start + 2 + (selectedText ? selectedText.length : 0);
        break;
      case 'image':
        newText = text.substring(0, start) + `![${textToInsert}](image_url)` + text.substring(end);
        newCursorPos = start + 2 + (selectedText ? selectedText.length : 0);
        if (!selectedText) newCursorPos = start + 2;
        break;
      case 'link':
        newText = text.substring(0, start) + `[${textToInsert}](url)` + text.substring(end);
        newCursorPos = start + 1 + (selectedText ? selectedText.length : 0);
        if (!selectedText) newCursorPos = start + 1;
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
      <div className="border-b border-border p-2 flex items-center space-x-1 overflow-x-auto bg-background/50">
        <button 
          className="p-1.5 rounded hover:bg-accent"
          onClick={() => insertMarkdown('heading', getSelectedText(), 'Heading')}
          title="Heading"
        >
          <Hash size={16} />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-accent"
          onClick={() => insertMarkdown('bold', getSelectedText(), 'Bold text')}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-accent"
          onClick={() => insertMarkdown('italic', getSelectedText(), 'Italic text')}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-accent"
          onClick={() => insertMarkdown('list', getSelectedText(), 'List item')}
          title="Unordered List"
        >
          <List size={16} />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-accent"
          onClick={() => insertMarkdown('ordered-list', getSelectedText(), 'List item')}
          title="Ordered List"
        >
          <ListOrdered size={16} />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-accent"
          onClick={() => insertMarkdown('blockquote', getSelectedText(), 'Blockquote')}
          title="Blockquote"
        >
          <Quote size={16} />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-accent"
          onClick={() => insertMarkdown('image', getSelectedText(), 'Image alt text')}
          title="Image"
        >
          <Image size={16} />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-accent"
          onClick={() => insertMarkdown('link', getSelectedText(), 'Link text')}
          title="Link"
        >
          <Link size={16} />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-accent"
          onClick={() => insertMarkdown('code', getSelectedText(), 'code')}
          title="Inline Code"
        >
          <Code size={16} />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-accent"
          onClick={() => insertMarkdown('codeblock', getSelectedText(), 'code block')}
          title="Code Block"
        >
          <Braces size={16} />
        </button>
      </div>
      
      <div className="flex-1 relative overflow-auto">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-full p-4 outline-none resize-none font-mono text-sm bg-background"
          spellCheck="false"
          placeholder="Type your markdown here..."
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
