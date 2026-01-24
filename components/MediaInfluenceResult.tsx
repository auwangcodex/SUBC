import React from 'react';
import { ArrowLeft, AlertCircle, Award, TrendingUp, Users, Share2 } from 'lucide-react';
import {
  UNRIResult,
  DimensionScore,
  SpecialTag,
  SpecialTagLabels,
  ConfidenceLevelLabels
} from '../types/mediaInfluence';

interface MediaInfluenceResultProps {
  result: UNRIResult;
  onBack: () => void;
}

// 分数圆环组件
function ScoreRing({ score, size = 'large' }: { score: number; size?: 'large' | 'small' }) {
  const radius = size === 'large' ? 70 : 35;
  const strokeWidth = size === 'large' ? 10 : 6;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  // 根据分数决定颜色
  const getColor = () => {
    if (score >= 80) return '#22c55e'; // 绿色
    if (score >= 60) return '#3b82f6'; // 蓝色
    if (score >= 40) return '#f59e0b'; // 橙色
    return '#ef4444'; // 红色
  };

  const containerSize = size === 'large' ? 180 : 90;
  const center = containerSize / 2;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: containerSize, height: containerSize }}>
      <svg width={containerSize} height={containerSize} className="transform -rotate-90">
        {/* 背景圆环 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* 进度圆环 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-bold text-ink ${size === 'large' ? 'text-4xl' : 'text-xl'}`}>
          {score}
        </span>
        {size === 'large' && <span className="text-sm text-ink/60">UNRI 总分</span>}
      </div>
    </div>
  );
}

// 维度得分卡片
function DimensionCard({
  title,
  icon: Icon,
  dimension,
  color
}: {
  title: string;
  icon: React.ElementType;
  dimension: DimensionScore;
  color: string;
}) {
  return (
    <div className="bg-paper rounded-xl p-5 shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon size={18} className="text-paper" />
          </div>
          <span className="font-medium text-ink">{title}</span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-ink">{dimension.score}</span>
          <span className="text-sm text-ink/60 ml-1">/ 100</span>
        </div>
      </div>

      {/* 权重说明 */}
      <div className="flex items-center gap-2 mb-3 text-sm text-ink/60">
        <span>权重 {Math.round(dimension.weight * 100)}%</span>
        <span>→</span>
        <span>贡献 {dimension.weightedScore} 分</span>
      </div>

      {/* 进度条 */}
      <div className="h-2 bg-surface rounded-full overflow-hidden mb-3">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${dimension.score}%` }}
        />
      </div>

      {/* 解释文字 */}
      <p className="text-sm text-ink/70 leading-relaxed">{dimension.explanation}</p>
    </div>
  );
}

// 特殊标签组件
function SpecialTagBadge({ tag }: { tag: SpecialTag }) {
  const tagStyles: Record<SpecialTag, string> = {
    high_resonance_low_burst: 'bg-purple-100 text-purple-800 border-purple-200',
    viral_potential: 'bg-orange-100 text-orange-800 border-orange-200',
    niche_leader: 'bg-blue-100 text-blue-800 border-blue-200',
    cross_platform_star: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${tagStyles[tag]}`}>
      <Award size={14} className="mr-1" />
      {SpecialTagLabels[tag]}
    </span>
  );
}

// 置信度指示器
function ConfidenceIndicator({ level, explanation }: { level: 'high' | 'medium' | 'low'; explanation: string }) {
  const styles = {
    high: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: 'text-green-600' },
    medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: 'text-yellow-600' },
    low: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: 'text-red-600' }
  };

  const style = styles[level];

  return (
    <div className={`${style.bg} ${style.border} border rounded-xl p-4`}>
      <div className="flex items-start gap-3">
        <AlertCircle size={20} className={`${style.icon} mt-0.5 flex-shrink-0`} />
        <div>
          <div className={`font-medium ${style.text} mb-1`}>
            置信度：{ConfidenceLevelLabels[level]}
          </div>
          <p className={`text-sm ${style.text} opacity-80`}>{explanation}</p>
        </div>
      </div>
    </div>
  );
}

export function MediaInfluenceResult({ result, onBack }: MediaInfluenceResultProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-ink/60 hover:text-ink mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>返回修改</span>
      </button>

      {/* 总分卡片 */}
      <div className="bg-paper rounded-xl p-8 shadow-soft mb-6 text-center">
        <h2 className="text-xl font-semibold text-ink mb-6">UNRI 综合影响力评估</h2>

        <div className="flex justify-center mb-6">
          <ScoreRing score={result.totalScore} size="large" />
        </div>

        {/* 特殊标签 */}
        {result.specialTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {result.specialTags.map((tag) => (
              <SpecialTagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        {/* 总体摘要 */}
        <div className="text-left bg-surface rounded-lg p-4">
          <p className="text-ink/80 leading-relaxed whitespace-pre-line">{result.summary}</p>
        </div>
      </div>

      {/* 三维度得分 */}
      <div className="space-y-4 mb-6">
        <DimensionCard
          title="互动初速度"
          icon={TrendingUp}
          dimension={result.engagementVelocity}
          color="bg-blue-500"
        />
        <DimensionCard
          title="语义深度"
          icon={Users}
          dimension={result.semanticDepth}
          color="bg-purple-500"
        />
        <DimensionCard
          title="跨平台桥接度"
          icon={Share2}
          dimension={result.crossPlatformBridge}
          color="bg-orange-500"
        />
      </div>

      {/* 平台权重说明 */}
      <div className="bg-paper rounded-xl p-5 shadow-soft mb-6">
        <h3 className="font-medium text-ink mb-3">平台权重说明</h3>
        <p className="text-sm text-ink/70 leading-relaxed">{result.platformWeightNote}</p>
      </div>

      {/* 置信度 */}
      <div className="mb-6">
        <ConfidenceIndicator
          level={result.confidence}
          explanation={result.confidenceExplanation}
        />
      </div>

      {/* 再次评估按钮 */}
      <button
        onClick={onBack}
        className="w-full py-4 rounded-xl font-medium text-lg bg-ink text-paper hover:bg-ink/90 shadow-soft hover:shadow-soft-hover transition-all"
      >
        评估另一个账号
      </button>
    </div>
  );
}
