import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { 
  Send, ChevronDown // Changed from Maximize2 to ChevronDown
} from 'lucide-react';

interface AtlasProps {
  expanded: boolean;
  onExpand?: () => void;
}

const Atlas: React.FC<AtlasProps> = ({ expanded, onExpand }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm Atlas, your writing assistant. How can I help you today?" }
  ]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      // Here you would typically send the message to an AI service and get a response
      // For now, we'll just echo the user's message
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: `You said: ${input}` }]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 p-3">
      {expanded && (
        <div className="flex justify-between items-center mb-3 bg-gray-800 p-2 rounded">
          <h2 className="text-sm font-semibold">ATLAS</h2>
          {onExpand && (
            <Button variant="ghost" size="sm" onClick={onExpand} className="p-1">
              <ChevronDown size={12} /> {/* Changed from Maximize2 to ChevronDown */}
            </Button>
          )}
        </div>
      )}
      <ScrollArea className="flex-grow mb-3">
        {messages.map((message, index) => (
          <p key={index} className={`mb-2 text-xs ${message.role === 'assistant' ? 'text-blue-400' : 'text-white'}`}>
            {message.content}
          </p>
        ))}
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="mt-auto">
        <div className="flex">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Atlas..."
            className="flex-grow mr-2 text-xs h-7"
          />
          <Button type="submit" size="sm" className="p-1 h-7">
            <Send size={12} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Atlas;