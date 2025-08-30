"use client";

import { useState, useCallback, useEffect } from 'react';
import { Entry } from '../../types';
import { saveEntry, getEntries, deleteEntry as deleteEntryFromDB } from '../database';
import { validateText } from '../validation';
import { generateId, getCurrentDateTime } from '../utils';

export function useDiary() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 初期データの読み込み
  useEffect(() => {
    loadEntries();
  }, []);

  // エントリーを取得
  const loadEntries = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getEntries();
      setEntries(data);
    } catch (err) {
      setError('データの読み込みに失敗しました');
      console.error('データ読み込みエラー:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // エントリーを追加
  const addEntry = useCallback(async (text: string): Promise<boolean> => {
    // バリデーション
    const validation = validateText(text);
    if (!validation.isValid) {
      setError(validation.errorMessage || '入力に問題があります');
      return false;
    }

    // エラーメッセージをクリア
    setError(null);

    // 新しいエントリーを作成
    const newEntry: Entry = {
      id: generateId(),
      text: text.trim(),
      createdAt: getCurrentDateTime()
    };

    try {
      // データベースに保存
      await saveEntry(newEntry);
      
      // ローカル状態を更新（新しいエントリーを先頭に追加）
      setEntries(prev => [newEntry, ...prev]);
      
      return true;
    } catch (err) {
      setError('保存に失敗しました。再試行してください。');
      console.error('保存エラー:', err);
      return false;
    }
  }, []);

  // エントリーを削除
  const deleteEntry = useCallback(async (id: string): Promise<boolean> => {
    try {
      // データベースから削除
      await deleteEntryFromDB(id);
      
      // ローカル状態を更新
      setEntries(prev => prev.filter(entry => entry.id !== id));
      
      return true;
    } catch (err) {
      setError('削除に失敗しました。再試行してください。');
      console.error('削除エラー:', err);
      return false;
    }
  }, []);

  // エラーメッセージをクリア
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 今日のエントリーを取得
  const getTodayEntries = useCallback(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD形式
    return entries.filter(entry => 
      entry.createdAt.startsWith(today)
    );
  }, [entries]);

  // エントリー数を取得
  const getEntryCount = useCallback(() => {
    return entries.length;
  }, [entries]);

  return {
    // 状態
    entries,
    loading,
    error,
    
    // アクション
    loadEntries,
    addEntry,
    deleteEntry,
    clearError,
    
    // 計算値
    getTodayEntries,
    getEntryCount
  };
}