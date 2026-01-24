import React from 'react';
import {
  MediaInfluenceInput,
  Platform,
  PlatformNames,
  FollowerTier,
  FollowerTierLabels,
  UpdateFrequency,
  UpdateFrequencyLabels,
  EngagementLevel,
  EngagementLevelLabels,
  BurstPattern,
  BurstPatternLabels,
  DepthLevel4,
  LongCommentLabels,
  DepthLevel3,
  PersonalStoryLabels,
  DebateLabels,
  MultiPlatformSync,
  MultiPlatformSyncLabels,
  ExternalDiscussion,
  ExternalDiscussionLabels,
  DiscussionScene,
  DiscussionSceneLabels
} from '../types/mediaInfluence';

interface MediaInfluenceFormProps {
  input: MediaInfluenceInput;
  onChange: (input: MediaInfluenceInput) => void;
  onSubmit: () => void;
}

// 通用选择器组件
function SelectField<T extends string>({
  label,
  description,
  value,
  options,
  labels,
  onChange
}: {
  label: string;
  description?: string;
  value: T;
  options: T[];
  labels: Record<T, string>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="mb-6">
      <label className="block text-ink font-medium mb-2">{label}</label>
      {description && (
        <p className="text-sm text-ink/60 mb-2">{description}</p>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full p-3 border border-border rounded-lg bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {labels[opt]}
          </option>
        ))}
      </select>
    </div>
  );
}

// 多选框组件
function CheckboxGroup({
  label,
  description,
  selected,
  options,
  labels,
  onChange
}: {
  label: string;
  description?: string;
  selected: DiscussionScene[];
  options: DiscussionScene[];
  labels: Record<DiscussionScene, string>;
  onChange: (selected: DiscussionScene[]) => void;
}) {
  const handleToggle = (option: DiscussionScene) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-ink font-medium mb-2">{label}</label>
      {description && (
        <p className="text-sm text-ink/60 mb-2">{description}</p>
      )}
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
              selected.includes(opt)
                ? 'border-ink bg-ink/5'
                : 'border-border hover:border-ink/30'
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => handleToggle(opt)}
              className="mr-2"
            />
            <span className="text-sm text-ink">{labels[opt]}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// 分组标题组件
function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6 pb-4 border-b border-border">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm text-ink/60 mt-1">{subtitle}</p>
    </div>
  );
}

