import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  rightAction?: React.ReactNode;
}

export default function TextArea({ label, error, rightAction, className = '', id, ...props }: TextAreaProps) {
  const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label htmlFor={textareaId} className="block text-sm font-medium text-slate-300">
          {label}
        </label>
        {rightAction}
      </div>
      <textarea
        id={textareaId}
        className={`w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-white/20 resize-y min-h-[100px] ${
          error ? 'border-red-500/50 focus:ring-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
