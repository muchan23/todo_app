"use client";

import { useEffect, useState } from 'react';

interface ErrorDisplayProps {
  error: string | null;
  onClear: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
}

export function ErrorDisplay({ 
  error, 
  onClear, 
  autoHide = true, 
  autoHideDelay = 5000 
}: ErrorDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      
      if (autoHide) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(onClear, 300); // アニメーション完了後にクリア
        }, autoHideDelay);
        
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [error, autoHide, autoHideDelay, onClear]);

  if (!error) return null;

  return (
    <div className={`
      fixed top-4 left-1/2 transform -translate-x-1/2 z-50
      transition-all duration-300 ease-in-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
    `}>
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-lg max-w-md">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-medium">{error}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClear, 300);
            }}
            className="text-red-400 hover:text-red-600 transition-colors"
            aria-label="エラーメッセージを閉じる"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
