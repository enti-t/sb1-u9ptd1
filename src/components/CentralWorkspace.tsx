import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import Atlas from './Atlas';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  FileText, LayoutList, Book, ChevronRight, ChevronLeft, Plus, ArrowUpDown, 
  Maximize2, Minimize2, BookOpen, Send, ChevronUp, ChevronDown
} from 'lucide-react';

interface CentralWorkspaceProps {
  leftPaneMinimized: boolean;
  rightPaneMinimized: boolean;
  setLeftPaneMinimized: (minimized: boolean) => void;
  setRightPaneMinimized: (minimized: boolean) => void;
}

const CentralWorkspace: React.FC<CentralWorkspaceProps> = ({
  leftPaneMinimized,
  rightPaneMinimized,
  setLeftPaneMinimized,
  setRightPaneMinimized
}) => {
  const [centralView, setCentralView] = useState<'draft' | 'outline' | 'act' | 'atlas'>('draft');
  const [zoom, setZoom] = useState(100);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState(16);
  const [atlasMinimized, setAtlasMinimized] = useState(false);
  
  // IMPORTANT: Maintain these states for Outline and Act views
  const [outlineItems, setOutlineItems] = useState([
    { id: 1, text: 'Act 1: Introduction' },
    { id: 2, text: 'Act 2: Rising Action' },
    { id: 3, text: 'Act 3: Climax' },
    { id: 4, text: 'Act 4: Falling Action' },
    { id: 5, text: 'Act 5: Resolution' },
  ]);
  const [actContents, setActContents] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
  });

  const renderToolbar = () => (
    <div className="flex items-center justify-between p-2 bg-gray-800 text-white text-xs">
      <div className="flex items-center space-x-2">
        {leftPaneMinimized && (
          <Button variant="ghost" size="sm" onClick={() => setLeftPaneMinimized(false)} className="p-1">
            <ChevronRight size={12} />
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={() => setCentralView('draft')} className="p-1"><FileText size={12} /></Button>
        <Button variant="ghost" size="sm" onClick={() => setCentralView('outline')} className="p-1"><LayoutList size={12} /></Button>
        <Button variant="ghost" size="sm" onClick={() => setCentralView('act')} className="p-1"><Book size={12} /></Button>
        <Button variant="ghost" size="sm" onClick={() => setCentralView('atlas')} className="p-1"><BookOpen size={12} /></Button>
        <Select value={fontFamily} onValueChange={setFontFamily}>
          <SelectTrigger className="w-24 h-7 text-xs">
            <SelectValue placeholder="Font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
            <SelectItem value="Courier New">Courier New</SelectItem>
          </SelectContent>
        </Select>
        <Select value={fontSize.toString()} onValueChange={(value) => setFontSize(parseInt(value))}>
          <SelectTrigger className="w-16 h-7 text-xs">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            {[12, 14, 16, 18, 20, 24].map((size) => (
              <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="ghost" size="sm" className="p-1"><Bold size={12} /></Button>
        <Button variant="ghost" size="sm" className="p-1"><Italic size={12} /></Button>
        <Button variant="ghost" size="sm" className="p-1"><Underline size={12} /></Button>
        <Button variant="ghost" size="sm" className="p-1"><AlignLeft size={12} /></Button>
        <Button variant="ghost" size="sm" className="p-1"><AlignCenter size={12} /></Button>
        <Button variant="ghost" size="sm" className="p-1"><AlignRight size={12} /></Button>
        <Button variant="ghost" size="sm" className="p-1"><AlignJustify size={12} /></Button>
      </div>
      <div className="flex items-center space-x-2">
        <Select value={zoom.toString()} onValueChange={(value) => setZoom(parseInt(value))}>
          <SelectTrigger className="w-20 h-7 text-xs">
            <SelectValue placeholder="Zoom" />
          </SelectTrigger>
          <SelectContent>
            {[50, 75, 100, 125, 150, 200].map((zoomLevel) => (
              <SelectItem key={zoomLevel} value={zoomLevel.toString()}>{zoomLevel}%</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {rightPaneMinimized && (
          <Button variant="ghost" size="sm" onClick={() => setRightPaneMinimized(false)} className="p-1">
            <ChevronLeft size={12} />
          </Button>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (centralView) {
      case 'draft':
        return (
          <ScrollArea className="flex-grow overflow-auto p-4">
            <div 
              className="bg-white shadow-lg mx-auto"
              style={{
                width: '210mm',
                minHeight: '297mm',
                padding: '25mm',
                boxSizing: 'border-box',
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
              }}
            >
              <Textarea
                className="w-full h-full resize-none border-none focus:outline-none"
                placeholder="Start writing your masterpiece..."
                style={{
                  fontFamily: fontFamily,
                  fontSize: `${fontSize}px`,
                }}
              />
            </div>
          </ScrollArea>
        );
      case 'outline':
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Outline</h2>
            {outlineItems.map((item, index) => (
              <div key={item.id} className="flex items-center mb-2">
                <Input
                  value={item.text}
                  onChange={(e) => {
                    const newItems = [...outlineItems];
                    newItems[index].text = e.target.value;
                    setOutlineItems(newItems);
                  }}
                  className="flex-grow mr-2 text-xs"
                />
                <Button onClick={() => {
                  const newItems = outlineItems.filter((_, i) => i !== index);
                  setOutlineItems(newItems);
                }} size="sm" className="text-xs">
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={() => {
              const newItem = { id: Date.now(), text: `New Act ${outlineItems.length + 1}` };
              setOutlineItems([...outlineItems, newItem]);
            }} size="sm" className="mt-2 text-xs">
              Add Act
            </Button>
          </div>
        );
      case 'act':
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Act View</h2>
            {outlineItems.map((item) => (
              <div key={item.id} className="mb-4">
                <h3 className="text-sm font-semibold mb-2">{item.text}</h3>
                <Textarea
                  value={actContents[item.id]}
                  onChange={(e) => {
                    setActContents({
                      ...actContents,
                      [item.id]: e.target.value
                    });
                  }}
                  placeholder={`Write content for ${item.text} here...`}
                  className="w-full h-32 text-xs"
                />
              </div>
            ))}
          </div>
        );
      case 'atlas':
        return <Atlas expanded={true} onExpand={() => setCentralView('draft')} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {renderToolbar()}
      <div className={`flex-grow overflow-hidden ${atlasMinimized ? 'h-[calc(100%-2rem)]' : 'h-[calc(75%-2rem)]'}`}>
        {renderContent()}
      </div>
      {centralView !== 'atlas' && (
        <div className={`border-t border-gray-700 transition-all duration-300 ${atlasMinimized ? 'h-8' : 'h-[25%]'}`}>
          <div className="flex justify-between items-center p-1 bg-gray-800">
            <h2 className="text-xs font-semibold">ATLAS</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setAtlasMinimized(!atlasMinimized)}
              className="p-1"
            >
              {atlasMinimized ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </Button>
          </div>
          {!atlasMinimized && (
            <div className="h-[calc(100%-2rem)] overflow-hidden">
              <Atlas 
                expanded={false}
                onExpand={() => setCentralView('atlas')}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// IMPORTANT: The Outline and Act views are crucial features of this application.
// They must be maintained and included in all future iterations and updates.
// These views provide essential story structure and content organization functionality.

export default CentralWorkspace;