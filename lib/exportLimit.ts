// エクスポート回数制限の管理

const DAILY_LIMIT = 3;
const STORAGE_KEY = 'fw_export_count';
const PRO_KEY = 'fw_pro_license';
const MASTER_KEY = 'fw_master';

interface ExportData {
  date: string;  // YYYY-MM-DD
  count: number;
}

// 今日の日付を取得
const getToday = (): string => {
  return new Date().toISOString().split('T')[0];
};

// マスター権限かどうか（自分用）
export const isMaster = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(MASTER_KEY) === 'true';
};

// マスター権限を有効化
export const activateMaster = (secretKey: string): boolean => {
  // 秘密のキーをここで設定（好きな文字列に変更してね）
  if (secretKey === 'tomoki2024') {
    localStorage.setItem(MASTER_KEY, 'true');
    return true;
  }
  return false;
};

// Pro版かどうか
export const isPro = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (isMaster()) return true;  // マスターは常にPro扱い
  return localStorage.getItem(PRO_KEY) === 'true';
};

// Pro版を有効化
export const activatePro = (): void => {
  localStorage.setItem(PRO_KEY, 'true');
  localStorage.setItem('fw_purchase_date', new Date().toISOString());
};

// 1日の上限
export const getDailyLimit = (): number => DAILY_LIMIT;

// 今日の使用回数を取得
export const getTodayCount = (): number => {
  if (typeof window === 'undefined') return 0;
  
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return 0;
  
  try {
    const parsed: ExportData = JSON.parse(data);
    if (parsed.date !== getToday()) return 0;
    return parsed.count;
  } catch {
    return 0;
  }
};

// 残り回数を取得
export const getRemainingExports = (): number => {
  if (isPro()) return Infinity;
  return Math.max(0, DAILY_LIMIT - getTodayCount());
};

// エクスポート可能か確認
export const canExport = (): boolean => {
  if (isPro()) return true;
  return getRemainingExports() > 0;
};

// エクスポート回数を記録
export const recordExport = (): void => {
  if (isPro()) return;
  
  const today = getToday();
  const currentCount = getTodayCount();
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    date: today,
    count: currentCount + 1
  } as ExportData));
};

// リセット（デバッグ用）
export const resetExportCount = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
