
import { Github } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { toast } from "sonner";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-md bg-background/80 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            M
          </div>
          <a href="/" className="font-medium text-lg tracking-tight">
            Markdown Card
          </a>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            className="hidden sm:flex text-sm font-medium hover:text-primary transition-colors"
            onClick={() => toast.success("Coming soon!")}
          >
            Templates
          </button>
          <button 
            className="hidden sm:flex text-sm font-medium hover:text-primary transition-colors"
            onClick={() => toast.success("Coming soon!")}
          >
            Docs
          </button>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="GitHub repository"
          >
            <Github className="h-5 w-5" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
