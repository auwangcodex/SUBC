// UNRI 媒体影响力评估 - 类型定义

// 平台类型
export type Platform = 'douyin' | 'bilibili' | 'xiaoyuzhou' | 'weixin_video' | 'weixin_gzh' | 'other';

// 平台中文名称映射
export const PlatformNames: Record<Platform, string> = {
  douyin: '抖音',
  bilibili: 'B站',
  xiaoyuzhou: '小宇宙播客',
  weixin_video: '视频号',
  weixin_gzh: '微信公众号',
  other: '其他平台'
};

// 粉丝规模级别
export type FollowerTier = 'seed' | 'growing' | 'mid' | 'top' | 'super_top';

export const FollowerTierLabels: Record<FollowerTier, string> = {
  seed: '萌芽期（<1万）',
  growing: '成长期（1-10万）',
  mid: '腰部（10-100万）',
  top: '头部（100-500万）',
  super_top: '超头部（>500万）'
};

// 更新频率
export type UpdateFrequency = 'daily' | 'weekly' | 'monthly' | 'irregular';

export const UpdateFrequencyLabels: Record<UpdateFrequency, string> = {
  daily: '日更',
  weekly: '周更',
  monthly: '月更',
  irregular: '不规律'
};

// 常态互动水平（相对于同级别账号）
export type EngagementLevel = 'below_avg' | 'average' | 'above_avg' | 'far_above';

export const EngagementLevelLabels: Record<EngagementLevel, string> = {
  below_avg: '明显低于平均',
  average: '接近平均',
  above_avg: '明显高于平均',
  far_above: '远超平均'
};

// 爆发节奏
export type BurstPattern = 'slow' | 'normal' | 'explosive';

export const BurstPatternLabels: Record<BurstPattern, string> = {
  slow: '慢热型（几天后才起量）',
  normal: '正常（24小时内稳定增长）',
  explosive: '爆发型（几小时内快速起量）'
};

// 评论深度选项（四级）
export type DepthLevel4 = 'none' | 'few' | 'some' | 'many';

export const LongCommentLabels: Record<DepthLevel4, string> = {
  none: '几乎没有',
  few: '少量',
  some: '较多',
  many: '大量'
};

// 评论深度选项（三级）
export type DepthLevel3 = 'rare' | 'sometimes' | 'common';

export const PersonalStoryLabels: Record<DepthLevel3, string> = {
  rare: '很少',
  sometimes: '有一些',
  common: '很常见'
};

export const DebateLabels: Record<DepthLevel3, string> = {
  rare: '基本没有',
  sometimes: '偶尔',
  common: '经常'
};

// 是否多平台同步
export type MultiPlatformSync = 'yes' | 'no' | 'unknown';

export const MultiPlatformSyncLabels: Record<MultiPlatformSync, string> = {
  yes: '是',
  no: '否',
  unknown: '不清楚'
};

// 他人主动讨论程度
export type ExternalDiscussion = 'none' | 'occasionally' | 'often' | 'unknown';

export const ExternalDiscussionLabels: Record<ExternalDiscussion, string> = {
  none: '没观察到',
  occasionally: '偶尔有',
  often: '经常有',
  unknown: '不确定'
};

// 跨平台讨论场景
export type DiscussionScene = 'weibo' | 'zhihu' | 'wechat' | 'media' | 'recreate' | 'other';

export const DiscussionSceneLabels: Record<DiscussionScene, string> = {
  weibo: '微博热议',
  zhihu: '知乎回答引用',
  wechat: '微信群/朋友圈传播',
  media: '媒体报道',
  recreate: '其他平台二创',
  other: '其他'
};

// 完整的输入表单数据结构
export interface MediaInfluenceInput {
  // 基础信息
  accountName: string;
  platform: Platform;
  followerTier: FollowerTier;
  updateFrequency: UpdateFrequency;

  // 维度一：互动初速度
  engagementLevel: EngagementLevel;
  burstPattern: BurstPattern;

  // 维度二：语义深度
  longCommentRatio: DepthLevel4;
  personalStories: DepthLevel3;
  debateLevel: DepthLevel3;

  // 维度三：跨平台桥接度
  selfMultiPlatform: MultiPlatformSync;
  externalDiscussion: ExternalDiscussion;
  discussionScenes: DiscussionScene[];
}

// 单个维度的评分结果
export interface DimensionScore {
  score: number;        // 0-100
  weight: number;       // 权重百分比
  weightedScore: number; // 加权后得分
  explanation: string;   // 中文解释
}

// 置信度等级
export type ConfidenceLevel = 'high' | 'medium' | 'low';

export const ConfidenceLevelLabels: Record<ConfidenceLevel, string> = {
  high: '高',
  medium: '中',
  low: '低'
};

// 特殊标签
export type SpecialTag = 'high_resonance_low_burst' | 'viral_potential' | 'niche_leader' | 'cross_platform_star';

export const SpecialTagLabels: Record<SpecialTag, string> = {
  high_resonance_low_burst: '高共振 · 低爆发',
  viral_potential: '破圈潜力股',
  niche_leader: '垂直领域领袖',
  cross_platform_star: '跨平台明星'
};

// 完整的评估结果
export interface UNRIResult {
  // 总分
  totalScore: number;  // 0-100

  // 各维度得分
  engagementVelocity: DimensionScore;  // 互动初速度
  semanticDepth: DimensionScore;        // 语义深度
  crossPlatformBridge: DimensionScore;  // 跨平台桥接度

  // 置信度
  confidence: ConfidenceLevel;
  confidenceExplanation: string;

  // 特殊标签（可能为空）
  specialTags: SpecialTag[];

  // 总体解释（给人看的中文说明）
  summary: string;

  // 平台权重说明
  platformWeightNote: string;
}

// 平台权重配置
export interface PlatformWeights {
  engagementVelocity: number;  // 互动初速度权重
  semanticDepth: number;        // 语义深度权重
  crossPlatformBridge: number;  // 跨平台桥接度权重
}

// 各平台的默认权重配置
export const PlatformWeightConfig: Record<Platform, PlatformWeights> = {
  douyin: {
    engagementVelocity: 0.45,
    semanticDepth: 0.25,
    crossPlatformBridge: 0.30
  },
  bilibili: {
    engagementVelocity: 0.35,
    semanticDepth: 0.40,
    crossPlatformBridge: 0.25
  },
  xiaoyuzhou: {
    engagementVelocity: 0.20,
    semanticDepth: 0.50,
    crossPlatformBridge: 0.30
  },
  weixin_video: {
    engagementVelocity: 0.30,
    semanticDepth: 0.30,
    crossPlatformBridge: 0.40
  },
  weixin_gzh: {
    engagementVelocity: 0.30,
    semanticDepth: 0.40,
    crossPlatformBridge: 0.30
  },
  other: {
    engagementVelocity: 0.35,
    semanticDepth: 0.35,
    crossPlatformBridge: 0.30
  }
};