export function MediaInfluenceForm({ input, onChange, onSubmit }: MediaInfluenceFormProps) {
  const updateField = <K extends keyof MediaInfluenceInput>(
    field: K,
    value: MediaInfluenceInput[K]
  ) => {
    onChange({ ...input, [field]: value });
  };

  const isFormValid = input.accountName.trim() !== '';

  return (
    <div className="max-w-2xl mx-auto">
      {/* 基础信息 */}
      <div className="bg-paper rounded-xl p-6 shadow-soft mb-6">
        <SectionTitle
          title="基础信息"
          subtitle="用于识别账号和调整评估权重"
        />

        <div className="mb-6">
          <label className="block text-ink font-medium mb-2">账号名称</label>
          <input
            type="text"
            value={input.accountName}
            onChange={(e) => updateField('accountName', e.target.value)}
            placeholder="输入账号名称或昵称"
            className="w-full p-3 border border-border rounded-lg bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
          />
        </div>

        <SelectField
          label="平台"
          value={input.platform}
          options={Object.keys(PlatformNames) as Platform[]}
          labels={PlatformNames}
          onChange={(v) => updateField('platform', v)}
        />

        <SelectField
          label="粉丝规模级别"
          description="选择该账号在平台内的相对体量"
          value={input.followerTier}
          options={Object.keys(FollowerTierLabels) as FollowerTier[]}
          labels={FollowerTierLabels}
          onChange={(v) => updateField('followerTier', v)}
        />

        <SelectField
          label="内容更新频率"
          value={input.updateFrequency}
          options={Object.keys(UpdateFrequencyLabels) as UpdateFrequency[]}
          labels={UpdateFrequencyLabels}
          onChange={(v) => updateField('updateFrequency', v)}
        />
      </div>

      {/* 维度一：互动初速度 */}
      <div className="bg-paper rounded-xl p-6 shadow-soft mb-6">
        <SectionTitle
          title="维度一：互动初速度"
          subtitle="内容发布后的即时响应强度"
        />

        <SelectField
          label="常态互动水平"
          description="相对于同级别账号，这个账号的日常互动量表现如何？"
          value={input.engagementLevel}
          options={Object.keys(EngagementLevelLabels) as EngagementLevel[]}
          labels={EngagementLevelLabels}
          onChange={(v) => updateField('engagementLevel', v)}
        />

        <SelectField
          label="内容发布后的爆发节奏"
          description="内容通常多快能获得互动？"
          value={input.burstPattern}
          options={Object.keys(BurstPatternLabels) as BurstPattern[]}
          labels={BurstPatternLabels}
          onChange={(v) => updateField('burstPattern', v)}
        />
      </div>

      {/* 维度二：语义深度 */}
      <div className="bg-paper rounded-xl p-6 shadow-soft mb-6">
        <SectionTitle
          title="维度二：语义深度"
          subtitle="观众互动的质量和深度"
        />

        <SelectField
          label="评论区长评论比例"
          description="评论区有多少超过一两句话的长评论？"
          value={input.longCommentRatio}
          options={Object.keys(LongCommentLabels) as DepthLevel4[]}
          labels={LongCommentLabels}
          onChange={(v) => updateField('longCommentRatio', v)}
        />

        <SelectField
          label="评论是否包含个人经历或情绪表达"
          description="观众是否会在评论中分享自己的故事或表达真实感受？"
          value={input.personalStories}
          options={Object.keys(PersonalStoryLabels) as DepthLevel3[]}
          labels={PersonalStoryLabels}
          onChange={(v) => updateField('personalStories', v)}
        />

        <SelectField
          label="评论区是否有观点讨论或争论"
          description="评论区是否有来回讨论、不同观点的碰撞？"
          value={input.debateLevel}
          options={Object.keys(DebateLabels) as DepthLevel3[]}
          labels={DebateLabels}
          onChange={(v) => updateField('debateLevel', v)}
        />
      </div>

      {/* 维度三：跨平台桥接度 */}
      <div className="bg-paper rounded-xl p-6 shadow-soft mb-6">
        <SectionTitle
          title="维度三：跨平台桥接度"
          subtitle="内容是否突破单一平台边界"
        />

        <SelectField
          label="创作者是否自己多平台同步"
          description="创作者是否在多个平台发布相同或相似的内容？"
          value={input.selfMultiPlatform}
          options={Object.keys(MultiPlatformSyncLabels) as MultiPlatformSync[]}
          labels={MultiPlatformSyncLabels}
          onChange={(v) => updateField('selfMultiPlatform', v)}
        />

        <SelectField
          label="是否被他人主动讨论/引用/转载到其他平台"
          description="你是否观察到其他人在别的平台讨论或引用这个账号的内容？"
          value={input.externalDiscussion}
          options={Object.keys(ExternalDiscussionLabels) as ExternalDiscussion[]}
          labels={ExternalDiscussionLabels}
          onChange={(v) => updateField('externalDiscussion', v)}
        />

        {(input.externalDiscussion === 'occasionally' || input.externalDiscussion === 'often') && (
          <CheckboxGroup
            label="他人讨论的典型场景"
            description="可多选，选择你观察到的讨论场景"
            selected={input.discussionScenes}
            options={Object.keys(DiscussionSceneLabels) as DiscussionScene[]}
            labels={DiscussionSceneLabels}
            onChange={(v) => updateField('discussionScenes', v)}
          />
        )}
      </div>

      {/* 提交按钮 */}
      <button
        onClick={onSubmit}
        disabled={!isFormValid}
        className={`w-full py-4 rounded-xl font-medium text-lg transition-all ${
          isFormValid
            ? 'bg-ink text-paper hover:bg-ink/90 shadow-soft hover:shadow-soft-hover'
            : 'bg-border text-ink/40 cursor-not-allowed'
        }`}
      >
        生成 UNRI 评估报告
      </button>
    </div>
  );
}
