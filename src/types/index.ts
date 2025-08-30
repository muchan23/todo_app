// 要件定義に基づく型定義
interface Entry {
    id: string;
    text: string;
    createdAt: string;
  }

interface State {
  entries: Entry[];
}

// 入力値の検証結果
interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

// 文字数制限の定数
const MAX_TEXT_LENGTH = 10000;