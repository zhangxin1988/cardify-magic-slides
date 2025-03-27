
import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CardSettingsProps {
  width: string;
  height: string;
  zoom: number;
  autoSplit: boolean;
  activeStyle: string;
  styleOptions: string[];
  onWidthChange: (value: string) => void;
  onHeightChange: (value: string) => void;
  onZoomChange: (value: number) => void;
  onAutoSplitChange: (value: boolean) => void;
  onStyleChange: (style: string) => void;
  onExportLongImage: () => void;
}

const CardSettings: React.FC<CardSettingsProps> = ({
  width,
  height,
  zoom,
  autoSplit,
  activeStyle,
  styleOptions,
  onWidthChange,
  onHeightChange,
  onZoomChange,
  onAutoSplitChange,
  onStyleChange,
  onExportLongImage,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Card Settings</h3>
      
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <Button 
            variant="default" 
            size="sm"
            onClick={onExportLongImage}
          >
            Export Long Image
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm">Auto Split</span>
            <Switch 
              checked={autoSplit} 
              onCheckedChange={onAutoSplitChange} 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center rounded-full border">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
          </div>
          <span className="text-sm">Single card without splitting</span>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Size</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Width</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={width}
                  onChange={(e) => onWidthChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-md"
                />
                <span className="text-sm text-muted-foreground">px</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Height</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={height}
                  onChange={(e) => onHeightChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-md"
                />
                <span className="text-sm text-muted-foreground">px</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Overflow Hidden</h4>
            <Switch defaultChecked />
          </div>
          
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select template size..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="twitter">Twitter Post (1200×675px)</SelectItem>
              <SelectItem value="instagram-post">Instagram Post (1080×1080px)</SelectItem>
              <SelectItem value="instagram-story">Instagram Story (1080×1920px)</SelectItem>
              <SelectItem value="facebook">Facebook Post (1200×630px)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Zoom: {zoom}%</span>
          </div>
          <Slider
            value={[zoom]}
            max={200}
            min={50}
            step={5}
            onValueChange={(values) => onZoomChange(values[0])}
          />
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Style Presets</h4>
          
          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-1">
            {styleOptions.map((style) => (
              <div 
                key={style}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  activeStyle === style 
                    ? 'bg-accent text-accent-foreground' 
                    : 'hover:bg-accent/50'
                }`}
                onClick={() => onStyleChange(style)}
              >
                <span className="text-sm">{style}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSettings;
