"use client";

import { useState, useCallback, KeyboardEvent } from 'react';
import { getTextLength, getRemainingCharacters } from '../lib/validation';

interface DiaryInputProps {
  onAdd: (text: string) => Promise<boolean>;
  disabled?: boolean;
}

export function DiaryInput({ onAdd, disabled = false }: DiaryInputProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!text.trim() || isSubmitting || disabled) return;

    setIsSubmitting(true);
    const success = await onAdd(text);
    if (success) {
      setText('');
    }
    setIsSubmitting(false);
  }, [text, onAdd, isSubmitting, disabled]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  const remainingChars = getRemainingCharacters(text);
  const isOverLimit = remainingChars < 0;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="今日の出来事を書いてください"
          disabled={disabled || isSubmitting}
          className={`
            w-full min-h-[120px] p-4 border rounded-lg resize-none
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isOverLimit ? 'border-red-500' : 'border-gray-300'}
            dark:bg-gray-800 dark:border-gray-600 dark:text-white
          `}
        />
        
        {/* 文字数カウンター */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          <span className={isOverLimit ? 'text-red-500' : ''}>
            {getTextLength(text)}/{10000}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          ⌘/Ctrl + Enter で追加
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || isSubmitting || disabled || isOverLimit}
          className={`
            px-6 py-2 rounded-lg font-medium transition-colors
            ${!text.trim() || isSubmitting || disabled || isOverLimit
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
            }
          `}
        >
          {isSubmitting ? '追加中...' : '追加'}
        </button>
      </div>
    </div>
  );
}
