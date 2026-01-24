// UNRI (User-Network Resonance Index) 计算服务
// 媒体影响力评估核心算法

import {
  MediaInfluenceInput,
  UNRIResult,
  DimensionScore,
  ConfidenceLevel,
  SpecialTag,
  PlatformWeightConfig,
  PlatformNames,
  EngagementLevel,
  BurstPattern,
  DepthLevel4,
  DepthLevel3,
  ExternalDiscussion,
  DiscussionScene
} from '../types/mediaInfluence';

// ==================== 分数映射表 ====================

// 互动水平得分映射
const engagementLevelScores: Record<EngagementLevel, number> = {
  below_avg: 25,
  average: 50,
  above_avg: 75,
  far_above: 95
};

// 爆发节奏得分映射
const burstPatternScores: Record<BurstPattern, number> = {
  slow: 35,
  normal: 60,
  explosive: 90
};

// 长评论比例得分映射
const longCommentScores: Record<DepthLevel4, number> = {
  none: 15,
  few: 40,
  some: 70,
  many: 95
};

// 个人经历/情绪表达得分映射
const personalStoryScores: Record<DepthLevel3, number> = {
  rare: 20,
  sometimes: 55,
  common: 90
};

// 观点讨论得分映射
const debateScores: Record<DepthLevel3, number> = {
  rare: 20,
  sometimes: 55,
  common: 90
};

// 他人主动讨论得分映射
const externalDiscussionScores: Record<ExternalDiscussion, number> = {
  none: 15,
  occasionally: 50,
  often: 90,
  unknown: 40  // 不确定时给保守中间值
};

// 讨论场景权重（用于加成）
const discussionSceneWeights: Record<DiscussionScene, number> = {
  media: 1.0,      // 媒体报道权重最高
  weibo: 0.8,      // 微博热议
  zhihu: 0.7,      // 知乎引用
  wechat: 0.6,     // 微信传播
  recreate: 0.9,   // 二创（说明内容有延展性）
  other: 0.5
};

// ==================== 核心计算函数 ====================

/**
 * 计算互动初速度维度得分
 */
function calculateEngagementVelocity(input: MediaInfluenceInput): { score: number; explanation: string } {
  // 基础得分：互动水平占 70%，爆发节奏占 30%
  const engagementScore = engagementLevelScores[input.engagementLevel];
  const burstScore = burstPatternScores[input.burstPattern];

  const rawScore = engagementScore * 0.7 + burstScore * 0.3;
  const score = Math.round(rawScore);

  // 生成解释
  let explanation = '';

  if (score >= 80) {
    explanation = '互动表现非常强劲，内容发布后能快速获得大量响应，算法推荐效率高。';
  } else if (score >= 60) {
    explanation = '互动表现良好，在同级别账号中处于中上水平，内容有稳定的触达能力。';
  } else if (score >= 40) {
    explanation = '互动表现一般，与同级别账号相比没有明显优势，可能需要优化内容策略或发布时机。';
  } else {
    explanation = '互动表现偏弱，内容触达效率较低，建议关注内容选题和发布节奏的优化。';
  }

  // 特殊情况补充
  if (input.burstPattern === 'slow' && engagementScore >= 50) {
    explanation += '虽然属于慢热型，但最终互动水平不错，说明内容有长尾价值。';
  }

  return { score, explanation };
}

/**
 * 计算语义深度维度得分
 */
function calculateSemanticDepth(input: MediaInfluenceInput): { score: number; explanation: string } {
  // 长评论比例占 30%，个人经历/情绪占 40%（最重要），观点讨论占 30%
  const longCommentScore = longCommentScores[input.longCommentRatio];
  const personalScore = personalStoryScores[input.personalStories];
  const debateScore = debateScores[input.debateLevel];

  const rawScore = longCommentScore * 0.3 + personalScore * 0.4 + debateScore * 0.3;
  const score = Math.round(rawScore);

  // 生成解释
  let explanation = '';

  if (score >= 80) {
    explanation = '评论区质量非常高，观众愿意分享个人经历、表达真实情感、参与深度讨论，这是强共振的典型表现。';
  } else if (score >= 60) {
    explanation = '评论区有一定深度，部分观众会认真回应，说明内容能触发一定程度的情感共鸣。';
  } else if (score >= 40) {
    explanation = '评论区以简短互动为主，深度讨论较少，观众参与主要停留在表层。';
  } else {
    explanation = '评论区较浅，大多是随手点赞或简单回复，缺乏真正的情感连接。';
  }

  // 特殊情况补充
  if (input.personalStories === 'common' && input.longCommentRatio !== 'many') {
    explanation += '值得注意的是，虽然长评论不多，但有较多情感共鸣型回应，说明内容击中了观众的情感点。';
  }

  return { score, explanation };
}

