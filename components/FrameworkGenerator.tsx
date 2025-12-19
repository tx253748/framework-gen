'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FRAMEWORKS, CATEGORIES } from '@/lib/frameworks';
import { AllFrameworkData, FrameworkData } from '@/lib/types';
import { generatePrompt, parseImportJSON } from '@/lib/prompts';
import { canExport, recordExport, getRemainingExports, getDailyLimit, isPro, activateMaster, isMaster } from '@/lib/exportLimit';
import ImportModal from './ImportModal';
import PromptModal from './PromptModal';
import LimitModal from './LimitModal';
import CanvasPreview from './CanvasPreview';
import { exportAsImage } from '@/lib/export';

export default function FrameworkGenerator() {
  const searchParams = useSearchParams();
  const [activeFramework, setActiveFramework] = useState('bmc');
  const [formData, setFormData] = useState<AllFrameworkData>({});
  const [showCanvas, setShowCanvas] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [remaining, setRemaining] = useState(3);
  const [userIsPro, setUserIsPro] = useState(false);

  // 初期化時に残り回数を取得 & マスター権限チェック
  useEffect(() => {
    // URLパラメータでマスター権限有効化
    const masterKey = searchParams.get('master');
    if (masterKey) {
      const activated = activateMaster(masterKey);
      if (activated) {
        console.log('🔓 Master mode activated');
        // URLからパラメータを消す（履歴に残さない）
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
    
    setRemaining(getRemainingExports());
    setUserIsPro(isPro());
  }, [searchParams]);

  const framework = FRAMEWORKS[activeFramework];

  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [activeFramework]: { ...prev[activeFramework], [id]: value }
    }));
  };

  const getData = (id: string): string => formData[activeFramework]?.[id] || '';

  const handleExport = useCallback(async () => {
    // 回数制限チェック
    if (!canExport()) {
      setShowLimitModal(true);
      return;
    }

    setIsExporting(true);
    try {
      // Pro版でなければ透かし入り
      await exportAsImage(framework, formData[activeFramework] || {}, !userIsPro);
      
      // エクスポート回数を記録
      recordExport();
      setRemaining(getRemainingExports());
    } finally {
      setIsExporting(false);
    }
  }, [activeFramework, formData, framework, userIsPro]);

  const handleImport = (data: { framework: string; projectName?: string; data: FrameworkData }) => {
    setActiveFramework(data.framework);
    setFormData(prev => ({
      ...prev,
      [data.framework]: {
        ...data.data,
        projectName: data.projectName || ''
      }
    }));
    setShowCanvas(true);
    setShowImportModal(false);
  };

  const handleFrameworkChange = (id: string) => {
    setActiveFramework(id);
    setShowCanvas(false);
  };

  const inputFields = framework.fields.filter(f => f.type !== 'text');

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-10 py-5 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold">📊 Business Framework Generator</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPromptModal(true)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                🤖 AIプロンプト
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition"
              >
                📥 インポート
              </button>
            </div>
          </div>
          
          {/* カテゴリ別タブ */}
          <div className="flex flex-wrap gap-4">
            {Object.entries(CATEGORIES).map(([cat, ids]) => (
              <div key={cat} className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 min-w-[60px]">{cat}</span>
                <div className="flex gap-1 flex-wrap">
                  {ids.map(id => (
                    <button
                      key={id}
                      onClick={() => handleFrameworkChange(id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition ${
                        activeFramework === id
                          ? 'bg-black text-white'
                          : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {FRAMEWORKS[id].shortName}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-10 py-6">
        {/* フレームワーク説明 */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-5 flex justify-between items-center">
          <div>
            <h2 className="text-base font-semibold">{framework.name}</h2>
            <p className="text-sm text-gray-600">{framework.description}</p>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded">{framework.category}</span>
        </div>

        {/* プロジェクト名入力 */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-5">
          <label className="block text-xs font-semibold text-gray-700 mb-2">プロジェクト名</label>
          <input
            type="text"
            value={getData('projectName')}
            onChange={(e) => handleChange('projectName', e.target.value)}
            placeholder="例: 新規事業プロジェクト"
            className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-black transition"
          />
        </div>

        {/* 入力フォームグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
          {inputFields.map(field => (
            <div key={field.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="mb-2">
                <div className="text-sm font-semibold">{field.label}</div>
                <div className="text-[10px] text-gray-500">{field.sublabel}</div>
              </div>
              <textarea
                value={getData(field.id)}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm resize-y focus:border-black transition"
              />
            </div>
          ))}
        </div>

        {/* アクションボタン */}
        <div className="flex items-center gap-3 mb-6 no-print">
          <button
            onClick={() => setShowCanvas(true)}
            className="px-6 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
          >
            プレビュー
          </button>
          {showCanvas && (
            <>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className={`px-6 py-3 border border-black rounded-md font-semibold transition ${
                  isExporting ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                {isExporting ? 'エクスポート中...' : 'PNG画像で保存'}
              </button>
              <button
                onClick={() => {
                  const data = {
                    version: '1.0',
                    framework: activeFramework,
                    projectName: getData('projectName'),
                    data: formData[activeFramework] || {},
                    exportedAt: new Date().toISOString()
                  };
                  navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                  alert('JSONをクリップボードにコピーしました');
                }}
                className="px-6 py-3 border border-gray-300 rounded-md font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                JSONコピー
              </button>
            </>
          )}
          
          {/* 残り回数表示 */}
          {!userIsPro && (
            <span className="text-sm text-gray-500 ml-2">
              本日の残り: {remaining === Infinity ? '∞' : remaining} / {getDailyLimit()}回
            </span>
          )}
          {userIsPro && isMaster() && (
            <span className="text-sm text-purple-600 ml-2">👑 Master</span>
          )}
          {userIsPro && !isMaster() && (
            <span className="text-sm text-green-600 ml-2">✓ Pro版</span>
          )}
        </div>

        {/* プレビュー */}
        {showCanvas && (
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="mb-4 pb-3 border-b border-gray-200">
              <h3 className="text-base font-semibold">{getData('projectName') || framework.name}</h3>
              <p className="text-xs text-gray-500">{framework.name}</p>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <CanvasPreview framework={framework} data={formData[activeFramework] || {}} />
              </div>
            </div>
            <div className="mt-3 text-right text-xs text-gray-400">
              {new Date().toLocaleDateString('ja-JP')}
            </div>
          </div>
        )}
      </main>

      {/* モーダル */}
      {showImportModal && (
        <ImportModal
          onClose={() => setShowImportModal(false)}
          onImport={handleImport}
        />
      )}
      {showPromptModal && (
        <PromptModal
          frameworkId={activeFramework}
          onClose={() => setShowPromptModal(false)}
        />
      )}
      {showLimitModal && (
        <LimitModal
          onClose={() => setShowLimitModal(false)}
        />
      )}
    </div>
  );
}
