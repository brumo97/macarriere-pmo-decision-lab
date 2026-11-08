/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface RecruiterTourBarProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectStep: (step: number) => void;
  onClose: () => void;
}

const STEPS_DATA = [
  { id: 1, label: '1. Comprendre', targetId: 'hero', desc: 'Contexte & Enjeux MaCarrière' },
  { id: 2, label: '2. Analyser', targetId: 'cockpit', desc: 'Cockpit & Santé du Programme' },
  { id: 3, label: '3. Décider', targetId: 'decision-lab', desc: 'Simulation 3 Arbitrages PMO' },
  { id: 4, label: '4. Candidat', targetId: 'method', desc: 'Pourquoi Bruno Moreau ?' },
];

export const RecruiterTourBar: React.FC<RecruiterTourBarProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSelectStep,
  onClose,
}) => {
  const currentStepData = STEPS_DATA[currentStep - 1] || STEPS_DATA[0];

  return (
    <div
      role="region"
      aria-label="Mode guide recruteur en 60 secondes"
      className="sticky top-16 z-30 bg-[#182844] border-b border-white/10 text-white shadow-lg transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#EABF48] flex items-center gap-1.5 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Guide Recruteur 60s</span>
          </span>
          <span className="text-white/40" aria-hidden="true">·</span>
          <span className="text-white/90 font-medium">
            Étape {currentStep}/{totalSteps} : <span className="text-[#EABF48]">{currentStepData.desc}</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-md border border-white/10">
          {STEPS_DATA.map((step) => {
            const isActive = step.id === currentStep;
            const isDone = step.id < currentStep;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onSelectStep(step.id)}
                className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#EABF48] text-[#111D32] font-semibold shadow-xs'
                    : isDone
                    ? 'text-white/90 hover:bg-white/10'
                    : 'text-white/50 hover:bg-white/10'
                }`}
              >
                {isDone && <CheckCircle2 className="w-3 h-3 text-[#168467]" aria-hidden="true" />}
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={currentStep === 1}
            className="p-1 rounded text-white/70 hover:text-white disabled:opacity-30 disabled:hover:text-white/70 transition-colors"
            aria-label="Étape précédente"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="tabular-numbers text-white/60">
            {currentStep}/{totalSteps}
          </span>

          <button
            type="button"
            onClick={onNext}
            disabled={currentStep === totalSteps}
            className="p-1 rounded text-white/70 hover:text-white disabled:opacity-30 disabled:hover:text-white/70 transition-colors"
            aria-label="Étape suivante"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="w-px h-4 bg-white/20 mx-1" aria-hidden="true" />

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-white/50 hover:text-white transition-colors"
            aria-label="Fermer le guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
