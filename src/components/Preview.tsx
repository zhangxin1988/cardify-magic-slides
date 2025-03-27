
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { markdownToSlides } from "../utils/markdownConverter";

interface PreviewProps {
  markdown: string;
}

const Preview = ({ markdown }: PreviewProps) => {
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Small delay to show animation
    const timer = setTimeout(() => {
      const processedSlides = markdownToSlides(markdown);
      setSlides(processedSlides);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [markdown]);

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

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="absolute top-0 left-0 right-0 p-2 border-b border-border bg-muted/30 rounded-t-xl flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Preview</span>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>
      
      <div className="flex-1 pt-12 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center p-4">
          {slides.length > 0 ? (
            <div className="preview-card w-full max-w-2xl mx-auto overflow-auto animate-scale-in">
              <div 
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: slides[currentSlide] || "" }} 
              />
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No content to display
            </div>
          )}
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

export default Preview;
