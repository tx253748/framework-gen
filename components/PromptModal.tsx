'use client';

import { useState } from 'react';
import { generatePrompt } from '@/lib/prompts';
import { FRAMEWORKS } from '@/lib/frameworks';

interface PromptModalProps {
  frameworkId: string;
  onClose: () => void;
}

export default function PromptModal({ frameworkId, onClose }: PromptModalProps) {
  const [selectedFramework, setSelectedFramework] = useState(frameworkId);
  const [businessDescription, setBusinessDescription] = useState('');
  const [copied, setCopied] = useState(false);

  const prompt = generatePrompt(selectedFramework, businessDescription || '[ここにビジネス概要を入力]');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">🤖 AIプロンプト生成</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
        </div>
        
        <div className="p-4 flex-1 overflow-auto">
          <p className="text-sm text-gray-600 mb-4">
            以下のプロンプトをChatGPT/Claude/Geminiなどに入力すると、<br />
            インポート可能な形式で分析結果が出力されます。
          </p>

          {/* フレームワーク選択 */}
          <div className="mb-4">
            <label className="text-sm font-medium block mb-2">フレームワーク選択</label>
            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              {Object.values(FRAMEWORKS).map(fw => (
                <option key={fw.id} value={fw.id}>
                  {fw.name} ({fw.shortName})
                </option>
              ))}
            </select>
          </div>

          {/* ビジネス概要入力 */}
          <div className="mb-4">
            <label className="text-sm font-medium block mb-2">ビジネス概要（任意）</label>
            <textarea
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
              placeholder="例: オンラインで完結する法人向け経理代行サービス。中小企業をターゲットに、月額3万円から利用可能。"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-y"
            />
          </div>

          {/* 生成されたプロンプト */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">生成されたプロンプト</label>
              <button
                onClick={handleCopy}
                className={`text-xs px-3 py-1 rounded ${
                  copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {copied ? '✓ コピーしました' : 'コピー'}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md text-xs overflow-auto max-h-80 whitespace-pre-wrap">
              {prompt}
            </pre>
          </div>

          {/* 使い方 */}
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">💡 使い方</h3>
            <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
              <li>上記プロンプトをコピー</li>
              <li>ChatGPT/Claude/Geminiなどに貼り付けて実行</li>
              <li>出力されたJSONをコピー</li>
              <li>「インポート」ボタンから貼り付け</li>
            </ol>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
