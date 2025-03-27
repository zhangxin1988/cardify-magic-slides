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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Card Settings</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Button variant="default" size="sm">Long Image</Button>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Auto Split</span>
                            <Switch 
                              checked={autoSplit} 
                              onCheckedChange={setAutoSplit} 
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 flex items-center justify-center rounded-full border">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                          <span className="text-sm">Single card without splitting</span>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Size</h4>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm text-muted-foreground">Width</label>
                              <div className="flex items-center gap-2">
                                <div className="flex-1">
                                  <input
                                    type="text"
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                    className="w-full px-2 py-1 text-sm border rounded-md"
                                  />
                                </div>
                                <span className="text-sm text-muted-foreground">px</span>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm text-muted-foreground">Height</label>
                              <div className="flex items-center gap-2">
                                <div className="flex-1">
                                  <input
                                    type="text"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="w-full px-2 py-1 text-sm border rounded-md"
                                  />
                                </div>
                                <span className="text-sm text-muted-foreground">px</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Editor.settings.overHidden</h4>
                            <Switch />
                          </div>
                          
                          <div className="relative">
                            <select className="w-full px-2 py-2 text-sm border rounded-md appearance-none">
                              <option>选择设计尺寸...</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 opacity-50" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">100%</span>
                          </div>
                          <Slider
                            defaultValue={[zoom]}
                            max={200}
                            min={50}
                            step={5}
                            onValueChange={(values) => setZoom(values[0])}
                          />
                        </div>
                        
                        <div className="space-y-4 mt-6">
                          <h4 className="text-sm font-medium">Style Presets</h4>
                          
                          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                            {styleOptions.map((style) => (
                              <div 
                                key={style}
                                className={`p-2 rounded-md cursor-pointer ${activeStyle === style ? 'bg-accent' : 'hover:bg-accent/50'}`}
                                onClick={() => setActiveStyle(style)}
                              >
                                <span className="text-sm">{style}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <CardPreview 
              html={html} 
              isMobile={devicePreview === DevicePreview.Mobile} 
              width={parseInt(width)}
              height={parseInt(height)}
              zoom={zoom / 100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
