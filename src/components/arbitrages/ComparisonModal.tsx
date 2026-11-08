/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import {
  DecisionId,
  computeProgramState,
  formatEuro,
} from '../../domain/pmoModel';
import { X, Check, ArrowRight } from 'lucide-react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDecision: DecisionId;
  onSelectDecision: (id: DecisionId) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  currentDecision,
  onSelectDecision,
}) => {
  // Fermeture au clavier.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const baseline = computeProgramState('none');
  const optionA = computeProgramState('option-a');
  const optionB = computeProgramState('option-b');
  const optionC = computeProgramState('option-c');

  const options = [
    {
      id: 'none' as DecisionId,
      name: 'Situation Actuelle',
      tag: 'Sans arbitrage',
      state: baseline,
      tradeOff: 'Statut quo : cumul des dérives budgétaires et blocage RGAA sur J4.',
      focus: 'Alerte globale',
    },
    {
      id: 'option-a' as DecisionId,
      name: 'Option A : Accessibilité',
      tag: 'Conformité RGAA',
      state: optionA,
      tradeOff: 'Sécurise J4 et l’inclusion collaborateur, mais surcoût de +25 k€ (+7,1 %).',
      focus: 'Qualité & Calendrier',
    },
    {
      id: 'option-b' as DecisionId,
      name: 'Option B : Décommissionnement',
      tag: 'Économies Récurrentes',
      state: optionB,
      tradeOff: 'Génère 60 k€/an d’économies nettes, mais ne résout pas la dérive RGAA.',
      focus: 'ROI & Optimisation SI',
    },
    {
      id: 'option-c' as DecisionId,
      name: 'Option C : Pilotage Financier',
      tag: 'Discipline Budgétaire',
      state: optionC,
      tradeOff: 'Ramène l’écart à +1,7 %, mais reporte des fonctions et ajoute 1 sem. de décalage.',
      focus: 'Maîtrise des Coûts',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111D32]/80 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-[#CBD5E1] p-6 sm:p-8 my-8 text-[#111D32]">
        
        <div className="flex items-start justify-between pb-4 border-b border-[#E2E8F0] mb-6">
          <div>
            <span className="text-xs font-bold text-[#EABF48] uppercase tracking-wider block">
              Matrice Décisionnelle PMO
            </span>
            <h3 id="modal-title" className="text-xl sm:text-2xl font-extrabold text-[#111D32]">
              Comparatif des Scénarios d'Arbitrage
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Tableau synoptique destiné au Comité de Pilotage (COPIL) pour éclairer le choix des sponsors.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#64748B] hover:text-[#111D32] hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Fermer la modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {options.map((opt) => {
            const isSelected = currentDecision === opt.id;
            return (
              <div
                key={opt.id}
                className={`rounded-xl p-4 border flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'border-[#111D32] bg-[#F8F9FB] shadow-md ring-2 ring-[#111D32]/10'
                    : 'border-[#E2E8F0] bg-white'
                }`}
              >
                <div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#64748B] uppercase">
                      {opt.tag}
                    </span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#111D32] text-white px-1.5 py-0.5 rounded">
                        <Check className="w-2.5 h-2.5" />
                        <span>Actif</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-[#111D32] mb-3 leading-snug">
                    {opt.name}
                  </h4>

                  <div className="space-y-2.5 text-xs pb-4 border-b border-[#E2E8F0]">
                    <div>
                      <span className="text-[11px] text-[#64748B] block">Coût Final (EAC) :</span>
                      <span className="font-bold tabular-numbers text-[#111D32]">
                        {formatEuro(opt.state.estimatedAtCompletion)}
                      </span>
                      <span className="text-[11px] text-[#64748B] ml-1">
                        (+{opt.state.variancePercent} %)
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#64748B] block">Dérive Jalon 4 :</span>
                      <span
                        className={`font-bold tabular-numbers ${
                          opt.state.maxDelayWeeks === 0
                            ? 'text-[#168467]'
                            : opt.state.maxDelayWeeks <= 3
                            ? 'text-[#D98A25]'
                            : 'text-[#C94B4B]'
                        }`}
                      >
                        {opt.state.maxDelayWeeks === 0 ? '0 sem. (Tenu)' : `+${opt.state.maxDelayWeeks} sem.`}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#64748B] block">Risques Critiques :</span>
                      <span
                        className={`font-bold tabular-numbers ${
                          opt.state.criticalRisksCount === 0 ? 'text-[#168467]' : 'text-[#C94B4B]'
                        }`}
                      >
                        {opt.state.criticalRisksCount} critique(s)
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#64748B] block">Économies constatées :</span>
                      <span className="font-bold tabular-numbers text-[#168467]">
                        {formatEuro(opt.state.realizedAnnualSavings)} / an
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 text-[11px] text-[#334155] leading-relaxed mb-4">
                    <strong>Arbitrage :</strong> {opt.tradeOff}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectDecision(opt.id);
                    onClose();
                  }}
                  className={`w-full py-2 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#111D32] text-white'
                      : 'bg-white hover:bg-slate-100 text-[#111D32] border border-[#CBD5E1]'
                  }`}
                >
                  <span>{isSelected ? 'Scénario en cours' : 'Appliquer ce scénario'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
          <span>
            Hypothèses documentées et déterministes. Aucune décision ne résout miraculeusement tous les compromis.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#111D32] hover:bg-[#182844] text-white font-medium rounded-md transition-colors"
          >
            Fermer le comparatif
          </button>
        </div>
      </div>
    </div>
  );
};
