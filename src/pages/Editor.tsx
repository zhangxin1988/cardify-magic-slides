
import React, { useState, useEffect } from "react";
import { 
  Download, 
  FileText, 
  Copy, 
  Share2, 
  Layout, 
  LayoutGrid, 
  AlignLeft,
  PanelLeft,
  PanelRight,
  Smartphone
} from "lucide-react";
import { toast } from "sonner";
import { markdownToHtml, exportToHtml, exportToPdf, getDefaultMarkdown } from "../utils/markdownConverter";
import MarkdownEditor from "../components/MarkdownEditor";
import CardPreview from "../components/CardPreview";

enum ViewMode {
  Split = "split",
  EditOnly = "edit-only",
  PreviewOnly = "preview-only"
}

enum DevicePreview {
  Desktop = "desktop",
  Mobile = "mobile"
}

const Editor = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Split);
  const [devicePreview, setDevicePreview] = useState<DevicePreview>(DevicePreview.Desktop);
  const [isExporting, setIsExporting] = useState(false);
  
  // Load saved markdown from localStorage or use default
  useEffect(() => {
    const savedMarkdown = localStorage.getItem("markdownContent");
    if (savedMarkdown) {
      setMarkdown(savedMarkdown);
    } else {
      setMarkdown(getDefaultMarkdown());
    }
  }, []);
  
  // Update HTML when markdown changes
  useEffect(() => {
    if (markdown) {
      const renderedHtml = markdownToHtml(markdown);
      setHtml(renderedHtml);
      localStorage.setItem("markdownContent", markdown);
    }
  }, [markdown]);
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(markdown)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy to clipboard");
      });
  };
  
  const handleExportToHtml = () => {
    setIsExporting(true);
    try {
      exportToHtml(markdown);
      toast.success("Exported to HTML successfully!");
    } catch (error) {
      toast.error("Failed to export to HTML");
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };
  
  const handleExportToPdf = () => {
    setIsExporting(true);
    try {
      exportToPdf(markdown);
      toast.success("Preparing PDF for download...");
    } catch (error) {
      toast.error("Failed to export to PDF");
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };
  
  const handleShareLink = () => {
    toast.info("Sharing feature coming soon!");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold">MD2Card Editor</h1>
          </div>
          
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => setViewMode(ViewMode.Split)}
              className={`p-2 rounded-md ${viewMode === ViewMode.Split ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="Split View"
            >
              <Layout size={18} />
            </button>
            <button 
              onClick={() => setViewMode(ViewMode.EditOnly)}
              className={`p-2 rounded-md ${viewMode === ViewMode.EditOnly ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="Editor Only"
            >
              <AlignLeft size={18} />
            </button>
            <button 
              onClick={() => setViewMode(ViewMode.PreviewOnly)}
              className={`p-2 rounded-md ${viewMode === ViewMode.PreviewOnly ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="Preview Only"
            >
              <LayoutGrid size={18} />
            </button>
            <div className="h-6 border-r border-border mx-1"></div>
            <button 
              onClick={() => setDevicePreview(DevicePreview.Desktop)}
              className={`p-2 rounded-md ${devicePreview === DevicePreview.Desktop ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="Desktop Preview"
            >
              <PanelRight size={18} />
            </button>
            <button 
              onClick={() => setDevicePreview(DevicePreview.Mobile)}
              className={`p-2 rounded-md ${devicePreview === DevicePreview.Mobile ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              title="Mobile Preview"
            >
              <Smartphone size={18} />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 text-sm flex items-center gap-1 hover:bg-accent rounded-md"
              onClick={handleCopyToClipboard}
              title="Copy Markdown"
            >
              <Copy size={16} />
              <span className="hidden sm:inline">Copy</span>
            </button>
            <button 
              className="p-2 text-sm flex items-center gap-1 hover:bg-accent rounded-md"
              onClick={handleExportToHtml}
              disabled={isExporting}
              title="Export to HTML"
            >
              <FileText size={16} />
              <span className="hidden sm:inline">HTML</span>
            </button>
            <button 
              className="p-2 text-sm flex items-center gap-1 hover:bg-accent rounded-md"
              onClick={handleExportToPdf}
              disabled={isExporting}
              title="Export to PDF"
            >
              <Download size={16} />
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button 
              className="p-2 text-sm flex items-center gap-1 hover:bg-accent rounded-md"
              onClick={handleShareLink}
              title="Share"
            >
              <Share2 size={16} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto flex flex-col md:flex-row">
        {viewMode !== ViewMode.PreviewOnly && (
          <div 
            className={`${viewMode === ViewMode.Split ? 'md:w-1/2' : 'w-full'} border-r border-border h-[calc(100vh-56px)]`}
          >
            <MarkdownEditor 
              value={markdown} 
              onChange={setMarkdown} 
            />
          </div>
        )}
        
        {viewMode !== ViewMode.EditOnly && (
          <div 
            className={`${viewMode === ViewMode.Split ? 'md:w-1/2' : 'w-full'} h-[calc(100vh-56px)]`}
          >
            <CardPreview 
              html={html} 
              isMobile={devicePreview === DevicePreview.Mobile} 
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Editor;
