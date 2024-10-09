import React from 'react';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
  return (
    <input {...props} className={`px-3 py-2 bg-secondary-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent ${className}`} />
  );
};