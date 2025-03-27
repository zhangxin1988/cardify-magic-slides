
import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto flex items-center h-14">
        <Link to="/" className="flex items-center space-x-2 ml-4">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg text-primary">MD2Card</span>
        </Link>
        
        <div className="flex-1"></div>
        
        <div className="flex items-center space-x-4 mr-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
