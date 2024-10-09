import React, { useState } from 'react';
import StoryArchive from "./components/StoryArchive";
import CentralWorkspace from "./components/CentralWorkspace";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  const [leftPaneMinimized, setLeftPaneMinimized] = useState(false);
  const [rightPaneMinimized, setRightPaneMinimized] = useState(false);

  return (
    <div className="app-container flex h-screen bg-gray-900 text-white">
      <div className={`${leftPaneMinimized ? 'w-0' : 'w-1/4'} transition-all duration-300`}>
        <StoryArchive 
          isMinimized={leftPaneMinimized}
          onToggleMinimize={() => setLeftPaneMinimized(!leftPaneMinimized)}
        />
      </div>
      <div className="flex-grow">
        <CentralWorkspace
          leftPaneMinimized={leftPaneMinimized}
          rightPaneMinimized={rightPaneMinimized}
          setLeftPaneMinimized={setLeftPaneMinimized}
          setRightPaneMinimized={setRightPaneMinimized}
        />
      </div>
      <div className={`${rightPaneMinimized ? 'w-0' : 'w-1/4'} transition-all duration-300`}>
        <Dashboard 
          isMinimized={rightPaneMinimized}
          onToggleMinimize={() => setRightPaneMinimized(!rightPaneMinimized)}
        />
      </div>
    </div>
  );
};

export default App;