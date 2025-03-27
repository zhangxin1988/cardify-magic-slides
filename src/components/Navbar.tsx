
import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">MD2Card</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/editor" className="text-sm font-medium hover:text-primary transition-colors">
            Editor
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/editor" 
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Open Editor
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
