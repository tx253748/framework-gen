'use client';

import { useState } from 'react';
import { parseImportJSON } from '@/lib/prompts';
import { FrameworkData } from '@/lib/types';

interface ImportModalProps {
  onClose: () => void;
  onImport: (data: { framework: string; projectName?: string; data: FrameworkData }) => void;
}

export default function ImportModal({ onClose, onImport }: ImportModalProps) {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const handleImport = () => {
    const result = parseImportJSON(jsonInput);
    if (!result.success) {
      setError(result.error || 'インポートに失敗しました');
      return;
    }
    onImport(result.data);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJsonInput(text);
      setError('');
    } catch {
      setError('クリップボードへのアクセスに失敗しました');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">📥 AIからインポート</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
        </div>
        
        <div className="p-4 flex-1 overflow-auto">
          <p className="text-sm text-gray-600 mb-4">
            AIが生成したJSONをペーストしてください。<br />
            <code className="bg-gray-100 px-1 rounded">```json</code> で囲まれていても自動で解析します。
          </p>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">JSON入力</label>
              <button
                onClick={handlePaste}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                クリップボードから貼り付け
              </button>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => { setJsonInput(e.target.value); setError(''); }}
              placeholder={`{
  "framework": "bmc",
  "projectName": "プロジェクト名",
  "data": {
    "keyPartners": "...",
    ...
  }
}`}
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono resize-y focus:border-black"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600 mb-4">
              ⚠️ {error}
            </div>
          )}

          <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600">
            <strong>必須フィールド:</strong>
            <ul className="mt-1 list-disc list-inside">
              <li><code>framework</code>: フレームワークID（bmc, lean, swot など）</li>
              <li><code>data</code>: 各項目のデータ</li>
            </ul>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            キャンセル
          </button>
          <button
            onClick={handleImport}
            disabled={!jsonInput.trim()}
            className={`px-4 py-2 text-sm rounded-md ${
              jsonInput.trim()
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            インポート
          </button>
        </div>
      </div>
    </div>
  );
}
