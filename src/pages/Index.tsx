
import { useState, useEffect } from "react";
import { Download, FileText, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import { getDefaultMarkdown, exportToHtml, exportToPdf } from "../utils/markdownConverter";

const Index = () => {
  const [markdown, setMarkdown] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // Load saved markdown from localStorage or use default
    const savedMarkdown = localStorage.getItem("markdownContent");
    if (savedMarkdown) {
      setMarkdown(savedMarkdown);
    } else {
      setMarkdown(getDefaultMarkdown());
    }
  }, []);

  // Save markdown to localStorage when changed
  useEffect(() => {
    if (markdown) {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Simple and Beautiful
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Transform Your Markdown Into Beautiful Cards
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Write in markdown and instantly see it transformed into elegant, presentation-ready cards or slides.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button 
              className="btn-primary flex items-center gap-2"
              onClick={handleExportToHtml}
              disabled={isExporting}
            >
              <Download className="h-4 w-4" />
              <span>Export HTML</span>
            </button>
            <button 
              className="btn-primary flex items-center gap-2"
              onClick={handleExportToPdf}
              disabled={isExporting}
            >
              <FileText className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
            <button
              className="btn-primary flex items-center gap-2"
              onClick={handleCopyToClipboard}
            >
              <Copy className="h-4 w-4" />
              <span>Copy Markdown</span>
            </button>
            <button 
              className="btn-primary flex items-center gap-2"
              onClick={() => toast.success("Coming soon!")}
            >
              <ExternalLink className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="glass-card overflow-hidden">
            <Editor value={markdown} onChange={setMarkdown} />
          </div>
          <div className="glass-card overflow-hidden">
            <Preview markdown={markdown} />
          </div>
        </div>
        
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Create Beautiful Slides Effortlessly</h2>
          <p className="text-muted-foreground mb-8">
            Separate your content with <code>---</code> to create multiple cards or slides. Perfect for presentations, notes, or social media posts.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Feature cards */}
            <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 mx-auto">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Markdown Support</h3>
              <p className="text-muted-foreground text-sm">
                Full support for all markdown syntax including tables, code blocks, and more.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 mx-auto">
                <Download className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Export</h3>
              <p className="text-muted-foreground text-sm">
                Export your cards as HTML or PDF for sharing and presentation.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 mx-auto">
                <Copy className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Auto-Save</h3>
              <p className="text-muted-foreground text-sm">
                Your work is automatically saved in your browser for convenience.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
