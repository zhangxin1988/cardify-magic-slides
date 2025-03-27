
import React, { useState, useEffect } from "react";
import { 
  Download, 
  FileText, 
  Copy, 
  Share2, 
  ChevronDown,
  Settings
} from "lucide-react";
import { toast } from "sonner";
import { markdownToHtml, exportToHtml, exportToPdf, getDefaultMarkdown } from "../utils/markdownConverter";
import MarkdownEditor from "../components/MarkdownEditor";
import CardPreview from "../components/CardPreview";
import CardSettings from "../components/CardSettings";
import ThemeToggle from "../components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navbar from "@/components/Navbar";

enum DevicePreview {
  Desktop = "desktop",
  Mobile = "mobile"
}

const Editor = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [devicePreview, setDevicePreview] = useState<DevicePreview>(DevicePreview.Desktop);
  const [isExporting, setIsExporting] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [width, setWidth] = useState("440");
  const [height, setHeight] = useState("586");
  const [autoSplit, setAutoSplit] = useState(true);
  const [activeStyle, setActiveStyle] = useState("Apple Notes");
  
  const styleOptions = [
    "Apple Notes",
    "Pop Art",
    "Art deco",
    "Glass Morphism",
    "Warm & Soft",
    "Minimal Gray",
    "Dreamy Gradient",
    "Fresh Nature"
  ];
  
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

  const handleExportLongImage = () => {
    toast.info("Long image export coming soon!");
  };

  return (
    <div className="h-screen flex flex-col pt-14">
      <div className="flex h-full">
        {/* Editor Section */}
        <div className="w-full md:w-1/2 h-full border-r border-border flex flex-col">
          <MarkdownEditor 
            value={markdown} 
            onChange={setMarkdown} 
          />
        </div>
        
        {/* Preview Section */}
        <div className="w-full md:w-1/2 h-full flex flex-col bg-accent/5">
          <div className="relative h-full flex flex-col">
            <div className="absolute top-4 right-4 z-10 flex space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-background/80 backdrop-blur-sm" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleExportToHtml}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as HTML
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportToPdf}>
                    <Download className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCopyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Markdown
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShareLink}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <ThemeToggle />
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[350px] sm:w-[450px] overflow-y-auto">
                  <CardSettings 
                    width={width}
                    height={height}
                    zoom={zoom}
                    autoSplit={autoSplit}
                    activeStyle={activeStyle}
                    styleOptions={styleOptions}
                    onWidthChange={setWidth}
                    onHeightChange={setHeight}
                    onZoomChange={setZoom}
                    onAutoSplitChange={setAutoSplit}
                    onStyleChange={setActiveStyle}
                    onExportLongImage={handleExportLongImage}
                  />
                </SheetContent>
              </Sheet>
            </div>

            <CardPreview 
              html={html} 
              isMobile={devicePreview === DevicePreview.Mobile} 
              width={parseInt(width)}
              height={parseInt(height)}
              zoom={zoom / 100}
              style={activeStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
