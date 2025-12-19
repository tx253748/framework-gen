import { Framework, FrameworkData } from './types';

// Canvas API での画像エクスポート
export const exportAsImage = async (
  framework: Framework, 
  data: FrameworkData,
  withWatermark: boolean = false
): Promise<void> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const scale = 2;
  
  const layoutHeights: Record<string, number> = {
    threeC: 500, grid3: 500, grid4: 500, grid2x2: 550, grid6: 600,
    ansoff: 550, bcg: 550, sevenS: 700, kpiTree: 600, okr: 600,
    pdca: 650, a3: 750, unitEcon: 650, breakeven: 650, valueChain: 700,
    fiveForces: 600, bmc: 700, lean: 750
  };
  
  const width = 1400;
  const height = layoutHeights[framework.layout] || 700;
  
  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.scale(scale, scale);
  
  // 白背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  
  // ヘッダー
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 24px "Noto Sans JP", sans-serif';
  ctx.fillText(data.projectName || framework.name, 50, 50);
  
  ctx.fillStyle = '#666';
  ctx.font = '14px "Noto Sans JP", sans-serif';
  ctx.fillText(framework.name, 50, 75);
  
  // ブロック描画関数
  const drawBlock = (x: number, y: number, w: number, h: number, title: string, subtitle: string, content: string, highlight = false) => {
    if (highlight) {
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(x, y, w, h);
    }
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);
    
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 13px "Noto Sans JP", sans-serif';
    ctx.fillText(title, x + 16, y + 28);
    
    ctx.fillStyle = '#888';
    ctx.font = '11px "Noto Sans JP", sans-serif';
    ctx.fillText(subtitle, x + 16, y + 46);
    
    ctx.fillStyle = '#333';
    ctx.font = '12px "Noto Sans JP", sans-serif';
    const text = content || '';
    const maxWidth = w - 32;
    const lineHeight = 18;
    let offsetY = y + 70;
    
    text.split('\n').forEach(line => {
      let currentLine = '';
      for (const char of line) {
        if (ctx.measureText(currentLine + char).width > maxWidth) {
          ctx.fillText(currentLine, x + 16, offsetY);
          currentLine = char;
          offsetY += lineHeight;
          if (offsetY > y + h - 16) return;
        } else {
          currentLine += char;
        }
      }
      if (offsetY <= y + h - 16) {
        ctx.fillText(currentLine, x + 16, offsetY);
        offsetY += lineHeight;
      }
    });
  };

  const drawLabel = (x: number, y: number, w: number, text: string) => {
    ctx.fillStyle = '#888';
    ctx.font = '11px "Noto Sans JP", sans-serif';
    const tw = ctx.measureText(text).width;
    ctx.fillText(text, x + (w - tw) / 2, y);
  };

  const startY = 100;
  const L = framework.layout;
  const get = (id: string) => data[id] || '';

  // レイアウト別描画
  if (L === 'bmc') {
    const colW = 260, rowH = 180;
    drawBlock(50, startY, colW, rowH * 2, 'パートナー', 'Key Partner [KP]', get('keyPartners'));
    drawBlock(50 + colW, startY, colW, rowH, '主要活動', 'Key Activity [KA]', get('keyActivities'));
    drawBlock(50 + colW, startY + rowH, colW, rowH, 'キーリソース', 'Key Resource [KR]', get('keyResources'));
    drawBlock(50 + colW * 2, startY, colW, rowH * 2, '価値提案', 'Value Proposition [VP]', get('valuePropositions'));
    drawBlock(50 + colW * 3, startY, colW, rowH, '顧客との関係', 'Customer Relationship [CR]', get('customerRelationships'));
    drawBlock(50 + colW * 3, startY + rowH, colW, rowH, 'チャネル', 'Channel [CH]', get('channels'));
    drawBlock(50 + colW * 4, startY, colW, rowH * 2, '顧客セグメント', 'Customer Segment [CS]', get('customerSegments'));
    drawBlock(50, startY + rowH * 2, colW * 2.5, 140, 'コスト構造', 'Cost Structure', get('costStructure'));
    drawBlock(50 + colW * 2.5, startY + rowH * 2, colW * 2.5, 140, '収益の流れ', 'Revenue Stream [RS]', get('revenueStreams'));
  } else if (L === 'lean') {
    const colW = 260, rowH = 160;
    drawBlock(50, startY, colW, rowH, '課題', 'Problem', get('problem'));
    drawBlock(50, startY + rowH, colW, rowH, '既存の代替品', 'Existing Alternatives', get('existingAlternatives'));
    drawBlock(50 + colW, startY, colW, rowH, '解決策', 'Solution', get('solution'));
    drawBlock(50 + colW, startY + rowH, colW, rowH, '主要指標', 'Key Metrics', get('keyMetrics'));
    drawBlock(50 + colW * 2, startY, colW, rowH, '独自の価値提案', 'Unique Value Proposition', get('uvp'));
    drawBlock(50 + colW * 2, startY + rowH, colW, rowH, 'ハイレベルコンセプト', 'High-Level Concept', get('highlevelConcept'));
    drawBlock(50 + colW * 3, startY, colW, rowH, '圧倒的優位性', 'Unfair Advantage', get('unfairAdvantage'));
    drawBlock(50 + colW * 3, startY + rowH, colW, rowH, 'チャネル', 'Channels', get('channels'));
    drawBlock(50 + colW * 4, startY, colW, rowH, '顧客セグメント', 'Customer Segments', get('customerSegments'));
    drawBlock(50 + colW * 4, startY + rowH, colW, rowH, 'アーリーアダプター', 'Early Adopters', get('earlyAdopters'));
    drawBlock(50, startY + rowH * 2, colW * 2.5, 120, 'コスト構造', 'Cost Structure', get('costStructure'));
    drawBlock(50 + colW * 2.5, startY + rowH * 2, colW * 2.5, 120, '収益の流れ', 'Revenue Streams', get('revenueStreams'));
  } else if (L === 'threeC') {
    const colW = 420;
    drawBlock(50, startY, colW, 300, '市場・顧客', 'Customer', get('customer'));
    drawBlock(50 + colW, startY, colW, 300, '競合', 'Competitor', get('competitor'));
    drawBlock(50 + colW * 2, startY, colW, 300, '自社', 'Company', get('company'));
  } else if (L === 'fiveForces') {
    const cX = 700, cY = 320, bW = 300, bH = 150;
    drawBlock(cX - bW/2, cY - bH/2, bW, bH, '業界内の競争', 'Rivalry', get('rivalry'), true);
    drawBlock(cX - bW/2, startY, bW, bH, '新規参入の脅威', 'Threat of New Entrants', get('newEntrants'));
    drawBlock(cX - bW/2, cY + bH/2 + 50, bW, bH, '代替品の脅威', 'Threat of Substitutes', get('substitutes'));
    drawBlock(50, cY - bH/2, bW, bH, '売り手の交渉力', 'Supplier Power', get('supplierPower'));
    drawBlock(width - 50 - bW, cY - bH/2, bW, bH, '買い手の交渉力', 'Buyer Power', get('buyerPower'));
  } else if (L === 'grid6') {
    const colW = 420, rowH = 200;
    const fields = [['political', '政治的要因', 'Political'], ['economic', '経済的要因', 'Economic'], ['social', '社会的要因', 'Social'], ['technological', '技術的要因', 'Technological'], ['environmental', '環境的要因', 'Environmental'], ['legal', '法的要因', 'Legal']];
    fields.forEach((f, i) => drawBlock(50 + (i % 3) * colW, startY + Math.floor(i / 3) * rowH, colW, rowH, f[1], f[2], get(f[0])));
  } else if (L === 'grid2x2') {
    const colW = 640, rowH = 200;
    drawBlock(50, startY, colW, rowH, '強み', 'Strengths', get('strengths'));
    drawBlock(50 + colW, startY, colW, rowH, '機会', 'Opportunities', get('opportunities'));
    drawBlock(50, startY + rowH, colW, rowH, '弱み', 'Weaknesses', get('weaknesses'));
    drawBlock(50 + colW, startY + rowH, colW, rowH, '脅威', 'Threats', get('threats'));
  } else if (L === 'grid3') {
    const colW = 420;
    drawBlock(50, startY, colW, 300, 'セグメンテーション', 'Segmentation', get('segmentation'));
    drawBlock(50 + colW, startY, colW, 300, 'ターゲティング', 'Targeting', get('targeting'));
    drawBlock(50 + colW * 2, startY, colW, 300, 'ポジショニング', 'Positioning', get('positioning'));
  } else if (L === 'grid4') {
    const colW = 320;
    const fields = [['value', '経済的価値', 'Value'], ['rarity', '希少性', 'Rarity'], ['imitability', '模倣困難性', 'Imitability'], ['organization', '組織', 'Organization']];
    fields.forEach((f, i) => drawBlock(50 + i * colW, startY, colW, 300, f[1], f[2], get(f[0])));
  } else if (L === 'ansoff' || L === 'bcg') {
    const colW = 600, rowH = 180, lW = 100;
    const isA = L === 'ansoff';
    const fields = isA 
      ? [['marketPenetration', '市場浸透'], ['productDevelopment', '製品開発'], ['marketDevelopment', '市場開拓'], ['diversification', '多角化']]
      : [['star', '花形 ⭐'], ['questionMark', '問題児 ❓'], ['cashCow', '金のなる木 💰'], ['dog', '負け犬 🐕']];
    drawLabel(lW + 50, startY - 10, colW, isA ? '既存製品' : '高シェア');
    drawLabel(lW + 50 + colW, startY - 10, colW, isA ? '新製品' : '低シェア');
    fields.forEach((f, i) => drawBlock(lW + 50 + (i % 2) * colW, startY + Math.floor(i / 2) * rowH, colW, rowH, f[1], f[0], get(f[0])));
  } else if (L === 'valueChain') {
    const sH = 80, mH = 140, mW = 250, sW = 1250;
    drawBlock(50, startY, sW, sH, '全般管理', 'Firm Infrastructure', get('infrastructure'));
    drawBlock(50, startY + sH, sW, sH, '人事・労務管理', 'HRM', get('hrm'));
    drawBlock(50, startY + sH * 2, sW, sH, '技術開発', 'Technology', get('technology'));
    drawBlock(50, startY + sH * 3, sW, sH, '調達活動', 'Procurement', get('procurement'));
    const mY = startY + sH * 4 + 20;
    drawBlock(50, mY, mW, mH, '購買物流', 'Inbound', get('inboundLogistics'));
    drawBlock(50 + mW, mY, mW, mH, '製造', 'Operations', get('operations'));
    drawBlock(50 + mW * 2, mY, mW, mH, '出荷物流', 'Outbound', get('outboundLogistics'));
    drawBlock(50 + mW * 3, mY, mW, mH, 'マーケ・販売', 'Marketing', get('marketingSales'));
    drawBlock(50 + mW * 4, mY, mW, mH, 'サービス', 'Service', get('service'));
  } else if (L === 'sevenS') {
    const bW = 280, bH = 150;
    drawBlock(50, startY, bW, bH, '戦略', 'Strategy', get('strategy'));
    drawBlock(50 + bW + 20, startY, bW, bH, '組織構造', 'Structure', get('structure'));
    drawBlock(50 + (bW + 20) * 2, startY, bW, bH, 'システム', 'Systems', get('systems'));
    drawBlock(width/2 - bW/2, startY + bH + 40, bW, bH, '共通の価値観', 'Shared Values', get('sharedValues'), true);
    drawBlock(50 + (bW + 20) * 3, startY, bW, bH, 'スタイル', 'Style', get('style'));
    drawBlock(50, startY + (bH + 40) * 2, bW, bH, '人材', 'Staff', get('staff'));
    drawBlock(width - 50 - bW, startY + (bH + 40) * 2, bW, bH, 'スキル', 'Skills', get('skills'));
  } else if (L === 'kpiTree') {
    const kgiW = 400, kpiW = 350, h = 120;
    drawBlock(width/2 - kgiW/2, startY, kgiW, h, 'KGI', 'Key Goal Indicator', get('kgi'), true);
    drawBlock(50, startY + h + 50, kpiW, h, 'KPI①', 'KPI', get('kpi1'));
    drawBlock(width/2 - kpiW/2, startY + h + 50, kpiW, h, 'KPI②', 'KPI', get('kpi2'));
    drawBlock(width - 50 - kpiW, startY + h + 50, kpiW, h, 'KPI③', 'KPI', get('kpi3'));
    drawBlock(50, startY + (h + 50) * 2, kpiW, h, 'アクション①', 'Actions', get('action1'));
    drawBlock(width/2 - kpiW/2, startY + (h + 50) * 2, kpiW, h, 'アクション②', 'Actions', get('action2'));
    drawBlock(width - 50 - kpiW, startY + (h + 50) * 2, kpiW, h, 'アクション③', 'Actions', get('action3'));
  } else if (L === 'okr') {
    const oW = 600, krW = 380, h = 130;
    drawBlock(width/2 - oW/2, startY, oW, h, 'Objective', 'What to achieve', get('objective'), true);
    drawBlock(50, startY + h + 40, krW, h, 'Key Result①', 'Measurable', get('kr1'));
    drawBlock(width/2 - krW/2, startY + h + 40, krW, h, 'Key Result②', 'Measurable', get('kr2'));
    drawBlock(width - 50 - krW, startY + h + 40, krW, h, 'Key Result③', 'Measurable', get('kr3'));
    drawBlock(50, startY + (h + 40) * 2, width - 100, h, 'Initiatives', 'Action plans', get('initiatives'));
  } else if (L === 'pdca') {
    const bW = 300, bH = 180;
    ctx.fillStyle = '#1a1a1a'; ctx.font = 'bold 14px "Noto Sans JP", sans-serif'; ctx.fillText('PDCA', 50, startY - 10);
    drawBlock(50, startY, bW, bH, 'Plan', 'PDCA', get('plan'));
    drawBlock(50 + bW + 20, startY, bW, bH, 'Do', 'PDCA', get('do'));
    drawBlock(50 + (bW + 20) * 2, startY, bW, bH, 'Check', 'PDCA', get('check'));
    drawBlock(50 + (bW + 20) * 3, startY, bW, bH, 'Act', 'PDCA', get('act'));
    const oY = startY + bH + 60;
    ctx.fillText('OODA', 50, oY - 10);
    drawBlock(50, oY, bW, bH, 'Observe', 'OODA', get('observe'));
    drawBlock(50 + bW + 20, oY, bW, bH, 'Orient', 'OODA', get('orient'));
    drawBlock(50 + (bW + 20) * 2, oY, bW, bH, 'Decide', 'OODA', get('decide'));
    drawBlock(50 + (bW + 20) * 3, oY, bW, bH, 'Act', 'OODA', get('actOoda'));
  } else if (L === 'a3') {
    const colW = 640, rowH = 180;
    drawBlock(50, startY, colW, rowH, '背景', 'Background', get('background'));
    drawBlock(50 + colW + 20, startY, colW, rowH, '現状', 'Current State', get('currentState'));
    drawBlock(50, startY + rowH + 10, colW, rowH, '目標', 'Goal', get('goal'));
    drawBlock(50 + colW + 20, startY + rowH + 10, colW, rowH, '原因分析', 'Root Cause', get('rootCause'));
    drawBlock(50, startY + (rowH + 10) * 2, colW * 2 + 20, 160, '対策', 'Countermeasures', get('countermeasures'));
    drawBlock(50, startY + (rowH + 10) * 2 + 170, colW, 120, '実行計画', 'Implementation', get('implementation'));
    drawBlock(50 + colW + 20, startY + (rowH + 10) * 2 + 170, colW, 120, 'フォローアップ', 'Follow-up', get('followUp'));
  } else if (L === 'unitEcon') {
    const colW = 420, rowH = 160;
    drawBlock(50, startY, colW, rowH, 'LTV', 'Lifetime Value', get('ltv'));
    drawBlock(50 + colW + 20, startY, colW, rowH, 'CAC', 'Customer Acquisition Cost', get('cac'));
    drawBlock(50 + (colW + 20) * 2, startY, colW, rowH, 'LTV/CAC比率', 'Ratio', get('ltvCacRatio'), true);
    drawBlock(50, startY + rowH + 10, colW, rowH, '回収期間', 'Payback Period', get('paybackPeriod'));
    drawBlock(50 + colW + 20, startY + rowH + 10, colW, rowH, 'ARPU', 'Avg Revenue Per User', get('arpu'));
    drawBlock(50 + (colW + 20) * 2, startY + rowH + 10, colW, rowH, '解約率 / 粗利率', 'Churn / Margin', get('churnRate') + '\n' + get('grossMargin'));
  } else if (L === 'breakeven') {
    const colW = 420, rowH = 160;
    drawBlock(50, startY, colW, rowH, '固定費', 'Fixed Costs', get('fixedCosts'));
    drawBlock(50 + colW + 20, startY, colW, rowH, '変動費', 'Variable Costs', get('variableCosts'));
    drawBlock(50 + (colW + 20) * 2, startY, colW, rowH, '販売単価', 'Unit Price', get('unitPrice'));
    drawBlock(50, startY + rowH + 10, colW, rowH, '単位変動費', 'Variable Cost/Unit', get('unitVariableCost'));
    drawBlock(50 + colW + 20, startY + rowH + 10, colW, rowH, '限界利益', 'Contribution Margin', get('contributionMargin'));
    drawBlock(50 + (colW + 20) * 2, startY + rowH + 10, colW, rowH, '損益分岐点', 'Break-even Point', get('bepUnits') + '\n' + get('bepSales'), true);
  }

  // 透かし
  if (withWatermark) {
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#000';
    ctx.font = 'bold 48px "Noto Sans JP", sans-serif';
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-Math.PI / 6);
    const wmText = 'Framework Generator';
    const wmWidth = ctx.measureText(wmText).width;
    ctx.fillText(wmText, -wmWidth / 2, 0);
    ctx.font = 'bold 24px "Noto Sans JP", sans-serif';
    const wmText2 = 'FREE VERSION';
    const wmWidth2 = ctx.measureText(wmText2).width;
    ctx.fillText(wmText2, -wmWidth2 / 2, 40);
    ctx.restore();
  }

  // フッター
  ctx.fillStyle = '#aaa';
  ctx.font = '10px "Noto Sans JP", sans-serif';
  ctx.fillText(new Date().toLocaleDateString('ja-JP'), width - 100, height - 20);

  // ダウンロード
  const link = document.createElement('a');
  link.download = `${framework.shortName}_${data.projectName || 'canvas'}_${new Date().toISOString().split('T')[0]}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};