/**
 * 计算跨平台桥接度维度得分
 */
function calculateCrossPlatformBridge(input: MediaInfluenceInput): { score: number; explanation: string } {
  // 核心得分来自"他人主动讨论"
  let baseScore = externalDiscussionScores[input.externalDiscussion];

  // 讨论场景加成（最多加 15 分）
  let sceneBonus = 0;
  if (input.discussionScenes.length > 0 && input.externalDiscussion !== 'none') {
    const maxSceneWeight = Math.max(...input.discussionScenes.map(s => discussionSceneWeights[s]));
    const sceneCount = input.discussionScenes.length;
    // 场景质量 + 场景数量都考虑
    sceneBonus = Math.min(15, maxSceneWeight * 10 + sceneCount * 2);
  }

  const rawScore = Math.min(100, baseScore + sceneBonus);
  const score = Math.round(rawScore);

  // 生成解释
  let explanation = '';

  if (score >= 80) {
    explanation = '内容有很强的跨平台穿透力，经常被其他平台的用户主动讨论、引用或转载，影响力已突破单一平台边界。';
  } else if (score >= 55) {
    explanation = '内容偶尔能"出圈"，在其他平台有一定讨论度，具备一定的跨平台影响潜力。';
  } else if (score >= 35) {
    explanation = '内容主要在原平台内传播，跨平台影响力有限，但这在大多数创作者中是正常情况。';
  } else {
    explanation = '暂未观察到明显的跨平台传播，影响力主要局限在单一平台内。';
  }

  // 自发同步的说明
  if (input.selfMultiPlatform === 'yes') {
    if (input.externalDiscussion === 'none' || input.externalDiscussion === 'unknown') {
      explanation += '创作者有多平台同步分发，但这属于主动运营策略，不代表内容自然破圈。';
    } else {
      explanation += '创作者有多平台布局，且内容确实引发了他人的主动讨论，说明分发策略和内容质量形成了良性配合。';
    }
  }

  return { score, explanation };
}

/**
 * 计算置信度
 */
function calculateConfidence(input: MediaInfluenceInput): { level: ConfidenceLevel; explanation: string } {
  let uncertaintyCount = 0;
  const uncertainties: string[] = [];

  // 检查不确定因素
  if (input.externalDiscussion === 'unknown') {
    uncertaintyCount += 2;  // 这个影响较大
    uncertainties.push('跨平台讨论情况不确定');
  }

  if (input.selfMultiPlatform === 'unknown') {
    uncertaintyCount += 1;
    uncertainties.push('多平台同步情况不确定');
  }

  if (input.platform === 'other') {
    uncertaintyCount += 1;
    uncertainties.push('平台类型为"其他"，无法应用优化的权重配置');
  }

  // 判断置信度等级
  let level: ConfidenceLevel;
  let explanation: string;

  if (uncertaintyCount === 0) {
    level = 'high';
    explanation = '所有关键输入都有明确选择，评估结果可信度高。';
  } else if (uncertaintyCount <= 2) {
    level = 'medium';
    explanation = `评估结果基本可参考，但以下因素存在不确定性：${uncertainties.join('、')}。`;
  } else {
    level = 'low';
    explanation = `多个关键信息不确定（${uncertainties.join('、')}），评估结果仅供参考，建议补充信息后重新评估。`;
  }

  return { level, explanation };
}

/**
 * 检测特殊标签
 */
