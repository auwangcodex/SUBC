import React, { useState } from 'react';
import { X, BarChart3 } from 'lucide-react';
import { MediaInfluenceInput, UNRIResult } from '../types/mediaInfluence';
import { calculateUNRI, createEmptyInput } from '../services/unri';
import { MediaInfluenceForm } from './MediaInfluenceForm';
import { MediaInfluenceResult } from './MediaInfluenceResult';

interface MediaInfluenceEvaluatorProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewState = 'form' | 'result';

export function MediaInfluenceEvaluator({ isOpen, onClose }: MediaInfluenceEvaluatorProps) {
  const [viewState, setViewState] = useState<ViewState>('form');
  const [input, setInput] = useState<MediaInfluenceInput>(createEmptyInput());
  const [result, setResult] = useState<UNRIResult | null>(null);

  const handleSubmit = () => {
    const evaluationResult = calculateUNRI(input);
    setResult(evaluationResult);
    setViewState('result');
  };

  const handleBack = () => {
    setViewState('form');
  };

  const handleReset = () => {
    setInput(createEmptyInput());
    setResult(null);
    setViewState('form');
  };

  const handleClose = () => {
    onClose();
    // 关闭后重置状态
    setTimeout(() => {
      handleReset();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-ink/50 transition-opacity"
        onClick={handleClose}
      />

      {/* 滑出面板 */}
      <div className="absolute inset-y-0 right-0 w-full max-w-2xl bg-surface shadow-xl transform transition-transform duration-300 overflow-hidden">
        {/* 头部 */}
        <div className="sticky top-0 bg-paper border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-ink/5 rounded-lg">
              <BarChart3 size={24} className="text-ink" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink">UNRI 媒体影响力评估</h2>
              <p className="text-sm text-ink/60">跨平台、多维度的影响力分析工具</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <X size={24} className="text-ink/60" />
          </button>
        </div>

        {/* 内容区域 */}
        <div className="h-full overflow-y-auto pb-32">
          <div className="px-6 py-6">
            {viewState === 'form' ? (
              <MediaInfluenceForm
                input={input}
                onChange={setInput}
                onSubmit={handleSubmit}
              />
            ) : result ? (
              <MediaInfluenceResult
                result={result}
                onBack={handleBack}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

// 触发按钮组件（可以放在页面任意位置）
export function MediaInfluenceButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-ink text-paper rounded-lg hover:bg-ink/90 transition-colors shadow-soft"
    >
      <BarChart3 size={18} />
      <span>影响力评估</span>
    </button>
  );
}
