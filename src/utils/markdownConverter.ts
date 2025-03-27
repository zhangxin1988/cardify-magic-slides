
import { marked } from 'marked';
import DOMPurify from 'dompurify';

/**
 * Converts markdown text to HTML
 */
export const markdownToHtml = (markdown: string): string => {
  // Using marked.parse instead of marked which returns a Promise in newer versions
  const html = marked.parse(markdown, { async: false }) as string;
  return DOMPurify.sanitize(html);
};

/**
 * Converts markdown text to slide/card format
 */
export const markdownToSlides = (markdown: string): string[] => {
  // Split markdown by horizontal rule or triple dash
  const slides = markdown.split(/^---$/m);
  
  // Convert each slide to HTML
  return slides.map(slide => markdownToHtml(slide.trim()));
};

/**
 * Returns a default markdown template for new users
 */
export const getDefaultMarkdown = (): string => {
  return `# Welcome to Markdown Card Creator

This is a simple example of what you can create.

- Bullet points
- Lists
- **Bold text**
- *Italic text*

---

# Second Card/Slide

You can create multiple cards or slides by separating them with three dashes.

> This is a blockquote that looks nice in the preview.

---

# Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

Each slide can contain different types of content!
`;
};

/**
 * Exports current markdown content to HTML file for download
 */
export const exportToHtml = (markdown: string): void => {
  const html = markdownToHtml(markdown);
  const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Markdown</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2, h3 { margin-top: 1.5em; }
    pre {
      background-color: #f6f8fa;
      padding: 16px;
      border-radius: 4px;
      overflow-x: auto;
    }
    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
      background-color: #f6f8fa;
      padding: 3px 5px;
      border-radius: 3px;
    }
    blockquote {
      margin-left: 0;
      padding-left: 1em;
      border-left: 4px solid #ddd;
      color: #555;
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>
  `;
  
  const blob = new Blob([fullHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'exported-markdown.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Exports current markdown content to a PDF (browser-based)
 */
export const exportToPdf = (markdown: string): void => {
  const html = markdownToHtml(markdown);
  
  // Create a temporary iframe to render content for printing
  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.top = '-9999px';
  document.body.appendChild(iframe);
  
  const doc = iframe.contentDocument;
  doc?.open();
  doc?.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Exported Markdown</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #333;
          padding: 20px;
        }
        h1, h2, h3 { margin-top: 1.5em; }
        pre {
          background-color: #f6f8fa;
          padding: 16px;
          border-radius: 4px;
          overflow-x: auto;
        }
        code {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
          background-color: #f6f8fa;
          padding: 3px 5px;
          border-radius: 3px;
        }
        blockquote {
          margin-left: 0;
          padding-left: 1em;
          border-left: 4px solid #ddd;
          color: #555;
        }
        @media print {
          body { padding: 0; }
          pre { white-space: pre-wrap; }
        }
      </style>
    </head>
    <body>
      ${html}
    </body>
    </html>
  `);
  doc?.close();
  
  // Use browser print dialog to save as PDF
  iframe.contentWindow?.focus();
  iframe.contentWindow?.print();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 1000);
};
