'use client';

import { getDailyLimit } from '@/lib/exportLimit';

interface LimitModalProps {
  onClose: () => void;
}

export default function LimitModal({ onClose }: LimitModalProps) {
  const limit = getDailyLimit();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">本日の上限に達しました</h2>
          <p className="text-gray-600 mb-6">
            無料版は1日{limit}回までエクスポートできます。<br />
            明日になるとリセットされます。
          </p>

          {/* 将来の課金導線用（コメントアウト）
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-semibold mb-2">🚀 Proにアップグレード</p>
            <ul className="text-sm text-gray-600 text-left mb-4">
              <li>✓ エクスポート無制限</li>
              <li>✓ 透かしなし</li>
              <li>✓ 買い切り ¥500</li>
            </ul>
            <button className="w-full py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800">
              購入する
            </button>
          </div>
          */}

          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