function detectSpecialTags(
  input: MediaInfluenceInput,
  engagementScore: number,
  semanticScore: number,
  bridgeScore: number,
  totalScore: number
): SpecialTag[] {
  const tags: SpecialTag[] = [];

  // 高共振 · 低爆发：互动初速度偏低，但语义深度很高，且总分不低
  if (engagementScore <= 55 && semanticScore >= 70 && totalScore >= 60) {
    tags.push('high_resonance_low_burst');
  }

  // 破圈潜力股：桥接度高，但整体还在成长
  if (bridgeScore >= 70 && totalScore >= 50 && totalScore < 75) {
    tags.push('viral_potential');
  }

  // 垂直领域领袖：语义深度极高，但桥接度不高（说明在小圈子里很有影响力）
  if (semanticScore >= 85 && bridgeScore < 50 && engagementScore >= 50) {
    tags.push('niche_leader');
  }

  // 跨平台明星：桥接度极高
  if (bridgeScore >= 85) {
    tags.push('cross_platform_star');
  }

  return tags;
}

/**
 * 生成特殊标签的解释文字
 */
function generateTagExplanation(tags: SpecialTag[]): string {
  if (tags.length === 0) return '';

  const explanations: string[] = [];

  if (tags.includes('high_resonance_low_burst')) {
    explanations.push('这个账号的流量表现一般，但观众参与质量很高。这类账号在传统流量指标中容易被低估，但在品牌深度合作、用户信任度、长期影响力方面可能有独特价值。');
  }

  if (tags.includes('viral_potential')) {
    explanations.push('内容已经展现出跨平台传播的能力，如果持续产出优质内容，有较大的破圈潜力。');
  }

  if (tags.includes('niche_leader')) {
    explanations.push('在特定垂直领域内有很强的影响力和信任度，虽然受众面不广，但在该领域内是意见领袖级别的存在。');
  }

  if (tags.includes('cross_platform_star')) {
    explanations.push('影响力已经突破平台边界，在多个平台都有讨论度，是真正意义上的"出圈"创作者。');
  }

  return explanations.join(' ');
}

/**
 * 生成总体评估摘要
 */
function generateSummary(
  input: MediaInfluenceInput,
  totalScore: number,
  engagementScore: number,
  semanticScore: number,
  bridgeScore: number,
  tags: SpecialTag[]
): string {
  const platformName = PlatformNames[input.platform];

  // 基础评价
  let grade: string;
  if (totalScore >= 85) {
    grade = '非常优秀';
  } else if (totalScore >= 70) {
    grade = '表现良好';
  } else if (totalScore >= 55) {
    grade = '中等水平';
  } else if (totalScore >= 40) {
    grade = '有待提升';
  } else {
    grade = '需要重点关注';
  }

  let summary = `「${input.accountName}」在${platformName}平台的 UNRI 综合影响力评分为 ${totalScore} 分，整体表现${grade}。`;

  // 找出最强和最弱的维度
  const dimensions = [
    { name: '互动初速度', score: engagementScore },
    { name: '语义深度', score: semanticScore },
    { name: '跨平台桥接度', score: bridgeScore }
  ];

  const sorted = [...dimensions].sort((a, b) => b.score - a.score);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  if (strongest.score - weakest.score >= 20) {
    summary += `\n\n最突出的优势是「${strongest.name}」（${strongest.score}分），`;
    summary += `而「${weakest.name}」（${weakest.score}分）相对较弱，有提升空间。`;
  } else {
    summary += '\n\n三个维度的表现相对均衡，没有明显的短板。';
  }

  // 添加特殊标签说明
  const tagExplanation = generateTagExplanation(tags);
  if (tagExplanation) {
    summary += '\n\n' + tagExplanation;
  }

  return summary;
}

/**
 * 生成平台权重说明
 */
