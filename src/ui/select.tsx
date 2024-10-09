import React, { useState, useRef, useEffect } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ children, className, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.value || '');
  const selectRef = useRef<HTMLDivElement>(null);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <div
        className="flex items-center justify-between px-3 py-2 bg-[#1e1e2e] text-white border border-gray-600 rounded cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedValue || props.placeholder}</span>
        <span className="ml-2">▼</span>
      </div>
      {isOpen && (
        <div className="fixed z-50 mt-1 bg-[#1e1e2e] border border-gray-600 rounded shadow-lg" style={{
          top: selectRef.current ? selectRef.current.getBoundingClientRect().bottom + window.scrollY : 0,
          left: selectRef.current ? selectRef.current.getBoundingClientRect().left + window.scrollX : 0,
        }}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === SelectItem) {
              return React.cloneElement(child, {
                onClick: () => handleChange(child.props.value),
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const SelectItem: React.FC<SelectItemProps> = ({ children, value, ...props }) => {
  return (
    <div className="px-3 py-2 text-white cursor-pointer hover:bg-gray-700" {...props}>
      {children}
    </div>
  );
};

export const SelectTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export const SelectValue: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, ...props }) => (
  <span {...props}>{children}</span>
);

export const SelectContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};