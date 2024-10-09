import React from 'react';

export const Tabs: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return <div {...props} className={className}>{children}</div>;
};

export const TabsContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return <div {...props} className={className}>{children}</div>;
};

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return <div {...props} className={`flex ${className}`}>{children}</div>;
};

export const TabsTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
  return <button {...props} className={`px-4 py-2 bg-secondary-background hover:bg-accent hover:text-white ${className}`}>{children}</button>;
};