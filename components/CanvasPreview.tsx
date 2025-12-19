'use client';

import { Framework, FrameworkData } from '@/lib/types';

interface CanvasPreviewProps {
  framework: Framework;
  data: FrameworkData;
}

// プレビュー用ブロック
const Block = ({ 
  title, 
  subtitle, 
  content, 
  className = '',
  highlight = false 
}: { 
  title: string; 
  subtitle: string; 
  content: string; 
  className?: string;
  highlight?: boolean;
}) => (
  <div className={`border border-gray-200 p-4 flex flex-col ${highlight ? 'bg-gray-50' : 'bg-white'} ${className}`}>
    <div className="mb-3">
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-[10px] text-gray-500 mt-0.5">{subtitle}</div>
    </div>
    <div className="text-xs leading-relaxed text-gray-700 whitespace-pre-wrap flex-1">
      {content || <span className="text-gray-300">-</span>}
    </div>
  </div>
);

export default function CanvasPreview({ framework, data }: CanvasPreviewProps) {
  const get = (id: string) => data[id] || '';
  const L = framework.layout;

  // BMC
  if (L === 'bmc') {
    return (
      <div className="grid grid-cols-10 border border-gray-200" style={{ gridTemplateRows: '180px 180px 140px' }}>
        <div className="col-span-2 row-span-2"><Block title="パートナー" subtitle="Key Partner [KP]" content={get('keyPartners')} className="h-full border-0 border-r border-b" /></div>
        <div className="col-span-2 row-span-1"><Block title="主要活動" subtitle="Key Activity [KA]" content={get('keyActivities')} className="h-full border-0 border-r border-b" /></div>
        <div className="col-span-2 row-span-1 col-start-3 row-start-2"><Block title="キーリソース" subtitle="Key Resource [KR]" content={get('keyResources')} className="h-full border-0 border-r border-b" /></div>
        <div className="col-span-2 row-span-2 col-start-5"><Block title="価値提案" subtitle="Value Proposition [VP]" content={get('valuePropositions')} className="h-full border-0 border-r border-b" /></div>
        <div className="col-span-2 row-span-1 col-start-7"><Block title="顧客との関係" subtitle="Customer Relationship [CR]" content={get('customerRelationships')} className="h-full border-0 border-r border-b" /></div>
        <div className="col-span-2 row-span-1 col-start-7 row-start-2"><Block title="チャネル" subtitle="Channel [CH]" content={get('channels')} className="h-full border-0 border-r border-b" /></div>
        <div className="col-span-2 row-span-2 col-start-9"><Block title="顧客セグメント" subtitle="Customer Segment [CS]" content={get('customerSegments')} className="h-full border-0 border-b" /></div>
        <div className="col-span-5 row-start-3"><Block title="コスト構造" subtitle="Cost Structure" content={get('costStructure')} className="h-full border-0 border-r" /></div>
        <div className="col-span-5 row-start-3"><Block title="収益の流れ" subtitle="Revenue Stream [RS]" content={get('revenueStreams')} className="h-full border-0" /></div>
      </div>
    );
  }

  // Lean Canvas
  if (L === 'lean') {
    return (
      <div className="grid grid-cols-5 border border-gray-200" style={{ gridTemplateRows: '160px 160px 120px' }}>
        <Block title="課題" subtitle="Problem" content={get('problem')} className="border-0 border-r border-b" />
        <Block title="解決策" subtitle="Solution" content={get('solution')} className="border-0 border-r border-b" />
        <Block title="独自の価値提案" subtitle="UVP" content={get('uvp')} className="border-0 border-r border-b" />
        <Block title="圧倒的優位性" subtitle="Unfair Advantage" content={get('unfairAdvantage')} className="border-0 border-r border-b" />
        <Block title="顧客セグメント" subtitle="Customer Segments" content={get('customerSegments')} className="border-0 border-b" />
        <Block title="既存の代替品" subtitle="Existing Alternatives" content={get('existingAlternatives')} className="border-0 border-r border-b" />
        <Block title="主要指標" subtitle="Key Metrics" content={get('keyMetrics')} className="border-0 border-r border-b" />
        <Block title="ハイレベルコンセプト" subtitle="High-Level Concept" content={get('highlevelConcept')} className="border-0 border-r border-b" />
        <Block title="チャネル" subtitle="Channels" content={get('channels')} className="border-0 border-r border-b" />
        <Block title="アーリーアダプター" subtitle="Early Adopters" content={get('earlyAdopters')} className="border-0 border-b" />
        <div className="col-span-2"><Block title="コスト構造" subtitle="Cost Structure" content={get('costStructure')} className="h-full border-0 border-r" /></div>
        <div className="col-span-3"><Block title="収益の流れ" subtitle="Revenue Streams" content={get('revenueStreams')} className="h-full border-0" /></div>
      </div>
    );
  }

  // 3C
  if (L === 'threeC') {
    return (
      <div className="grid grid-cols-3 border border-gray-200">
        <Block title="市場・顧客" subtitle="Customer" content={get('customer')} className="h-72 border-0 border-r" />
        <Block title="競合" subtitle="Competitor" content={get('competitor')} className="h-72 border-0 border-r" />
        <Block title="自社" subtitle="Company" content={get('company')} className="h-72 border-0" />
      </div>
    );
  }

  // STP
  if (L === 'grid3') {
    return (
      <div className="grid grid-cols-3 border border-gray-200">
        <Block title="セグメンテーション" subtitle="Segmentation" content={get('segmentation')} className="h-72 border-0 border-r" />
        <Block title="ターゲティング" subtitle="Targeting" content={get('targeting')} className="h-72 border-0 border-r" />
        <Block title="ポジショニング" subtitle="Positioning" content={get('positioning')} className="h-72 border-0" />
      </div>
    );
  }

  // VRIO
  if (L === 'grid4') {
    const fields = [
      ['value', '経済的価値', 'Value'],
      ['rarity', '希少性', 'Rarity'],
      ['imitability', '模倣困難性', 'Imitability'],
      ['organization', '組織', 'Organization']
    ];
    return (
      <div className="grid grid-cols-4 border border-gray-200">
        {fields.map((f, i) => (
          <Block key={f[0]} title={f[1]} subtitle={f[2]} content={get(f[0])} className={`h-72 border-0 ${i < 3 ? 'border-r' : ''}`} />
        ))}
      </div>
    );
  }

  // PESTEL
  if (L === 'grid6') {
    const fields = [
      ['political', '政治的要因', 'Political'],
      ['economic', '経済的要因', 'Economic'],
      ['social', '社会的要因', 'Social'],
      ['technological', '技術的要因', 'Technological'],
      ['environmental', '環境的要因', 'Environmental'],
      ['legal', '法的要因', 'Legal']
    ];
    return (
      <div className="grid grid-cols-3 border border-gray-200" style={{ gridTemplateRows: '180px 180px' }}>
        {fields.map((f, i) => (
          <Block key={f[0]} title={f[1]} subtitle={f[2]} content={get(f[0])} 
            className={`border-0 ${i % 3 !== 2 ? 'border-r' : ''} ${i < 3 ? 'border-b' : ''}`} />
        ))}
      </div>
    );
  }

  // SWOT
  if (L === 'grid2x2') {
    return (
      <div className="grid grid-cols-2 border border-gray-200" style={{ gridTemplateRows: '180px 180px' }}>
        <Block title="強み" subtitle="Strengths" content={get('strengths')} className="border-0 border-r border-b" />
        <Block title="機会" subtitle="Opportunities" content={get('opportunities')} className="border-0 border-b" />
        <Block title="弱み" subtitle="Weaknesses" content={get('weaknesses')} className="border-0 border-r" />
        <Block title="脅威" subtitle="Threats" content={get('threats')} className="border-0" />
      </div>
    );
  }

  // Ansoff / BCG
  if (L === 'ansoff' || L === 'bcg') {
    const isAnsoff = L === 'ansoff';
    const fields = isAnsoff
      ? [['marketPenetration', '市場浸透', 'Market Penetration'], ['productDevelopment', '製品開発', 'Product Development'], ['marketDevelopment', '市場開拓', 'Market Development'], ['diversification', '多角化', 'Diversification']]
      : [['star', '花形 ⭐', 'Star'], ['questionMark', '問題児 ❓', 'Question Mark'], ['cashCow', '金のなる木 💰', 'Cash Cow'], ['dog', '負け犬 🐕', 'Dog']];
    const cols = isAnsoff ? ['既存製品', '新製品'] : ['高シェア', '低シェア'];
    const rows = isAnsoff ? ['既存市場', '新市場'] : ['高成長', '低成長'];
    return (
      <div>
        <div className="flex ml-20 mb-2">
          {cols.map(l => <div key={l} className="flex-1 text-center text-xs text-gray-500">{l}</div>)}
        </div>
        <div className="flex">
          <div className="w-20 flex flex-col justify-around">
            {rows.map(l => <div key={l} className="text-xs text-gray-500 text-right pr-3">{l}</div>)}
          </div>
          <div className="flex-1 grid grid-cols-2 border border-gray-200" style={{ gridTemplateRows: '160px 160px' }}>
            {fields.map((f, i) => (
              <Block key={f[0]} title={f[1]} subtitle={f[2]} content={get(f[0])} 
                className={`border-0 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 5 Forces
  if (L === 'fiveForces') {
    return (
      <div className="relative h-[450px] border border-gray-200 bg-white">
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-72">
          <Block title="新規参入の脅威" subtitle="Threat of New Entrants" content={get('newEntrants')} className="h-28" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72">
          <Block title="業界内の競争" subtitle="Rivalry" content={get('rivalry')} className="h-28" highlight />
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-72">
          <Block title="代替品の脅威" subtitle="Threat of Substitutes" content={get('substitutes')} className="h-28" />
        </div>
        <div className="absolute top-1/2 left-5 -translate-y-1/2 w-60">
          <Block title="売り手の交渉力" subtitle="Supplier Power" content={get('supplierPower')} className="h-28" />
        </div>
        <div className="absolute top-1/2 right-5 -translate-y-1/2 w-60">
          <Block title="買い手の交渉力" subtitle="Buyer Power" content={get('buyerPower')} className="h-28" />
        </div>
      </div>
    );
  }

  // Value Chain
  if (L === 'valueChain') {
    return (
      <div className="border border-gray-200">
        <div className="text-[10px] text-gray-500 px-4 py-2 border-b border-gray-200">支援活動</div>
        <div className="grid grid-cols-4">
          <Block title="全般管理" subtitle="Infrastructure" content={get('infrastructure')} className="border-0 border-r border-b min-h-20" />
          <Block title="人事・労務" subtitle="HRM" content={get('hrm')} className="border-0 border-r border-b min-h-20" />
          <Block title="技術開発" subtitle="Technology" content={get('technology')} className="border-0 border-r border-b min-h-20" />
          <Block title="調達活動" subtitle="Procurement" content={get('procurement')} className="border-0 border-b min-h-20" />
        </div>
        <div className="text-[10px] text-gray-500 px-4 py-2 border-b border-gray-200">主活動</div>
        <div className="grid grid-cols-5">
          <Block title="購買物流" subtitle="Inbound" content={get('inboundLogistics')} className="border-0 border-r min-h-24" />
          <Block title="製造" subtitle="Operations" content={get('operations')} className="border-0 border-r min-h-24" />
          <Block title="出荷物流" subtitle="Outbound" content={get('outboundLogistics')} className="border-0 border-r min-h-24" />
          <Block title="マーケ・販売" subtitle="Marketing" content={get('marketingSales')} className="border-0 border-r min-h-24" />
          <Block title="サービス" subtitle="Service" content={get('service')} className="border-0 min-h-24" />
        </div>
      </div>
    );
  }

  // 7S
  if (L === 'sevenS') {
    return (
      <div className="border border-gray-200 p-5">
        <div className="text-[10px] text-gray-500 mb-2">ハードの3S</div>
        <div className="grid grid-cols-4 gap-3 mb-5">
          <Block title="戦略" subtitle="Strategy" content={get('strategy')} className="min-h-28" />
          <Block title="組織構造" subtitle="Structure" content={get('structure')} className="min-h-28" />
          <Block title="システム" subtitle="Systems" content={get('systems')} className="min-h-28" />
          <Block title="スタイル" subtitle="Style" content={get('style')} className="min-h-28" />
        </div>
        <div className="flex justify-center mb-5">
          <Block title="共通の価値観" subtitle="Shared Values" content={get('sharedValues')} className="w-72 min-h-28" highlight />
        </div>
        <div className="text-[10px] text-gray-500 mb-2">ソフトの3S</div>
        <div className="grid grid-cols-2 gap-3">
          <Block title="人材" subtitle="Staff" content={get('staff')} className="min-h-28" />
          <Block title="スキル" subtitle="Skills" content={get('skills')} className="min-h-28" />
        </div>
      </div>
    );
  }

  // KPI Tree
  if (L === 'kpiTree') {
    return (
      <div className="border border-gray-200 p-5">
        <div className="flex justify-center mb-8">
          <Block title="KGI" subtitle="Key Goal Indicator" content={get('kgi')} className="w-96 min-h-24" highlight />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Block title="KPI①" subtitle="KPI" content={get('kpi1')} className="min-h-24" />
          <Block title="KPI②" subtitle="KPI" content={get('kpi2')} className="min-h-24" />
          <Block title="KPI③" subtitle="KPI" content={get('kpi3')} className="min-h-24" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Block title="アクション①" subtitle="Actions" content={get('action1')} className="min-h-24" />
          <Block title="アクション②" subtitle="Actions" content={get('action2')} className="min-h-24" />
          <Block title="アクション③" subtitle="Actions" content={get('action3')} className="min-h-24" />
        </div>
      </div>
    );
  }

  // OKR
  if (L === 'okr') {
    return (
      <div className="border border-gray-200 p-5">
        <div className="flex justify-center mb-6">
          <Block title="Objective" subtitle="What to achieve" content={get('objective')} className="w-[500px] min-h-24" highlight />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Block title="Key Result①" subtitle="Measurable" content={get('kr1')} className="min-h-24" />
          <Block title="Key Result②" subtitle="Measurable" content={get('kr2')} className="min-h-24" />
          <Block title="Key Result③" subtitle="Measurable" content={get('kr3')} className="min-h-24" />
        </div>
        <Block title="Initiatives" subtitle="Action plans" content={get('initiatives')} className="min-h-24" />
      </div>
    );
  }

  // PDCA / OODA
  if (L === 'pdca') {
    return (
      <div className="border border-gray-200 p-5">
        <div className="text-sm font-semibold mb-3">PDCA</div>
        <div className="grid grid-cols-4 gap-3 mb-8">
          <Block title="Plan" subtitle="計画" content={get('plan')} className="min-h-32" />
          <Block title="Do" subtitle="実行" content={get('do')} className="min-h-32" />
          <Block title="Check" subtitle="評価" content={get('check')} className="min-h-32" />
          <Block title="Act" subtitle="改善" content={get('act')} className="min-h-32" />
        </div>
        <div className="text-sm font-semibold mb-3">OODA</div>
        <div className="grid grid-cols-4 gap-3">
          <Block title="Observe" subtitle="観察" content={get('observe')} className="min-h-32" />
          <Block title="Orient" subtitle="状況判断" content={get('orient')} className="min-h-32" />
          <Block title="Decide" subtitle="意思決定" content={get('decide')} className="min-h-32" />
          <Block title="Act" subtitle="行動" content={get('actOoda')} className="min-h-32" />
        </div>
      </div>
    );
  }

  // A3
  if (L === 'a3') {
    return (
      <div className="grid grid-cols-2 border border-gray-200">
        <Block title="背景" subtitle="Background" content={get('background')} className="border-0 border-r border-b min-h-32" />
        <Block title="現状" subtitle="Current State" content={get('currentState')} className="border-0 border-b min-h-32" />
        <Block title="目標" subtitle="Goal" content={get('goal')} className="border-0 border-r border-b min-h-32" />
        <Block title="原因分析" subtitle="Root Cause" content={get('rootCause')} className="border-0 border-b min-h-32" />
        <div className="col-span-2"><Block title="対策" subtitle="Countermeasures" content={get('countermeasures')} className="border-0 border-b min-h-28" /></div>
        <Block title="実行計画" subtitle="Implementation" content={get('implementation')} className="border-0 border-r min-h-24" />
        <Block title="フォローアップ" subtitle="Follow-up" content={get('followUp')} className="border-0 min-h-24" />
      </div>
    );
  }

  // Unit Economics
  if (L === 'unitEcon') {
    return (
      <div className="grid grid-cols-3 border border-gray-200">
        <Block title="LTV" subtitle="Lifetime Value" content={get('ltv')} className="border-0 border-r border-b min-h-32" />
        <Block title="CAC" subtitle="Customer Acquisition Cost" content={get('cac')} className="border-0 border-r border-b min-h-32" />
        <Block title="LTV/CAC比率" subtitle="Ratio" content={get('ltvCacRatio')} className="border-0 border-b min-h-32" highlight />
        <Block title="回収期間" subtitle="Payback Period" content={get('paybackPeriod')} className="border-0 border-r min-h-32" />
        <Block title="ARPU" subtitle="Avg Revenue Per User" content={get('arpu')} className="border-0 border-r min-h-32" />
        <Block title="解約率 / 粗利率" subtitle="Churn / Margin" content={`${get('churnRate')}\n${get('grossMargin')}`} className="border-0 min-h-32" />
      </div>
    );
  }

  // Break-even
  if (L === 'breakeven') {
    return (
      <div className="grid grid-cols-3 border border-gray-200">
        <Block title="固定費" subtitle="Fixed Costs" content={get('fixedCosts')} className="border-0 border-r border-b min-h-32" />
        <Block title="変動費" subtitle="Variable Costs" content={get('variableCosts')} className="border-0 border-r border-b min-h-32" />
        <Block title="販売単価" subtitle="Unit Price" content={get('unitPrice')} className="border-0 border-b min-h-32" />
        <Block title="単位変動費" subtitle="Variable Cost/Unit" content={get('unitVariableCost')} className="border-0 border-r min-h-32" />
        <Block title="限界利益" subtitle="Contribution Margin" content={get('contributionMargin')} className="border-0 border-r min-h-32" />
        <Block title="損益分岐点" subtitle="Break-even Point" content={`${get('bepUnits')}\n${get('bepSales')}`} className="border-0 min-h-32" highlight />
      </div>
    );
  }

  return <div>Unknown layout: {L}</div>;
}
