import { Framework, FRAMEWORKS } from './frameworks';

// AIプロンプトを生成
export const generatePrompt = (frameworkId: string, businessDescription: string): string => {
  const framework = FRAMEWORKS[frameworkId];
  if (!framework) return '';

  const fields = framework.fields
    .filter(f => f.id !== 'projectName')
    .map(f => `  "${f.id}": "${f.label}（${f.sublabel}）- ${f.placeholder}"`)
    .join(',\n');

  return `以下のビジネス/プロジェクトについて、${framework.name}（${framework.shortName}）で分析してください。

【ビジネス概要】
${businessDescription}

【出力形式】
以下のJSON形式で出力してください。各フィールドは日本語で、具体的かつ実用的な内容を記載してください。

\`\`\`json
{
  "framework": "${frameworkId}",
  "projectName": "プロジェクト名をここに",
  "data": {
${fields}
  }
}
\`\`\`

【注意事項】
- 各項目は箇条書きで3-5点程度を目安に
- 具体的な数値や事例を含める
- 実行可能なアクションを意識する
- JSON形式を厳守すること`;
};

// 全フレームワークのプロンプトテンプレート一覧
export const getAllPromptTemplates = (): Record<string, string> => {
  const templates: Record<string, string> = {};
  Object.keys(FRAMEWORKS).forEach(id => {
    templates[id] = generatePrompt(id, '[ここにビジネス概要を入力]');
  });
  return templates;
};

// インポート用JSONのバリデーション
export const validateImportData = (data: unknown): { valid: boolean; error?: string; data?: any } => {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'JSONオブジェクトが必要です' };
  }

  const obj = data as Record<string, unknown>;

  if (!obj.framework || typeof obj.framework !== 'string') {
    return { valid: false, error: 'frameworkフィールドが必要です' };
  }

  if (!FRAMEWORKS[obj.framework]) {
    return { valid: false, error: `不明なフレームワーク: ${obj.framework}` };
  }

  if (!obj.data || typeof obj.data !== 'object') {
    return { valid: false, error: 'dataフィールドが必要です' };
  }

  return { valid: true, data: obj };
};

// JSONからインポートデータを解析
export const parseImportJSON = (jsonString: string): { success: boolean; error?: string; data?: any } => {
  try {
    // コードブロックを除去
    let cleaned = jsonString.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.slice(3);
    }
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.slice(0, -3);
    }
    cleaned = cleaned.trim();

    const parsed = JSON.parse(cleaned);
    const validation = validateImportData(parsed);
    
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    return { success: true, data: validation.data };
  } catch (e) {
    return { success: false, error: 'JSONの解析に失敗しました' };
  }
};
