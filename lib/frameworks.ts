import { Framework } from './types';

export const FRAMEWORKS: Record<string, Framework> = {
  bmc: {
    id: 'bmc',
    name: 'Business Model Canvas',
    shortName: 'BMC',
    category: 'ビジネスモデル',
    description: 'ビジネスモデルの9要素を可視化',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'keyPartners', label: 'パートナー', sublabel: 'Key Partner [KP]', placeholder: '主要な協力者・サプライヤー' },
      { id: 'keyActivities', label: '主要活動', sublabel: 'Key Activity [KA]', placeholder: '価値提供に必要な活動' },
      { id: 'keyResources', label: 'キーリソース', sublabel: 'Key Resource [KR]', placeholder: '必要な資産・人材・技術' },
      { id: 'valuePropositions', label: '価値提案', sublabel: 'Value Proposition [VP]', placeholder: '顧客に提供する価値' },
      { id: 'customerRelationships', label: '顧客との関係', sublabel: 'Customer Relationship [CR]', placeholder: '関係構築・維持方法' },
      { id: 'channels', label: 'チャネル', sublabel: 'Channel [CH]', placeholder: '価値提供・コミュニケーション経路' },
      { id: 'customerSegments', label: '顧客セグメント', sublabel: 'Customer Segment [CS]', placeholder: 'ターゲット顧客層' },
      { id: 'costStructure', label: 'コスト構造', sublabel: 'Cost Structure', placeholder: '主要なコスト要素' },
      { id: 'revenueStreams', label: '収益の流れ', sublabel: 'Revenue Stream [RS]', placeholder: '収益モデル・課金方法' }
    ],
    layout: 'bmc'
  },
  lean: {
    id: 'lean',
    name: 'Lean Canvas',
    shortName: 'Lean',
    category: 'ビジネスモデル',
    description: 'スタートアップ向けの仮説検証キャンバス',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'problem', label: '課題', sublabel: 'Problem', placeholder: '顧客の上位3つの課題' },
      { id: 'solution', label: '解決策', sublabel: 'Solution', placeholder: '各課題への解決策' },
      { id: 'keyMetrics', label: '主要指標', sublabel: 'Key Metrics', placeholder: '計測すべき重要指標' },
      { id: 'uvp', label: '独自の価値提案', sublabel: 'Unique Value Proposition', placeholder: '他と違う明確なメッセージ' },
      { id: 'unfairAdvantage', label: '圧倒的優位性', sublabel: 'Unfair Advantage', placeholder: '簡単に真似できない強み' },
      { id: 'channels', label: 'チャネル', sublabel: 'Channels', placeholder: '顧客への到達経路' },
      { id: 'customerSegments', label: '顧客セグメント', sublabel: 'Customer Segments', placeholder: 'ターゲット顧客' },
      { id: 'costStructure', label: 'コスト構造', sublabel: 'Cost Structure', placeholder: '顧客獲得・運用コスト' },
      { id: 'revenueStreams', label: '収益の流れ', sublabel: 'Revenue Streams', placeholder: '収益モデル・LTV' },
      { id: 'existingAlternatives', label: '既存の代替品', sublabel: 'Existing Alternatives', placeholder: '現在の解決方法' },
      { id: 'earlyAdopters', label: 'アーリーアダプター', sublabel: 'Early Adopters', placeholder: '最初の顧客像' },
      { id: 'highlevelConcept', label: 'ハイレベルコンセプト', sublabel: 'High-Level Concept', placeholder: '〇〇の△△版' }
    ],
    layout: 'lean'
  },
  threeC: {
    id: 'threeC',
    name: '3C分析',
    shortName: '3C',
    category: '環境分析',
    description: '市場・競合・自社の3視点で分析',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'customer', label: '市場・顧客', sublabel: 'Customer', placeholder: '市場規模、顧客ニーズ、購買行動、セグメント' },
      { id: 'competitor', label: '競合', sublabel: 'Competitor', placeholder: '競合他社、シェア、強み・弱み、戦略' },
      { id: 'company', label: '自社', sublabel: 'Company', placeholder: '自社の強み・弱み、リソース、独自性' }
    ],
    layout: 'threeC'
  },
  fiveForces: {
    id: 'fiveForces',
    name: '5 Forces分析',
    shortName: '5Forces',
    category: '環境分析',
    description: 'ポーターの5つの競争要因で業界構造を分析',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'rivalry', label: '業界内の競争', sublabel: 'Rivalry', placeholder: '既存競合の数、競争の激しさ、差別化の程度' },
      { id: 'newEntrants', label: '新規参入の脅威', sublabel: 'Threat of New Entrants', placeholder: '参入障壁、必要資本、規制' },
      { id: 'substitutes', label: '代替品の脅威', sublabel: 'Threat of Substitutes', placeholder: '代替製品・サービス、スイッチングコスト' },
      { id: 'buyerPower', label: '買い手の交渉力', sublabel: 'Bargaining Power of Buyers', placeholder: '顧客の集中度、価格感度、情報力' },
      { id: 'supplierPower', label: '売り手の交渉力', sublabel: 'Bargaining Power of Suppliers', placeholder: 'サプライヤーの集中度、代替の有無' }
    ],
    layout: 'fiveForces'
  },
  pest: {
    id: 'pest',
    name: 'PESTEL分析',
    shortName: 'PESTEL',
    category: '環境分析',
    description: 'マクロ環境の6要因を分析',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'political', label: '政治的要因', sublabel: 'Political', placeholder: '法規制、政策、税制、政治的安定性' },
      { id: 'economic', label: '経済的要因', sublabel: 'Economic', placeholder: '景気、為替、金利、インフレ、失業率' },
      { id: 'social', label: '社会的要因', sublabel: 'Social', placeholder: '人口動態、ライフスタイル、文化、教育' },
      { id: 'technological', label: '技術的要因', sublabel: 'Technological', placeholder: '技術革新、R&D、自動化、デジタル化' },
      { id: 'environmental', label: '環境的要因', sublabel: 'Environmental', placeholder: '環境規制、気候変動、サステナビリティ' },
      { id: 'legal', label: '法的要因', sublabel: 'Legal', placeholder: '労働法、消費者保護法、知的財産権' }
    ],
    layout: 'grid6'
  },
  swot: {
    id: 'swot',
    name: 'SWOT分析',
    shortName: 'SWOT',
    category: '環境分析',
    description: '強み・弱み・機会・脅威の4象限で分析',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'strengths', label: '強み', sublabel: 'Strengths', placeholder: '内部のプラス要因、競争優位性' },
      { id: 'weaknesses', label: '弱み', sublabel: 'Weaknesses', placeholder: '内部のマイナス要因、改善点' },
      { id: 'opportunities', label: '機会', sublabel: 'Opportunities', placeholder: '外部のプラス要因、市場機会' },
      { id: 'threats', label: '脅威', sublabel: 'Threats', placeholder: '外部のマイナス要因、リスク' }
    ],
    layout: 'grid2x2'
  },
  stp: {
    id: 'stp',
    name: 'STP分析',
    shortName: 'STP',
    category: 'マーケティング',
    description: 'セグメンテーション・ターゲティング・ポジショニング',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'segmentation', label: 'セグメンテーション', sublabel: 'Segmentation', placeholder: '市場の細分化基準（地理・人口統計・心理・行動）' },
      { id: 'targeting', label: 'ターゲティング', sublabel: 'Targeting', placeholder: '狙うセグメント、選定理由、市場規模' },
      { id: 'positioning', label: 'ポジショニング', sublabel: 'Positioning', placeholder: '競合との差別化ポイント、顧客の認知' }
    ],
    layout: 'grid3'
  },
  ansoff: {
    id: 'ansoff',
    name: 'アンゾフマトリクス',
    shortName: 'Ansoff',
    category: '戦略立案',
    description: '成長戦略の4つの方向性を検討',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'marketPenetration', label: '市場浸透', sublabel: 'Market Penetration', placeholder: '既存市場×既存製品：シェア拡大策' },
      { id: 'marketDevelopment', label: '市場開拓', sublabel: 'Market Development', placeholder: '新市場×既存製品：新地域・新セグメント' },
      { id: 'productDevelopment', label: '製品開発', sublabel: 'Product Development', placeholder: '既存市場×新製品：新機能・改良' },
      { id: 'diversification', label: '多角化', sublabel: 'Diversification', placeholder: '新市場×新製品：新規事業' }
    ],
    layout: 'ansoff'
  },
  bcg: {
    id: 'bcg',
    name: 'BCGマトリクス',
    shortName: 'BCG',
    category: '戦略立案',
    description: '市場成長率と相対シェアで事業を分類',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'star', label: '花形', sublabel: 'Star', placeholder: '高成長×高シェア：積極投資で成長' },
      { id: 'questionMark', label: '問題児', sublabel: 'Question Mark', placeholder: '高成長×低シェア：選択と集中' },
      { id: 'cashCow', label: '金のなる木', sublabel: 'Cash Cow', placeholder: '低成長×高シェア：収益源として維持' },
      { id: 'dog', label: '負け犬', sublabel: 'Dog', placeholder: '低成長×低シェア：撤退・縮小検討' }
    ],
    layout: 'bcg'
  },
  valueChain: {
    id: 'valueChain',
    name: 'バリューチェーン',
    shortName: 'ValueChain',
    category: '戦略立案',
    description: '価値創造活動を主活動と支援活動に分解',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'inboundLogistics', label: '購買物流', sublabel: 'Inbound Logistics', placeholder: '原材料の調達・受入・保管' },
      { id: 'operations', label: '製造・オペレーション', sublabel: 'Operations', placeholder: '製造プロセス、品質管理' },
      { id: 'outboundLogistics', label: '出荷物流', sublabel: 'Outbound Logistics', placeholder: '製品の保管・配送' },
      { id: 'marketingSales', label: 'マーケティング・販売', sublabel: 'Marketing & Sales', placeholder: '広告、販促、営業' },
      { id: 'service', label: 'サービス', sublabel: 'Service', placeholder: 'アフターサービス、サポート' },
      { id: 'infrastructure', label: '全般管理', sublabel: 'Firm Infrastructure', placeholder: '経営企画、財務、法務' },
      { id: 'hrm', label: '人事・労務管理', sublabel: 'Human Resource Management', placeholder: '採用、教育、評価' },
      { id: 'technology', label: '技術開発', sublabel: 'Technology Development', placeholder: 'R&D、システム開発' },
      { id: 'procurement', label: '調達活動', sublabel: 'Procurement', placeholder: '購買戦略、サプライヤー管理' }
    ],
    layout: 'valueChain'
  },
  vrio: {
    id: 'vrio',
    name: 'VRIO分析',
    shortName: 'VRIO',
    category: '戦略立案',
    description: '経営資源の競争優位性を評価',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'value', label: '経済的価値', sublabel: 'Value', placeholder: 'その資源は価値を生むか？機会を活かせるか？' },
      { id: 'rarity', label: '希少性', sublabel: 'Rarity', placeholder: 'その資源は希少か？競合は持っていないか？' },
      { id: 'imitability', label: '模倣困難性', sublabel: 'Imitability', placeholder: '模倣するコストは高いか？時間がかかるか？' },
      { id: 'organization', label: '組織', sublabel: 'Organization', placeholder: '資源を活用する組織体制があるか？' }
    ],
    layout: 'grid4'
  },
  sevenS: {
    id: 'sevenS',
    name: '7S分析',
    shortName: '7S',
    category: '組織分析',
    description: 'マッキンゼーの組織分析フレームワーク',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'strategy', label: '戦略', sublabel: 'Strategy', placeholder: '競争優位を築くための方針' },
      { id: 'structure', label: '組織構造', sublabel: 'Structure', placeholder: '組織の形態、階層、部門構成' },
      { id: 'systems', label: 'システム', sublabel: 'Systems', placeholder: '業務プロセス、情報システム、評価制度' },
      { id: 'sharedValues', label: '共通の価値観', sublabel: 'Shared Values', placeholder: '企業理念、ビジョン、文化' },
      { id: 'style', label: 'スタイル', sublabel: 'Style', placeholder: 'リーダーシップ、意思決定スタイル' },
      { id: 'staff', label: '人材', sublabel: 'Staff', placeholder: '従業員の能力、モチベーション' },
      { id: 'skills', label: 'スキル', sublabel: 'Skills', placeholder: '組織全体の能力、コアコンピタンス' }
    ],
    layout: 'sevenS'
  },
  kpiTree: {
    id: 'kpiTree',
    name: 'KPIツリー',
    shortName: 'KPI',
    category: '目標管理',
    description: 'KGIからKPIへの分解構造を可視化',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'kgi', label: 'KGI（重要目標達成指標）', sublabel: 'Key Goal Indicator', placeholder: '最終的なゴール指標（売上、利益など）' },
      { id: 'kpi1', label: 'KPI①', sublabel: 'Key Performance Indicator', placeholder: 'KGI達成のための指標①' },
      { id: 'kpi2', label: 'KPI②', sublabel: 'Key Performance Indicator', placeholder: 'KGI達成のための指標②' },
      { id: 'kpi3', label: 'KPI③', sublabel: 'Key Performance Indicator', placeholder: 'KGI達成のための指標③' },
      { id: 'action1', label: 'アクション①', sublabel: 'Actions for KPI①', placeholder: 'KPI①達成のための具体的施策' },
      { id: 'action2', label: 'アクション②', sublabel: 'Actions for KPI②', placeholder: 'KPI②達成のための具体的施策' },
      { id: 'action3', label: 'アクション③', sublabel: 'Actions for KPI③', placeholder: 'KPI③達成のための具体的施策' }
    ],
    layout: 'kpiTree'
  },
  okr: {
    id: 'okr',
    name: 'OKR',
    shortName: 'OKR',
    category: '目標管理',
    description: '目標と主要な成果指標を設定',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'objective', label: 'Objective（目標）', sublabel: 'What to achieve', placeholder: '定性的で野心的な目標' },
      { id: 'kr1', label: 'Key Result①', sublabel: 'Measurable outcome', placeholder: '測定可能な成果指標①' },
      { id: 'kr2', label: 'Key Result②', sublabel: 'Measurable outcome', placeholder: '測定可能な成果指標②' },
      { id: 'kr3', label: 'Key Result③', sublabel: 'Measurable outcome', placeholder: '測定可能な成果指標③' },
      { id: 'initiatives', label: 'Initiatives（施策）', sublabel: 'Action plans', placeholder: 'KR達成のための具体的なアクション' }
    ],
    layout: 'okr'
  },
  pdca: {
    id: 'pdca',
    name: 'PDCA / OODA',
    shortName: 'PDCA',
    category: '目標管理',
    description: '改善サイクルを回す',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'plan', label: 'Plan（計画）', sublabel: 'PDCA', placeholder: '目標設定、計画立案' },
      { id: 'do', label: 'Do（実行）', sublabel: 'PDCA', placeholder: '計画の実行' },
      { id: 'check', label: 'Check（評価）', sublabel: 'PDCA', placeholder: '結果の測定・評価' },
      { id: 'act', label: 'Act（改善）', sublabel: 'PDCA', placeholder: '改善策の実施' },
      { id: 'observe', label: 'Observe（観察）', sublabel: 'OODA', placeholder: '状況の観察・情報収集' },
      { id: 'orient', label: 'Orient（状況判断）', sublabel: 'OODA', placeholder: '情報の分析・方向付け' },
      { id: 'decide', label: 'Decide（意思決定）', sublabel: 'OODA', placeholder: '行動方針の決定' },
      { id: 'actOoda', label: 'Act（行動）', sublabel: 'OODA', placeholder: '素早い行動' }
    ],
    layout: 'pdca'
  },
  a3: {
    id: 'a3',
    name: 'A3報告書',
    shortName: 'A3',
    category: '問題解決',
    description: 'トヨタ式の問題解決フレームワーク',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'background', label: '背景', sublabel: 'Background', placeholder: 'なぜこの問題に取り組むのか' },
      { id: 'currentState', label: '現状', sublabel: 'Current State', placeholder: '現在の状況、データ、事実' },
      { id: 'goal', label: '目標', sublabel: 'Goal / Target', placeholder: '達成したい状態、目標値' },
      { id: 'rootCause', label: '原因分析', sublabel: 'Root Cause Analysis', placeholder: 'なぜなぜ分析、真因' },
      { id: 'countermeasures', label: '対策', sublabel: 'Countermeasures', placeholder: '具体的な改善策' },
      { id: 'implementation', label: '実行計画', sublabel: 'Implementation Plan', placeholder: '誰が、いつまでに、何を' },
      { id: 'followUp', label: 'フォローアップ', sublabel: 'Follow-up', placeholder: '効果確認、標準化' }
    ],
    layout: 'a3'
  },
  unitEconomics: {
    id: 'unitEconomics',
    name: 'ユニットエコノミクス',
    shortName: 'UnitEcon',
    category: '財務分析',
    description: '顧客単位の収益性を分析',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'ltv', label: 'LTV（顧客生涯価値）', sublabel: 'Lifetime Value', placeholder: '顧客1人あたりの総収益' },
      { id: 'cac', label: 'CAC（顧客獲得コスト）', sublabel: 'Customer Acquisition Cost', placeholder: '顧客1人を獲得するコスト' },
      { id: 'ltvCacRatio', label: 'LTV/CAC比率', sublabel: 'LTV:CAC Ratio', placeholder: '3倍以上が目安' },
      { id: 'paybackPeriod', label: '回収期間', sublabel: 'Payback Period', placeholder: 'CAC回収にかかる月数' },
      { id: 'arpu', label: 'ARPU（ユーザー平均収益）', sublabel: 'Average Revenue Per User', placeholder: '月間/年間の平均収益' },
      { id: 'churnRate', label: '解約率', sublabel: 'Churn Rate', placeholder: '月間/年間の解約率' },
      { id: 'grossMargin', label: '粗利率', sublabel: 'Gross Margin', placeholder: '売上総利益率' }
    ],
    layout: 'unitEcon'
  },
  breakeven: {
    id: 'breakeven',
    name: '損益分岐点分析',
    shortName: 'BEP',
    category: '財務分析',
    description: '損益分岐点と収益構造を分析',
    fields: [
      { id: 'projectName', label: 'プロジェクト名', sublabel: '', placeholder: '例: 新規事業プロジェクト', type: 'text' },
      { id: 'fixedCosts', label: '固定費', sublabel: 'Fixed Costs', placeholder: '人件費、家賃、減価償却費など' },
      { id: 'variableCosts', label: '変動費', sublabel: 'Variable Costs', placeholder: '原材料費、販売手数料など' },
      { id: 'unitPrice', label: '販売単価', sublabel: 'Unit Price', placeholder: '製品・サービスの単価' },
      { id: 'unitVariableCost', label: '単位変動費', sublabel: 'Variable Cost per Unit', placeholder: '1単位あたりの変動費' },
      { id: 'contributionMargin', label: '限界利益', sublabel: 'Contribution Margin', placeholder: '販売単価 - 単位変動費' },
      { id: 'bepUnits', label: '損益分岐点販売量', sublabel: 'Break-even Units', placeholder: '固定費 ÷ 限界利益' },
      { id: 'bepSales', label: '損益分岐点売上高', sublabel: 'Break-even Sales', placeholder: '必要な売上高' }
    ],
    layout: 'breakeven'
  }
};

// カテゴリ別にグループ化
export const CATEGORIES: Record<string, string[]> = {
  'ビジネスモデル': ['bmc', 'lean'],
  '環境分析': ['threeC', 'fiveForces', 'pest', 'swot'],
  'マーケティング': ['stp'],
  '戦略立案': ['ansoff', 'bcg', 'valueChain', 'vrio'],
  '組織分析': ['sevenS'],
  '目標管理': ['kpiTree', 'okr', 'pdca'],
  '問題解決': ['a3'],
  '財務分析': ['unitEconomics', 'breakeven']
};

// フレームワーク一覧取得
export const getFrameworkList = () => Object.values(FRAMEWORKS);

// フレームワーク取得
export const getFramework = (id: string) => FRAMEWORKS[id];
