import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { 
  ChevronRight, Plus, Target, Calendar, Award, FileText
} from 'lucide-react';

interface DashboardProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isMinimized, onToggleMinimize }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Write 1000 words', completed: false },
    { id: 2, text: 'Edit Chapter 3', completed: true },
    { id: 3, text: 'Develop character arc', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleQuickStart = (label: string) => {
    console.log(`Quick start: ${label}`);
  };

  const renderProgressMeter = (label: string, percentage: number, color: string) => (
    <div className="flex items-center space-x-2">
      <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs">{label}: {percentage}%</span>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold">Dashboard</h2>
        <Button variant="ghost" size="sm" onClick={onToggleMinimize} className="p-1">
          <ChevronRight size={16} />
        </Button>
      </div>

      <div>
        <h3 className="text-xs font-semibold mb-2">Goals & To-Do</h3>
        <ScrollArea className="h-32 bg-gray-800 rounded p-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center mb-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => handleToggleTask(task.id)}
                className="mr-2"
              />
              <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.text}</span>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleAddTask} className="flex mt-2">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
            className="flex-grow mr-2 text-sm bg-gray-800"
          />
          <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus size={16} />
          </Button>
        </form>
      </div>

      <div>
        <h3 className="text-xs font-semibold mb-2">Quick Starts</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={() => handleQuickStart('Character Development')} className="text-xs p-2 bg-gray-800 border-gray-700 hover:bg-gray-700">
            <Target size={14} className="mr-1" /> Character
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleQuickStart('Plot Progression')} className="text-xs p-2 bg-gray-800 border-gray-700 hover:bg-gray-700">
            <Calendar size={14} className="mr-1" /> Plot
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleQuickStart('World Building')} className="text-xs p-2 bg-gray-800 border-gray-700 hover:bg-gray-700">
            <Award size={14} className="mr-1" /> World
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleQuickStart('Scene Ideas')} className="text-xs p-2 bg-gray-800 border-gray-700 hover:bg-gray-700">
            <FileText size={14} className="mr-1" /> Scene
          </Button>
        </div>
      </div>

      <div className="mt-auto">
        <h3 className="text-xs font-semibold mb-2">Progress</h3>
        <div className="space-y-2">
          {renderProgressMeter('Session', 50, '#3B82F6')}
          {renderProgressMeter('Weekly', 75, '#10B981')}
          {renderProgressMeter('Personal', 60, '#F59E0B')}
          {renderProgressMeter('Draft', 40, '#EF4444')}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;