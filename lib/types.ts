// フレームワークのフィールド定義
export interface FrameworkField {
  id: string;
  label: string;
  sublabel: string;
  placeholder: string;
  type?: 'text' | 'textarea';
}

// フレームワーク定義
export interface Framework {
  id: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  fields: FrameworkField[];
  layout: string;
}

// フレームワークのデータ（入力値）
export type FrameworkData = Record<string, string>;

// 全フレームワークのデータ
export type AllFrameworkData = Record<string, FrameworkData>;

// AIからのインポート用JSON形式
export interface AIImportData {
  framework: string;  // フレームワークID
  projectName?: string;
  data: Record<string, string>;
  metadata?: {
    generatedAt?: string;
    model?: string;
    prompt?: string;
  };
}

// エクスポート形式
export interface ExportData {
  version: string;
  framework: string;
  projectName: string;
  data: FrameworkData;
  exportedAt: string;
}
