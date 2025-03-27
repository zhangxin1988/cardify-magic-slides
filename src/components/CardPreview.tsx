
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardPreviewProps {
  html: string;
  isMobile: boolean;
  width?: number;
  height?: number;
  zoom?: number;
}

const CardPreview: React.FC<CardPreviewProps> = ({ 
  html, 
  isMobile, 
  width = 440, 
  height = 586, 
  zoom = 1 
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
  
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 relative">
      <div 
        className="relative bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-auto"
        style={{ 
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${zoom})`,
          transformOrigin: 'center',
          transition: 'transform 0.3s ease'
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
