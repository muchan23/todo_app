import { MAX_TEXT_LENGTH } from "../types";

// UUID生成
export function generateId(): string {
    return crypto.randomUUID();
}

// 現在の日時を取得（UTC）
export function getCurrentDateTime(): string {
    return new Date().toISOString();
}

// UTC 日時を日本時間に変換してフォーマット
export function formatToJapaneseTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleString('ja-JP', {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 日付のみをフォーマット（YYYY/MM/DD）
export function formatDateOnly(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString('ja-JP', {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

// 日付が今日かどうかを確認
export function isToday(isoString: string): boolean {
    const entryDate = new Date(isoString);
    const today = new Date();
    
    const entryDateStr = entryDate.toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' });
    const todayStr = today.toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' });

    return entryDateStr === todayStr;
}

// 文字数制限チェック
export function isWithinCharacterLimit(text: string): boolean {
    return text.length <= MAX_TEXT_LENGTH;
}