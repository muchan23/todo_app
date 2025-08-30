"use client";

import { useState } from 'react';
import { Entry } from '../types';
import { confirmDelete } from '../lib/validation';

interface DiaryEntryProps {
  entry: Entry;
  onDelete: (id: string) => Promise<boolean>;
}

export function DiaryEntry({ entry, onDelete }: DiaryEntryProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirmDelete()) return;
    
    setIsDeleting(true);
    await onDelete(entry.id);
    setIsDeleting(false);
  };

  // ISO8601 UTCを日本時間に変換して表示
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Tokyo'
    }).format(date);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          {/* 本文 */}
          <div className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
            {entry.text}
          </div>
          
          {/* 作成日時 */}
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            {formatDate(entry.createdAt)}
          </div>
        </div>
        
        {/* 削除ボタン */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`
            flex-shrink-0 p-2 rounded-lg transition-colors
            ${isDeleting
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200'
            }
            dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30
          `}
          aria-label="この記録を削除"
          title="削除"
        >
          {isDeleting ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
