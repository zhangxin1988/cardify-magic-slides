
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardPreviewProps {
  html: string;
  isMobile: boolean;
}

const CardPreview: React.FC<CardPreviewProps> = ({ html, isMobile }) => {
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
    <div className="h-full flex flex-col">
      <div className="border-b border-border p-2 flex items-center justify-between bg-background/50">
        <span className="text-sm font-medium">Preview</span>
        {slides.length > 1 && (
          <div className="flex items-center">
            <span className="text-xs text-muted-foreground">
              Slide {currentSlide + 1} of {slides.length}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden bg-accent/10">
        <div 
          className={`relative ${isMobile ? 'w-[375px] h-[667px]' : 'w-full max-w-4xl'} flex items-center justify-center overflow-hidden`}
        >
          <div 
            className={`bg-white dark:bg-slate-900 rounded-lg shadow-lg w-full h-full overflow-auto p-6 animate-scale-in`}
          >
            <div 
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: slides[currentSlide] || "" }}
            />
          </div>
        </div>
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
