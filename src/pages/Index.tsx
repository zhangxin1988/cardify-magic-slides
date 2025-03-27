
import React from "react";
import { Link } from "react-router-dom";
import { FileText, Download, Copy, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Index = () => {
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
            <Link 
              to="/editor"
              className="btn-primary flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Open Editor</span>
            </Link>
          </div>
          
          <div className="aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden border border-border shadow-lg">
            <img 
              src="https://placekitten.com/800/450" 
              alt="Editor Preview" 
              className="w-full h-full object-cover" 
            />
          </div>
        </section>
        
        <section className="max-w-4xl mx-auto text-center mt-20">
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
          
          <div className="mt-12">
            <Link 
              to="/editor"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <ExternalLink className="h-5 w-5" />
              <span>Try the Editor Now</span>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
