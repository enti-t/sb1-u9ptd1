import React from 'react';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={`px-3 py-2 bg-secondary-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent ${className}`}
      />
    );
  }
);

Textarea.displayName = 'Textarea';