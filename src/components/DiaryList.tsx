"use client";

import { Entry } from '../types';
import { DiaryEntry } from './DiaryEntry';

interface DiaryListProps {
  entries: Entry[];
  onDelete: (id: string) => Promise<boolean>;
  loading?: boolean;
}

export function DiaryList({ entries, onDelete, loading = false }: DiaryListProps) {
  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-medium">まだ記録がありません</p>
          <p className="text-sm mt-2">今日の出来事を書き始めてみましょう</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        {entries.map((entry) => (
          <DiaryEntry
            key={entry.id}
            entry={entry}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
