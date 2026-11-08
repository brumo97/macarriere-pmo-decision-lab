/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RiskItem } from '../../domain/pmoModel';
import { ShieldAlert, AlertTriangle, CheckCircle, Info, User, HelpCircle } from 'lucide-react';

interface InteractiveRiskMatrixProps {
  risks: RiskItem[];
  selectedRiskId?: string;
  onSelectRisk?: (risk: RiskItem) => void;
}

export const InteractiveRiskMatrix: React.FC<InteractiveRiskMatrixProps> = ({
  risks,
  selectedRiskId,
  onSelectRisk,
}) => {
  const [activeRisk, setActiveRisk] = useState<RiskItem | null>(() => {
    return risks.find((r) => r.id === selectedRiskId) || risks[0] || null;
  });

  const handleRiskClick = (risk: RiskItem) => {
    setActiveRisk(risk);
    if (onSelectRisk) onSelectRisk(risk);
  };

  // La couleur dépend du niveau de probabilité et d’impact.
  const getCellBackground = (prob: number, impact: number) => {
    const score = prob * impact;
    if (score >= 15) return 'bg-[#C94B4B]/15 border-[#C94B4B]/30 hover:bg-[#C94B4B]/25'; // Red zone
    if (score >= 8) return 'bg-[#D98A25]/15 border-[#D98A25]/30 hover:bg-[#D98A25]/25'; // Amber zone
    return 'bg-[#168467]/10 border-[#168467]/25 hover:bg-[#168467]/20'; // Green zone
  };

  const PROB_LABELS = ['Très faible (1)', 'Faible (2)', 'Moyenne (3)', 'Forte (4)', 'Très forte (5)'];
  const IMPACT_LABELS = ['Mineur (1)', 'Modéré (2)', 'Significatif (3)', 'Majeur (4)', 'Critique (5)'];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F1F5F9] mb-4">
        <div>
          <h4 className="text-xs font-bold text-[#111D32] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-[#D98A25]" aria-hidden="true" />
            <span>Matrice des Risques 5x5 (Probabilité × Gravité)</span>
          </h4>
          <p className="text-xs text-[#64748B] mt-0.5">
            Cliquez sur un marqueur de risque pour afficher sa fiche d'action et son porteur PMO.
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-[#64748B]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#168467]/30 border border-[#168467]" />
            <span>Tolérable</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#D98A25]/30 border border-[#D98A25]" />
            <span>Vigilance</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#C94B4B]/30 border border-[#C94B4B]" />
            <span>Inacceptable</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <div className="lg:col-span-7">
          <div className="flex">
            
            <div className="flex items-center justify-center -rotate-90 text-[11px] font-bold text-[#64748B] uppercase tracking-wider w-6">
              Probabilité
            </div>

            <div className="flex-1">
              
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((prob) => (
                  <div key={prob} className="flex items-center gap-1">
                    <span className="text-[10px] text-[#64748B] font-mono w-4 text-right shrink-0">
                      {prob}
                    </span>
                    <div className="grid grid-cols-5 gap-1 flex-1">
                      {[1, 2, 3, 4, 5].map((impact) => {
                        // Identifier les risques associés à cette combinaison.
                        const cellRisks = risks.filter(
                          (r) => r.probabilityScore === prob && r.impactScore === impact
                        );

                        return (
                          <div
                            key={impact}
                            className={`h-11 rounded border flex items-center justify-center relative transition-colors ${getCellBackground(
                              prob,
                              impact
                            )}`}
                          >
                            {cellRisks.map((risk) => {
                              const isSelected = activeRisk?.id === risk.id;
                              return (
                                <button
                                  key={risk.id}
                                  type="button"
                                  onClick={() => handleRiskClick(risk)}
                                  className={`px-1.5 py-0.5 rounded text-[11px] font-black transition-transform cursor-pointer shadow-xs ${
                                    risk.severity === 'CRITIQUE'
                                      ? 'bg-[#C94B4B] text-white hover:scale-110'
                                      : risk.severity === 'MODERE'
                                      ? 'bg-[#D98A25] text-white hover:scale-110'
                                      : 'bg-[#168467] text-white hover:scale-110'
                                  } ${
                                    isSelected
                                      ? 'ring-2 ring-[#111D32] ring-offset-1 scale-105'
                                      : ''
                                  }`}
                                  title={`${risk.code}: ${risk.title}`}
                                  aria-label={`Risque ${risk.code} : ${risk.title}`}
                                >
                                  {risk.code}
                                </button>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1 mt-1 pl-5">
                {[1, 2, 3, 4, 5].map((imp) => (
                  <div
                    key={imp}
                    className="flex-1 text-center text-[10px] font-mono text-[#64748B]"
                  >
                    {imp}
                  </div>
                ))}
              </div>
              <div className="text-center text-[11px] font-bold text-[#64748B] uppercase tracking-wider mt-1 pl-5">
                Gravité / Impact
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#F8F9FB] rounded-xl p-4 border border-[#E2E8F0]">
          {activeRisk ? (
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      activeRisk.severity === 'CRITIQUE'
                        ? 'bg-[#C94B4B]/15 text-[#C94B4B]'
                        : activeRisk.severity === 'MODERE'
                        ? 'bg-[#D98A25]/15 text-[#D98A25]'
                        : 'bg-[#168467]/15 text-[#168467]'
                    }`}
                  >
                    {activeRisk.code} · Risque {activeRisk.severity.toLowerCase()}
                  </span>
                  <h5 className="text-sm font-bold text-[#111D32] mt-1">
                    {activeRisk.title}
                  </h5>
                </div>
                <div className="text-right text-[11px] font-mono text-[#64748B] shrink-0">
                  P:{activeRisk.probabilityScore} × I:{activeRisk.impactScore} = {activeRisk.probabilityScore * activeRisk.impactScore}
                </div>
              </div>

              <div className="text-xs text-[#334155] space-y-2">
                <div>
                  <span className="text-[#64748B] font-medium block text-[11px]">Impact opérationnel :</span>
                  <p className="mt-0.5 leading-relaxed">{activeRisk.impactDescription}</p>
                </div>

                <div className="p-2.5 rounded bg-white border border-[#E2E8F0]">
                  <span className="text-[#111D32] font-bold block text-[11px] mb-1">
                    Plan de remédiation & Arbitrage PMO :
                  </span>
                  <p className="text-[#111D32] text-xs leading-relaxed">{activeRisk.mitigation}</p>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#E2E8F0] text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#111D32]" />
                    <span>Porteur : <strong className="text-[#111D32]">{activeRisk.owner}</strong></span>
                  </span>
                  <span>Catégorie : <strong>{activeRisk.category}</strong></span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-[#64748B]">
              Sélectionnez un risque sur la matrice pour afficher sa fiche détaillée.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
