
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardPreviewProps {
  html: string;
  isMobile: boolean;
  width?: number;
  height?: number;
  zoom?: number;
  style?: string;
}

const CardPreview: React.FC<CardPreviewProps> = ({ 
  html, 
  isMobile, 
  width = 440, 
  height = 586, 
  zoom = 1,
  style = "Apple Notes"
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Split HTML into slides if it contains horizontal rules
  const slides = html.split('<hr>');
  
  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Get card style based on style preset
  const getCardStyle = () => {
    switch (style) {
      case "Pop Art":
        return "bg-gradient-to-br from-pink-400 to-purple-500 dark:from-pink-600 dark:to-purple-700 text-white";
      case "Art deco":
        return "bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-700";
      case "Glass Morphism":
        return "glass-card backdrop-blur";
      case "Warm & Soft":
        return "bg-gradient-to-br from-orange-50 to-rose-100 dark:from-orange-900/40 dark:to-rose-900/40";
      case "Minimal Gray":
        return "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700";
      case "Dreamy Gradient":
        return "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30";
      case "Fresh Nature":
        return "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40";
      default: // Apple Notes
        return "bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800";
    }
  };
  
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 relative">
      <div 
        className={`relative rounded-lg shadow-lg overflow-auto ${getCardStyle()}`}
        style={{ 
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${zoom})`,
          transformOrigin: 'center',
          transition: 'transform 0.3s ease, background 0.3s ease, border 0.3s ease'
        }}
      >
        <div 
          className="markdown-body p-6"
          dangerouslySetInnerHTML={{ __html: slides[currentSlide] || "" }}
        />
      </div>
      
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center space-x-4">
          <button 
            onClick={goToPrevSlide}
            disabled={currentSlide === 0}
            className={`p-2 rounded-full ${
              currentSlide === 0 
                ? 'text-muted-foreground bg-muted cursor-not-allowed' 
                : 'text-foreground bg-secondary hover:bg-secondary/80'
            } transition-colors`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs text-muted-foreground">
            {currentSlide + 1} / {slides.length}
          </span>
          <button 
            onClick={goToNextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`p-2 rounded-full ${
              currentSlide === slides.length - 1 
                ? 'text-muted-foreground bg-muted cursor-not-allowed' 
                : 'text-foreground bg-secondary hover:bg-secondary/80'
            } transition-colors`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardPreview;
