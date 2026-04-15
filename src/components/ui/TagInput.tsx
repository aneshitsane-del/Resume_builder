'use client';

import React, { useState, KeyboardEvent } from 'react';
import { FiX } from 'react-icons/fi';

interface TagInputProps {
  label: string;
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
  placeholder?: string;
}

export default function TagInput({
  label,
  tags,
  onAddTag,
  onRemoveTag,
  placeholder = 'Type and press Enter',
}: TagInputProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      onAddTag(input.trim());
      setInput('');
    }
    if (e.key === 'Backspace' && !input && tags.length > 0) {
      onRemoveTag(tags.length - 1);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">{label}</label>
      <div className="flex flex-wrap gap-2 p-3 bg-white/5 border border-white/10 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all duration-200 hover:border-white/20">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-sm border border-indigo-500/30"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(i)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              <FiX size={14} />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-white placeholder-slate-500 text-sm"
        />
      </div>
    </div>
  );
}
