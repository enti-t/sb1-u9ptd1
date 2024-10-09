import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronLeft, Plus, File, Folder, Send } from 'lucide-react';

interface StoryArchiveProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

const StoryArchive: React.FC<StoryArchiveProps> = ({ isMinimized, onToggleMinimize }) => {
  const [files, setFiles] = useState([
    { id: 1, name: 'Chapter 1', type: 'file' },
    { id: 2, name: 'Characters', type: 'folder' },
    { id: 3, name: 'Worldbuilding', type: 'folder' },
  ]);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: "Hello! I'm the Archivist. I can help you navigate and search through your story archive. How may I assist you?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [showAddOptions, setShowAddOptions] = useState(false);

  const handleAddItem = (type: 'file' | 'folder') => {
    const newItem = { id: Date.now(), name: `New ${type}`, type };
    setFiles([...files, newItem]);
    setShowAddOptions(false);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { role: 'user', content: chatInput }]);
      setChatInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xs font-semibold">STORY ARCHIVE</h2>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setShowAddOptions(!showAddOptions)} className="p-1 mr-1">
            <Plus size={12} />
          </Button>
          <Button variant="ghost" size="sm" onClick={onToggleMinimize} className="p-1">
            <ChevronLeft size={12} />
          </Button>
        </div>
      </div>
      {showAddOptions && (
        <div className="flex justify-end mb-2 space-x-1">
          <Button variant="outline" size="sm" onClick={() => handleAddItem('file')} className="text-xs p-1">
            File
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAddItem('folder')} className="text-xs p-1">
            Folder
          </Button>
        </div>
      )}
      <ScrollArea className="flex-grow mb-2">
        {files.map((item) => (
          <div key={item.id} className="flex items-center mb-1">
            {item.type === 'file' ? <File size={12} /> : <Folder size={12} />}
            <span className="ml-2 text-xs">{item.name}</span>
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto">
        <h3 className="text-xs font-semibold mb-1">Archivist</h3>
        <ScrollArea className="h-24 mb-2 bg-gray-800 rounded p-1">
          {chatMessages.map((msg, index) => (
            <p key={index} className={`mb-1 text-xs ${msg.role === 'assistant' ? 'text-blue-400' : 'text-white'}`}>
              {msg.content}
            </p>
          ))}
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="flex">
          <Input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask Archivist..."
            className="flex-grow mr-1 text-xs h-6"
          />
          <Button type="submit" size="sm" className="p-1 h-6">
            <Send size={12} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StoryArchive;