function generatePlatformWeightNote(input: MediaInfluenceInput): string {
  const platformName = PlatformNames[input.platform];
  const weights = PlatformWeightConfig[input.platform];

  const notes: Record<string, string> = {
    douyin: `由于是${platformName}平台，互动初速度的权重被调高至 ${weights.engagementVelocity * 100}%（基准是 35%），因为抖音的算法推荐高度依赖初期互动数据。语义深度权重相应降低至 ${weights.semanticDepth * 100}%，因为短视频平台的评论区天然较浅。`,

    bilibili: `由于是${platformName}平台，语义深度的权重被调高至 ${weights.semanticDepth * 100}%（基准是 35%），因为 B站用户更愿意发弹幕和长评论，评论区文化成熟。`,

    xiaoyuzhou: `由于是${platformName}平台，语义深度的权重被调高至 ${weights.semanticDepth * 100}%（基准是 35%），因为播客听众通常更深度、更忠诚，评论质量普遍较高。互动初速度权重降低至 ${weights.engagementVelocity * 100}%，因为播客本身互动量就比视频平台低，这是媒介特性决定的。`,

    weixin_video: `由于是${platformName}平台，跨平台桥接度的权重被调高至 ${weights.crossPlatformBridge * 100}%（基准是 30%），因为视频号天然嵌入微信社交生态，内容更容易在微信群和朋友圈传播。`,

    weixin_gzh: `由于是${platformName}平台，语义深度的权重被调高至 ${weights.semanticDepth * 100}%，因为公众号读者通常有更强的阅读习惯和评论意愿。`,

    other: `由于平台类型为"其他"，系统使用了默认的均衡权重配置（互动初速度 ${weights.engagementVelocity * 100}%、语义深度 ${weights.semanticDepth * 100}%、跨平台桥接度 ${weights.crossPlatformBridge * 100}%）。如果能选择具体平台，评估结果会更准确。`
  };

  return notes[input.platform] || notes.other;
}

// ==================== 主计算函数 ====================

/**
 * 计算 UNRI 评分
 * @param input 用户输入的评估数据
 * @returns 完整的 UNRI 评估结果
 */
export function calculateUNRI(input: MediaInfluenceInput): UNRIResult {
  // 获取平台权重配置
  const weights = PlatformWeightConfig[input.platform];

  // 计算各维度得分
  const engagementResult = calculateEngagementVelocity(input);
  const semanticResult = calculateSemanticDepth(input);
  const bridgeResult = calculateCrossPlatformBridge(input);

  // 计算加权得分
  const engagementWeighted = engagementResult.score * weights.engagementVelocity;
  const semanticWeighted = semanticResult.score * weights.semanticDepth;
  const bridgeWeighted = bridgeResult.score * weights.crossPlatformBridge;

  // 计算总分
  const totalScore = Math.round(engagementWeighted + semanticWeighted + bridgeWeighted);

  // 计算置信度
  const confidence = calculateConfidence(input);

  // 检测特殊标签
  const specialTags = detectSpecialTags(
    input,
    engagementResult.score,
    semanticResult.score,
    bridgeResult.score,
    totalScore
  );

  // 生成摘要和说明
  const summary = generateSummary(
    input,
    totalScore,
    engagementResult.score,
    semanticResult.score,
    bridgeResult.score,
    specialTags
  );

  const platformWeightNote = generatePlatformWeightNote(input);

  // 组装结果
  return {
    totalScore,
    engagementVelocity: {
      score: engagementResult.score,
      weight: weights.engagementVelocity,
      weightedScore: Math.round(engagementWeighted),
      explanation: engagementResult.explanation
    },
    semanticDepth: {
      score: semanticResult.score,
      weight: weights.semanticDepth,
      weightedScore: Math.round(semanticWeighted),
      explanation: semanticResult.explanation
    },
    crossPlatformBridge: {
      score: bridgeResult.score,
      weight: weights.crossPlatformBridge,
      weightedScore: Math.round(bridgeWeighted),
      explanation: bridgeResult.explanation
    },
    confidence: confidence.level,
    confidenceExplanation: confidence.explanation,
    specialTags,
    summary,
    platformWeightNote
  };
}

/**
 * 创建空白输入模板
 */
export function createEmptyInput(): MediaInfluenceInput {
  return {
    accountName: '',
    platform: 'douyin',
    followerTier: 'growing',
    updateFrequency: 'weekly',
    engagementLevel: 'average',
    burstPattern: 'normal',
    longCommentRatio: 'few',
    personalStories: 'sometimes',
    debateLevel: 'sometimes',
    selfMultiPlatform: 'unknown',
    externalDiscussion: 'unknown',
    discussionScenes: []
  };
}
