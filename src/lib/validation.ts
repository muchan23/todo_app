import { ValidationResult } from '@/types';

const MAX_TEXT_LENGTH = 10000;

export const ERROR_MESSAGES = {
    EMPTY_TEXT: '記録を入力してください',
    TEXT_TOO_LONG: '1万文字を超えています',
    SAVE_FAILED: '保存に失敗しました。再実行してください。',
    DELETE_CONFIRM: 'この記録を削除しますか？'
} as const;

export function validateText(text: string): ValidationResult {
    if (text.trim().length === 0) {
        return {
            isValid: false,
            errorMessage: ERROR_MESSAGES.EMPTY_TEXT
        };
    }

    if (text.length > MAX_TEXT_LENGTH) {
        return {
            isValid: false,
            errorMessage: ERROR_MESSAGES.TEXT_TOO_LONG
        };
    }

    return { isValid: true };
}

export function getTextLength(text: string): number {
    return text.length;
}

export function getRemainingCharacters(text: string): number {
    return MAX_TEXT_LENGTH - text.length;
}

export function confirmDelete(): boolean {
    return window.confirm(ERROR_MESSAGES.DELETE_CONFIRM);
}