/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WhatIfParams, computeWhatIfState, formatEuro } from '../../domain/pmoModel';
import { Sliders, RotateCcw, Play, Check, AlertTriangle, ArrowRight, DollarSign, Calendar, Server, ShieldCheck } from 'lucide-react';

interface WhatIfSimulatorProps {
  onApplyWhatIf: (params: WhatIfParams) => void;
  onResetToBaseline: () => void;
  isCustomActive: boolean;
  initialParams: WhatIfParams;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  onApplyWhatIf,
  onResetToBaseline,
  isCustomActive,
  initialParams,
}) => {
  const [rgaaBudgetK, setRgaaBudgetK] = useState(initialParams.rgaaBudgetK);
  const [decommissionedCount, setDecommissionedCount] = useState(initialParams.decommissionedCount);
  const [vendorRenegotiationK, setVendorRenegotiationK] = useState(initialParams.vendorRenegotiationK);

  // Le calcul est immédiat : aucun scénario n’est enregistré avant validation.
  const previewState = computeWhatIfState({
    rgaaBudgetK,
    decommissionedCount,
    vendorRenegotiationK,
  });

  const handleApply = () => {
    onApplyWhatIf({
      rgaaBudgetK,
      decommissionedCount,
      vendorRenegotiationK,
    });
  };

  const handleResetSliders = () => {
    setRgaaBudgetK(0);
    setDecommissionedCount(1);
    setVendorRenegotiationK(0);
    onResetToBaseline();
  };

  return (
    <div className="bg-[#111D32] text-white rounded-2xl p-6 sm:p-7 border border-[#EABF48]/40 shadow-xl my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#EABF48] uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4 text-[#EABF48]" aria-hidden="true" />
            <span>Simulateur libre · Analyse d’arbitrage PMO</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Testez vos propres arbitrages en temps réel
          </h3>
          <p className="text-xs sm:text-sm text-white/70 mt-1">
            Ajustez les 3 curseurs clés et observez instantanément la sensibilité du budget, des délais et des économies.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetSliders}
            className="px-3 py-1.5 text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors flex items-center gap-1.5 border border-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser curseurs</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-7 space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white/90 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#EABF48]" />
                <span>1. Budget renfort accessibilité RGAA</span>
              </span>
              <span className="font-bold font-mono text-[#EABF48] text-sm tabular-numbers">
                +{rgaaBudgetK} k€
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              step={5}
              value={rgaaBudgetK}
              onChange={(e) => setRgaaBudgetK(Number(e.target.value))}
              className="w-full accent-[#EABF48] cursor-pointer h-2 bg-white/20 rounded-lg"
              aria-label="Budget renfort accessibilité RGAA"
            />
            <div className="flex justify-between text-[10px] text-white/50">
              <span>0 k€ (Dérive +3 sem.)</span>
              <span>15 k€ (+1 sem.)</span>
              <span>25 k€+ (Dérive 0 sem. / Conforme)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white/90 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#168467]" />
                <span>2. Applications historiques décommissionnées</span>
              </span>
              <span className="font-bold font-mono text-[#168467] text-sm tabular-numbers">
                {decommissionedCount} / 4 applications
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={4}
              step={1}
              value={decommissionedCount}
              onChange={(e) => setDecommissionedCount(Number(e.target.value))}
              className="w-full accent-[#168467] cursor-pointer h-2 bg-white/20 rounded-lg"
              aria-label="Nombre d'applications décommissionnées"
            />
            <div className="flex justify-between text-[10px] text-white/50">
              <span>1 app (45 k€/an)</span>
              <span>2 apps (105 k€/an)</span>
              <span>3 apps (140 k€/an)</span>
              <span>4 apps (160 k€/an)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white/90 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D98A25]" />
                <span>3. Arbitrage & Renégociation forfaits prestataires</span>
              </span>
              <span
                className={`font-bold font-mono text-sm tabular-numbers ${
                  vendorRenegotiationK < 0 ? 'text-[#168467]' : 'text-white'
                }`}
              >
                {vendorRenegotiationK > 0 ? `+${vendorRenegotiationK}` : vendorRenegotiationK} k€
              </span>
            </div>
            <input
              type="range"
              min={-40}
              max={20}
              step={10}
              value={vendorRenegotiationK}
              onChange={(e) => setVendorRenegotiationK(Number(e.target.value))}
              className="w-full accent-[#D98A25] cursor-pointer h-2 bg-white/20 rounded-lg"
              aria-label="Renégociation forfaits prestataires"
            />
            <div className="flex justify-between text-[10px] text-white/50">
              <span>-40 k€ (Forte discipline, +1 sem.)</span>
              <span>0 k€ (Statut quo)</span>
              <span>+20 k€ (Avenants acceptés)</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#EABF48] font-bold">
              Impact Simulée en Direct
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                previewState.globalHealth === 'MAITRISE'
                  ? 'bg-[#168467] text-white'
                  : previewState.globalHealth === 'VIGILANCE'
                  ? 'bg-[#D98A25] text-white'
                  : 'bg-[#C94B4B] text-white'
              }`}
            >
              Santé : {previewState.globalHealth}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-white/60 text-[11px] block">Coût Final EAC :</span>
              <span className="text-base font-bold font-mono text-white tabular-numbers">
                {formatEuro(previewState.estimatedAtCompletion)}
              </span>
              <span className="text-[10px] text-[#EABF48] block mt-0.5">
                Écart : +{previewState.variancePercent} %
              </span>
            </div>

            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-white/60 text-[11px] block">Dérive Jalon 4 :</span>
              <span
                className={`text-base font-bold font-mono tabular-numbers ${
                  previewState.maxDelayWeeks === 0 ? 'text-[#168467]' : 'text-[#D98A25]'
                }`}
              >
                {previewState.maxDelayWeeks === 0 ? '0 semaine' : `+${previewState.maxDelayWeeks} sem.`}
              </span>
              <span className="text-[10px] text-white/60 block mt-0.5">
                {previewState.maxDelayWeeks === 0 ? 'Jalon sécurisé' : 'Chemin critique'}
              </span>
            </div>

            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-white/60 text-[11px] block">Risques critiques :</span>
              <span
                className={`text-base font-bold font-mono tabular-numbers ${
                  previewState.criticalRisksCount === 0 ? 'text-[#168467]' : 'text-[#C94B4B]'
                }`}
              >
                {previewState.criticalRisksCount} actif{previewState.criticalRisksCount > 1 ? 's' : ''}
              </span>
              <span className="text-[10px] text-white/60 block mt-0.5">
                {previewState.criticalRisksCount === 0 ? 'RGAA conforme' : 'RGAA bloquant'}
              </span>
            </div>

            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-white/60 text-[11px] block">Économies décomm. :</span>
              <span className="text-base font-bold font-mono text-[#168467] tabular-numbers">
                {formatEuro(previewState.realizedAnnualSavings)} / an
              </span>
              <span className="text-[10px] text-white/60 block mt-0.5">
                Constatées fermes
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="w-full py-2.5 px-4 bg-[#EABF48] hover:bg-[#deb13c] text-[#111D32] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Appliquer ce scénario personnalisé au cockpit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
