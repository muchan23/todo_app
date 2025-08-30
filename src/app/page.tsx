"use client";

import { useDiary } from '../lib/hooks/useDiary';
import { DiaryInput } from '../components/DiaryInput';
import { DiaryList } from '../components/DiaryList';
import { ErrorDisplay } from '../components/ErrorDisplay';

export default function Home() {
  const {
    entries,
    loading,
    error,
    addEntry,
    deleteEntry,
    clearError
  } = useDiary();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ErrorDisplay 
        error={error} 
        onClear={clearError} 
      />
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            日記アプリ
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            今日の出来事を記録しましょう
          </p>
        </header>

        <main className="space-y-8">
          <DiaryInput 
            onAdd={addEntry} 
            disabled={loading} 
          />
          
          <DiaryList 
            entries={entries} 
            onDelete={deleteEntry} 
            loading={loading} 
          />
        </main>
      </div>
    </div>
  );
}
