// 要件定義に基づく型定義
export interface Entry {
    id: string;
    text: string;
    createdAt: string;
  }

export interface State {
  entries: Entry[];
}

// 入力値の検証結果
export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

// 文字数制限の定数
export const MAX_TEXT_LENGTH = 10000;