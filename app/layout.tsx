import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Business Framework Generator',
  description: '18種類のビジネスフレームワークを簡単に作成・エクスポート。AIインポート対応。',
  keywords: ['BMC', 'Lean Canvas', 'SWOT', '3C分析', 'ビジネスフレームワーク'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
