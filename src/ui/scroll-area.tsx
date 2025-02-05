import React from 'react';

export const ScrollArea: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={`overflow-auto ${className}`}>
      {children}
    </div>
  );
};