/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  DecisionId,
  ProgramState,
  WhatIfParams,
  formatEuro,
} from '../../domain/pmoModel';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  SlidersHorizontal,
  Check,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Clock,
  ShieldAlert,
  Server,
  FileText,
  BadgeCheck,
  Sliders,
  Grid3X3,
  Layers,
} from 'lucide-react';
import { WhatIfSimulator } from './WhatIfSimulator';
import { InteractiveRiskMatrix } from '../pilotage/InteractiveRiskMatrix';

interface DecisionLabProps {
  state: ProgramState;
  onSelectDecision: (id: DecisionId) => void;
  onApplyWhatIf: (params: WhatIfParams) => void;
  whatIfParams: WhatIfParams;
  onOpenComparison: () => void;
  onReset: () => void;
}

type DecisionTab = 'scenarios' | 'whatif' | 'matrix';

export const DecisionLab: React.FC<DecisionLabProps> = ({
  state,
  onSelectDecision,
  onApplyWhatIf,
  whatIfParams,
  onOpenComparison,
  onReset,
}) => {
  const currentDecision = state.decisionId;
  const [activeTab, setActiveTab] = useState<DecisionTab>('scenarios');

  return (
    <section
      id="decision-lab"
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] mb-1">
            <span>SECTION 3 / DÉCIDER</span>
            <span aria-hidden="true">·</span>
            <span>SIMULATION INTERACTIVE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111D32] tracking-tight">
            Vous êtes aux commandes. Quelle décision prenez-vous ?
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] mt-1 max-w-3xl">
            Lors d'un comité de pilotage, trois sujets nécessitent un arbitrage : l'accessibilité de la nouvelle interface, le retrait des anciennes applications et le suivi budgétaire.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenComparison}
            className="px-3.5 py-2 text-xs font-semibold text-[#111D32] bg-white hover:bg-[#F8F9FB] border border-[#CBD5E1] rounded-md transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#111D32]" aria-hidden="true" />
            <span>Comparer les décisions</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="px-3 py-2 text-xs font-medium text-[#64748B] hover:text-[#111D32] hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
            title="Réinitialiser à la situation de base sans arbitrage"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Réinitialiser</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-[#E2E8F0]/70 rounded-xl mb-6 max-w-fit border border-[#CBD5E1]/60">
        <button
          type="button"
          onClick={() => setActiveTab('scenarios')}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'scenarios'
              ? 'bg-[#111D32] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#111D32] hover:bg-white/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>3 Décisions Stratégiques (A / B / C)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('whatif')}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'whatif'
              ? 'bg-[#111D32] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#111D32] hover:bg-white/50'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-[#EABF48]" />
          <span>Simulateur Libre What-If (Curseurs)</span>
          {currentDecision === 'custom-whatif' && (
            <span className="w-2 h-2 rounded-full bg-[#EABF48]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('matrix')}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'matrix'
              ? 'bg-[#111D32] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#111D32] hover:bg-white/50'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-[#D98A25]" />
          <span>Matrice des Risques 5x5</span>
        </button>
      </div>

      {activeTab === 'scenarios' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
            
            <div
              role="button"
              tabIndex={0}
              onClick={() => onSelectDecision('option-a')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectDecision('option-a')}
              className={`cursor-pointer rounded-xl p-6 transition-all border text-left flex flex-col justify-between ${
                currentDecision === 'option-a'
                  ? 'bg-[#111D32] text-white border-[#EABF48] shadow-lg ring-2 ring-[#EABF48]/30'
                  : 'bg-white hover:border-[#111D32]/40 text-[#111D32] border-[#E2E8F0] shadow-xs'
              }`}
              aria-pressed={currentDecision === 'option-a'}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      currentDecision === 'option-a' ? 'text-[#EABF48]' : 'text-[#64748B]'
                    }`}
                  >
                    Option A · Conformité RGAA
                  </span>
                  {currentDecision === 'option-a' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#EABF48] text-[#111D32] px-2 py-0.5 rounded">
                      <Check className="w-3 h-3" aria-hidden="true" />
                      <span>Sélectionné</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#64748B]">Cliquez pour tester</span>
                  )}
                </div>

                <h3
                  className={`text-lg font-bold mb-2 ${
                    currentDecision === 'option-a' ? 'text-white' : 'text-[#111D32]'
                  }`}
                >
                  Prioriser l'accessibilité numérique
                </h3>

                <p
                  className={`text-xs mb-4 leading-relaxed ${
                    currentDecision === 'option-a' ? 'text-white/80' : 'text-[#64748B]'
                  }`}
                >
                  Mobiliser 2 experts dédiés pour lever les 24 non-conformités bloquantes avant la mise en production.
                </p>

                <div
                  className={`space-y-2 py-3 px-3 rounded-lg text-xs mb-4 ${
                    currentDecision === 'option-a'
                      ? 'bg-white/10 text-white/90'
                      : 'bg-[#F8F9FB] border border-[#E2E8F0] text-[#334155]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Impact Coût :</span>
                    <span className="font-bold tabular-numbers text-[#C94B4B] dark:text-[#ff8f8f]">
                      +25 000 € (EAC 1 285 k€)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Impact Calendrier :</span>
                    <span className="font-bold tabular-numbers text-[#168467]">
                      Dérive J4 ramenée à 0 sem.
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Risque R-01 (RGAA) :</span>
                    <span className="font-bold text-[#168467]">
                      Neutralisé (Maîtrisé)
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`pt-3 border-t text-xs font-semibold flex items-center justify-between ${
                  currentDecision === 'option-a'
                    ? 'border-white/15 text-[#EABF48]'
                    : 'border-[#F1F5F9] text-[#111D32]'
                }`}
              >
                <span>
                  {currentDecision === 'option-a'
                    ? 'Option simulée en cours'
                    : 'Sélectionner l’Option A'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => onSelectDecision('option-b')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectDecision('option-b')}
              className={`cursor-pointer rounded-xl p-6 transition-all border text-left flex flex-col justify-between ${
                currentDecision === 'option-b'
                  ? 'bg-[#111D32] text-white border-[#EABF48] shadow-lg ring-2 ring-[#EABF48]/30'
                  : 'bg-white hover:border-[#111D32]/40 text-[#111D32] border-[#E2E8F0] shadow-xs'
              }`}
              aria-pressed={currentDecision === 'option-b'}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      currentDecision === 'option-b' ? 'text-[#EABF48]' : 'text-[#64748B]'
                    }`}
                  >
                    Option B · Optimisation Legacy
                  </span>
                  {currentDecision === 'option-b' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#EABF48] text-[#111D32] px-2 py-0.5 rounded">
                      <Check className="w-3 h-3" aria-hidden="true" />
                      <span>Sélectionné</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#64748B]">Cliquez pour tester</span>
                  )}
                </div>

                <h3
                  className={`text-lg font-bold mb-2 ${
                    currentDecision === 'option-b' ? 'text-white' : 'text-[#111D32]'
                  }`}
                >
                  Accélérer le décommissionnement
                </h3>

                <p
                  className={`text-xs mb-4 leading-relaxed ${
                    currentDecision === 'option-b' ? 'text-white/80' : 'text-[#64748B]'
                  }`}
                >
                  Couper immédiatement l'application Bilan Pro Legacy pour débloquer 60 000 €/an d'économies récurrentes nettes.
                </p>

                <div
                  className={`space-y-2 py-3 px-3 rounded-lg text-xs mb-4 ${
                    currentDecision === 'option-b'
                      ? 'bg-white/10 text-white/90'
                      : 'bg-[#F8F9FB] border border-[#E2E8F0] text-[#334155]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Économie récurrente :</span>
                    <span className="font-bold tabular-numbers text-[#168467]">
                      +60 000 € / an (105 k€ total)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Coût ponctuel bascule :</span>
                    <span className="font-bold tabular-numbers text-[#D98A25]">
                      +15 000 € (amorti en 3 mois)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Impact Calendrier :</span>
                    <span className="font-semibold tabular-numbers text-[#D98A25]">
                      J4 reste à +3 sem. (RGAA)
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`pt-3 border-t text-xs font-semibold flex items-center justify-between ${
                  currentDecision === 'option-b'
                    ? 'border-white/15 text-[#EABF48]'
                    : 'border-[#F1F5F9] text-[#111D32]'
                }`}
              >
                <span>
                  {currentDecision === 'option-b'
                    ? 'Option simulée en cours'
                    : 'Sélectionner l’Option B'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => onSelectDecision('option-c')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectDecision('option-c')}
              className={`cursor-pointer rounded-xl p-6 transition-all border text-left flex flex-col justify-between ${
                currentDecision === 'option-c'
                  ? 'bg-[#111D32] text-white border-[#EABF48] shadow-lg ring-2 ring-[#EABF48]/30'
                  : 'bg-white hover:border-[#111D32]/40 text-[#111D32] border-[#E2E8F0] shadow-xs'
              }`}
              aria-pressed={currentDecision === 'option-c'}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      currentDecision === 'option-c' ? 'text-[#EABF48]' : 'text-[#64748B]'
                    }`}
                  >
                    Option C · Rigueur Budgétaire
                  </span>
                  {currentDecision === 'option-c' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#EABF48] text-[#111D32] px-2 py-0.5 rounded">
                      <Check className="w-3 h-3" aria-hidden="true" />
                      <span>Sélectionné</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#64748B]">Cliquez pour tester</span>
                  )}
                </div>

                <h3
                  className={`text-lg font-bold mb-2 ${
                    currentDecision === 'option-c' ? 'text-white' : 'text-[#111D32]'
                  }`}
                >
                  Renforcer le pilotage financier
                </h3>

                <p
                  className={`text-xs mb-4 leading-relaxed ${
                    currentDecision === 'option-c' ? 'text-white/80' : 'text-[#64748B]'
                  }`}
                >
                  Geler les demandes hors périmètre et renégocier les forfaits prestataires pour résorber l'écart budgétaire.
                </p>

                <div
                  className={`space-y-2 py-3 px-3 rounded-lg text-xs mb-4 ${
                    currentDecision === 'option-c'
                      ? 'bg-white/10 text-white/90'
                      : 'bg-[#F8F9FB] border border-[#E2E8F0] text-[#334155]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Économie sur EAC :</span>
                    <span className="font-bold tabular-numbers text-[#168467]">
                      -40 000 € (EAC 1 220 k€)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Écart prévisionnel :</span>
                    <span className="font-bold tabular-numbers text-[#168467]">
                      +1,7 % (Sous le seuil 3%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Compromis Calendrier :</span>
                    <span className="font-bold tabular-numbers text-[#C94B4B]">
                      +1 sem. négociation (J4 à +4 sem.)
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`pt-3 border-t text-xs font-semibold flex items-center justify-between ${
                  currentDecision === 'option-c'
                    ? 'border-white/15 text-[#EABF48]'
                    : 'border-[#F1F5F9] text-[#111D32]'
                }`}
              >
                <span>
                  {currentDecision === 'option-c'
                    ? 'Option simulée en cours'
                    : 'Sélectionner l’Option C'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'whatif' && (
        <WhatIfSimulator
          initialParams={whatIfParams}
          onApplyWhatIf={onApplyWhatIf}
          onResetToBaseline={onReset}
          isCustomActive={currentDecision === 'custom-whatif'}
        />
      )}

      {activeTab === 'matrix' && (
        <div className="mb-8">
          <InteractiveRiskMatrix risks={state.risks} />
        </div>
      )}

      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F1F5F9] mb-6">
          <div className="flex items-center gap-2.5">
            <BadgeCheck className="w-5 h-5 text-[#EABF48]" aria-hidden="true" />
            <h3 className="text-base font-bold text-[#111D32]">
              Analyse d'Impact & Trade-offs PMO · {state.decisionName}
            </h3>
          </div>
          <span className="text-xs text-[#64748B]">
            Modèle de calcul déterministe transparent
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-3 bg-[#F8F9FB] rounded-lg border border-[#E2E8F0]">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase block">
              Coût Final Estimé (EAC)
            </span>
            <div className="text-lg font-black text-[#111D32] tabular-numbers mt-1">
              {formatEuro(state.estimatedAtCompletion)}
            </div>
            <div className="text-[11px] text-[#64748B] mt-0.5">
              Écart : +{state.variancePercent} % ({formatEuro(state.varianceAmount)})
            </div>
          </div>

          <div className="p-3 bg-[#F8F9FB] rounded-lg border border-[#E2E8F0]">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase block">
              Dérive Calendaire J4
            </span>
            <div
              className={`text-lg font-black tabular-numbers mt-1 ${
                state.maxDelayWeeks === 0
                  ? 'text-[#168467]'
                  : state.maxDelayWeeks <= 3
                  ? 'text-[#D98A25]'
                  : 'text-[#C94B4B]'
              }`}
            >
              {state.maxDelayWeeks === 0 ? '0 semaine' : `+${state.maxDelayWeeks} semaines`}
            </div>
            <div className="text-[11px] text-[#64748B] mt-0.5">
              {state.maxDelayWeeks === 0 ? 'Conforme à la cible' : 'Sur chemin critique'}
            </div>
          </div>

          <div className="p-3 bg-[#F8F9FB] rounded-lg border border-[#E2E8F0]">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase block">
              Risques Critiques
            </span>
            <div
              className={`text-lg font-black tabular-numbers mt-1 ${
                state.criticalRisksCount === 0 ? 'text-[#168467]' : 'text-[#C94B4B]'
              }`}
            >
              {state.criticalRisksCount} actif{state.criticalRisksCount > 1 ? 's' : ''}
            </div>
            <div className="text-[11px] text-[#64748B] mt-0.5">
              {state.criticalRisksCount === 0 ? 'Aucun point bloquant' : 'RGAA en alerte'}
            </div>
          </div>

          <div className="p-3 bg-[#F8F9FB] rounded-lg border border-[#E2E8F0]">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase block">
              Économies Décomm.
            </span>
            <div className="text-lg font-black text-[#168467] tabular-numbers mt-1">
              {formatEuro(state.realizedAnnualSavings)} / an
            </div>
            <div className="text-[11px] text-[#64748B] mt-0.5">
              Constatées sur {state.decommissionedCount} app(s)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          <div className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-lg p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#111D32] uppercase tracking-wider mb-2.5">
              <FileText className="w-4 h-4 text-[#111D32]" aria-hidden="true" />
              <span>Hypothèses documentées du scénario</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#334155]">
              {state.hypotheses.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#EABF48] font-bold shrink-0">·</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#92400E] uppercase tracking-wider mb-2.5">
              <AlertCircle className="w-4 h-4 text-[#D98A25]" aria-hidden="true" />
              <span>Risques résiduels & Vigilances PMO</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#78350F]">
              {state.residualRisks.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#D98A25] font-bold shrink-0">!</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-[#111D32] text-white">
          <div className="flex items-center gap-2 text-xs font-bold text-[#EABF48] uppercase tracking-wider mb-1.5">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Positionnement & Conseil du PMO</span>
          </div>
          <p className="text-sm text-white/90 leading-relaxed">
            {state.copilSlide.recommendation}
          </p>
        </div>
      </div>
    </section>
  );
};
