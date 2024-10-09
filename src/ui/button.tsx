import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={`px-4 py-2 bg-accent text-white rounded hover:bg-accent-hover ${className}`}>
      {children}
    </button>
  );
};