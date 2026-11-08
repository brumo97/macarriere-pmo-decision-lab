/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ProgramState,
  Milestone,
  RiskItem,
  LegacyApp,
  formatEuro,
} from '../../domain/pmoModel';
import {
  X,
  DollarSign,
  Calendar,
  ShieldAlert,
  Server,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  UserCheck,
  FileText,
  BadgeAlert,
} from 'lucide-react';
import { InteractiveRiskMatrix } from './InteractiveRiskMatrix';

export type KpiTabId = 'budget' | 'schedule' | 'risks' | 'decommissioning';

interface InteractiveKpiModalProps {
  isOpen: boolean;
  initialTab?: KpiTabId;
  state: ProgramState;
  onClose: () => void;
  onSelectDecision?: (decisionId: any) => void;
}

export const InteractiveKpiModal: React.FC<InteractiveKpiModalProps> = ({
  isOpen,
  initialTab = 'budget',
  state,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<KpiTabId>(initialTab);
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('m4');

  // Le volet demandé depuis le cockpit devient actif à chaque ouverture.
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Fermeture au clavier pour faciliter la navigation.
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Répartition budgétaire construite pour cette étude de cas fictive.
  const workstreams = [
    {
      name: 'Chantier 1 : Portail Collaborateur & Accessibilité RGAA',
      initial: 380000,
      actual: 260000,
      eac: state.decisionId === 'option-a' ? 405000 : 380000,
      lead: 'Lead Dev Front / UX',
      status: state.maxDelayWeeks === 0 ? 'Conforme' : 'Tension accessibilité',
    },
    {
      name: 'Chantier 2 : Connecteurs SIRH & Intégration Flux',
      initial: 420000,
      actual: 290000,
      eac: state.decisionId === 'option-c' ? 400000 : 435000,
      lead: 'Architecte SI & Équipe Data',
      status: 'En cours de recette',
    },
    {
      name: 'Chantier 3 : Conduite du Changement & Formations RH',
      initial: 180000,
      actual: 110000,
      eac: 180000,
      lead: 'Responsable Conduite du Changement',
      status: 'Prêt pour déploiement',
    },
    {
      name: 'Chantier 4 : Décommissionnement & Trajectoire Run',
      initial: 120000,
      actual: 80000,
      eac: state.decisionId === 'option-b' ? 135000 : 120000,
      lead: 'Responsable Legacy SI & Achats',
      status: state.decommissionedCount >= 2 ? 'Accéléré' : 'En analyse',
    },
    {
      name: 'Provision Aléas & Réserve de Contingence PMO',
      initial: 100000,
      actual: 0,
      eac: Math.max(0, 100000 - (state.estimatedAtCompletion - 1200000)),
      lead: 'Direction Financière & PMO',
      status: state.estimatedAtCompletion > 1200000 ? 'Consommée partiellement' : 'Préservée',
    },
  ];

  const selectedMilestone = state.milestones.find((m) => m.id === selectedMilestoneId) || state.milestones[3];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kpi-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[92vh]">
        
        <div className="bg-[#111D32] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EABF48]" />
            <div>
              <h3 id="kpi-modal-title" className="text-base sm:text-lg font-bold text-white">
                Cockpit Détaillé PMO · Exploration des Indicateurs
              </h3>
              <p className="text-xs text-white/70">
                Programme MaCarrière — Analyse approfondie pour comité de pilotage
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fermer la fenêtre d'exploration"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-[#E2E8F0] bg-[#F8F9FB] px-4 sm:px-6 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('budget')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'budget'
                ? 'border-[#111D32] text-[#111D32]'
                : 'border-transparent text-[#64748B] hover:text-[#111D32]'
            }`}
          >
            <DollarSign className="w-4 h-4 text-[#EABF48]" />
            <span>Budget & Chantiers</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white border border-[#CBD5E1] tabular-numbers font-mono">
              +{state.variancePercent}%
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('schedule')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'schedule'
                ? 'border-[#111D32] text-[#111D32]'
                : 'border-transparent text-[#64748B] hover:text-[#111D32]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#168467]" />
            <span>Jalons & RACI</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded tabular-numbers font-mono ${
                state.maxDelayWeeks === 0
                  ? 'bg-[#168467]/15 text-[#168467]'
                  : 'bg-[#D98A25]/15 text-[#D98A25]'
              }`}
            >
              {state.maxDelayWeeks === 0 ? 'Conforme' : `+${state.maxDelayWeeks} sem.`}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('risks')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'risks'
                ? 'border-[#111D32] text-[#111D32]'
                : 'border-transparent text-[#64748B] hover:text-[#111D32]'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-[#C94B4B]" />
            <span>Matrice Risques 5x5</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded tabular-numbers font-mono ${
                state.criticalRisksCount === 0
                  ? 'bg-[#168467]/15 text-[#168467]'
                  : 'bg-[#C94B4B]/15 text-[#C94B4B]'
              }`}
            >
              {state.criticalRisksCount} critique
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('decommissioning')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'decommissioning'
                ? 'border-[#111D32] text-[#111D32]'
                : 'border-transparent text-[#64748B] hover:text-[#111D32]'
            }`}
          >
            <Server className="w-4 h-4 text-[#111D32]" />
            <span>Décommissionnement Legacy</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#168467]/15 text-[#168467] tabular-numbers font-mono">
              {formatEuro(state.realizedAnnualSavings)}/an
            </span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {activeTab === 'budget' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#F8F9FB] border border-[#E2E8F0]">
                  <span className="text-xs text-[#64748B] block">Budget Approuvé</span>
                  <span className="text-xl font-black text-[#111D32] mt-1 block tabular-numbers">
                    {formatEuro(state.initialBudget)}
                  </span>
                  <span className="text-[11px] text-[#64748B]">Enveloppe initiale COPIL</span>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F9FB] border border-[#E2E8F0]">
                  <span className="text-xs text-[#64748B] block">Dépense Réalisée (Actuals)</span>
                  <span className="text-xl font-black text-[#168467] mt-1 block tabular-numbers">
                    {formatEuro(state.actualSpend)}
                  </span>
                  <span className="text-[11px] text-[#168467] font-semibold">
                    61,7 % consommé
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F9FB] border border-[#E2E8F0]">
                  <span className="text-xs text-[#64748B] block">Coût Final Estimé (EAC)</span>
                  <span className="text-xl font-black text-[#111D32] mt-1 block tabular-numbers">
                    {formatEuro(state.estimatedAtCompletion)}
                  </span>
                  <span className="text-[11px] text-[#D98A25] font-semibold">
                    Écart : +{state.variancePercent} %
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F9FB] border border-[#E2E8F0]">
                  <span className="text-xs text-[#64748B] block">Écart Prévisionnel (VAC)</span>
                  <span
                    className={`text-xl font-black mt-1 block tabular-numbers ${
                      state.varianceAmount > 30000 ? 'text-[#C94B4B]' : 'text-[#D98A25]'
                    }`}
                  >
                    +{formatEuro(state.varianceAmount)}
                  </span>
                  <span className="text-[11px] text-[#64748B]">À arbitrer en comité</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
                <div className="px-4 py-3 bg-[#F8F9FB] border-b border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#111D32] uppercase tracking-wider">
                    Décomposition du Budget par Chantier Opérationnel
                  </span>
                  <span className="text-xs text-[#64748B]">
                    Scénario actif : <strong>{state.decisionName}</strong>
                  </span>
                </div>

                <div className="divide-y divide-[#F1F5F9] text-xs">
                  {workstreams.map((ws, i) => {
                    const wsVariance = ws.eac - ws.initial;
                    return (
                      <div
                        key={i}
                        className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-[#F8F9FB]/60 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-[#111D32] text-sm block">
                            {ws.name}
                          </span>
                          <span className="text-[#64748B] text-[11px]">
                            Responsable : {ws.lead} · Statut : <strong>{ws.status}</strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-6 shrink-0 text-right">
                          <div>
                            <span className="text-[#64748B] block text-[10px]">Initial</span>
                            <span className="font-mono tabular-numbers text-[#111D32]">
                              {formatEuro(ws.initial)}
                            </span>
                          </div>

                          <div>
                            <span className="text-[#64748B] block text-[10px]">Réalisé</span>
                            <span className="font-mono tabular-numbers text-[#168467]">
                              {formatEuro(ws.actual)}
                            </span>
                          </div>

                          <div>
                            <span className="text-[#64748B] block text-[10px]">Coût Final EAC</span>
                            <span className="font-mono font-bold tabular-numbers text-[#111D32]">
                              {formatEuro(ws.eac)}
                            </span>
                          </div>

                          <div className="w-20">
                            <span className="text-[#64748B] block text-[10px]">Écart</span>
                            <span
                              className={`font-mono font-bold tabular-numbers ${
                                wsVariance > 0
                                  ? 'text-[#C94B4B]'
                                  : wsVariance < 0
                                  ? 'text-[#168467]'
                                  : 'text-[#64748B]'
                              }`}
                            >
                              {wsVariance > 0 ? `+${formatEuro(wsVariance)}` : wsVariance < 0 ? formatEuro(wsVariance) : '0 €'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 bg-[#F8F9FB] rounded-xl border border-[#CBD5E1] text-xs text-[#334155] leading-relaxed">
                <strong className="text-[#111D32] block mb-1">
                  Recommandation méthodologique du PMO :
                </strong>
                L'écart prévisionnel de +{state.variancePercent}% ({formatEuro(state.varianceAmount)}) est concentré sur les chantiers critiques. Le PMO préconise un suivi bimensuel des engagements et une réallocation de la réserve pour préserver l'équilibre sans dégrader les délais.
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <div className="lg:col-span-5 space-y-2">
                  <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-2">
                    Trajectoire des Jalons Clés (Cliquez pour inspecter)
                  </span>
                  {state.milestones.map((m) => {
                    const isSelected = selectedMilestone.id === m.id;
                    return (
                      <div
                        key={m.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedMilestoneId(m.id)}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedMilestoneId(m.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'bg-[#111D32] text-white border-[#EABF48] shadow-md ring-2 ring-[#EABF48]/30'
                            : 'bg-white hover:bg-[#F8F9FB] text-[#111D32] border-[#E2E8F0]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold ${
                                isSelected
                                  ? 'bg-[#EABF48] text-[#111D32]'
                                  : 'bg-[#F1F5F9] text-[#111D32]'
                              }`}
                            >
                              {m.code}
                            </span>
                            <span className="font-bold text-xs">{m.name}</span>
                          </div>

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              m.status === 'COMPLETED'
                                ? 'bg-[#168467]/20 text-[#168467]'
                                : m.status === 'AT_RISK'
                                ? 'bg-[#C94B4B]/20 text-[#C94B4B]'
                                : 'bg-[#64748B]/20 text-[#64748B]'
                            }`}
                          >
                            {m.status === 'COMPLETED' ? 'Réalisé' : m.status === 'AT_RISK' ? 'À risque' : 'À venir'}
                          </span>
                        </div>

                        <div
                          className={`mt-2 flex items-center justify-between text-[11px] ${
                            isSelected ? 'text-white/70' : 'text-[#64748B]'
                          }`}
                        >
                          <span>Échéance : <strong>{m.targetDate}</strong></span>
                          <span>
                            {m.delayWeeks === 0 ? 'Aucun retard' : `Dérive : +${m.delayWeeks} sem.`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="lg:col-span-7 bg-[#F8F9FB] rounded-xl border border-[#E2E8F0] p-5 space-y-4">
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#EABF48] bg-[#111D32] px-2 py-0.5 rounded">
                        Fiche Jalon · {selectedMilestone.code}
                      </span>
                      <h4 className="text-base font-bold text-[#111D32] mt-1.5">
                        {selectedMilestone.name}
                      </h4>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        Échéance contractuelle : <strong>{selectedMilestone.targetDate}</strong> · Chemin critique :{' '}
                        <strong>{selectedMilestone.criticalPath ? 'OUI' : 'NON'}</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-md inline-block ${
                          selectedMilestone.delayWeeks === 0
                            ? 'bg-[#168467]/15 text-[#168467]'
                            : 'bg-[#C94B4B]/15 text-[#C94B4B]'
                        }`}
                      >
                        {selectedMilestone.delayWeeks === 0
                          ? 'Délai Sécurisé'
                          : `+${selectedMilestone.delayWeeks} sem. sur chemin critique`}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-[#E2E8F0] text-xs text-[#334155]">
                    <strong className="text-[#111D32] block mb-0.5">Constat PMO :</strong>
                    {selectedMilestone.comment}
                  </div>

                  {selectedMilestone.deliverables && (
                    <div>
                      <span className="text-xs font-bold text-[#111D32] uppercase tracking-wider block mb-2">
                        Livrables attendus & Validation
                      </span>
                      <div className="space-y-1.5">
                        {selectedMilestone.deliverables.map((deliv, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-2 bg-white rounded border border-[#E2E8F0] text-xs text-[#334155]"
                          >
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 ${
                                selectedMilestone.status === 'COMPLETED'
                                  ? 'text-[#168467]'
                                  : 'text-[#D98A25]'
                              }`}
                            />
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMilestone.raci && (
                    <div>
                      <span className="text-xs font-bold text-[#111D32] uppercase tracking-wider block mb-2">
                        Matrice RACI du Jalon
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="p-2.5 rounded bg-white border border-[#E2E8F0]">
                          <span className="font-black text-[#111D32] block text-[11px] text-blue-600">
                            [R] Réalise
                          </span>
                          <span className="text-[#334155] font-medium block mt-1 text-[11px]">
                            {selectedMilestone.raci.r}
                          </span>
                        </div>

                        <div className="p-2.5 rounded bg-white border border-[#E2E8F0]">
                          <span className="font-black text-[#111D32] block text-[11px] text-emerald-600">
                            [A] Approuve
                          </span>
                          <span className="text-[#334155] font-medium block mt-1 text-[11px]">
                            {selectedMilestone.raci.a}
                          </span>
                        </div>

                        <div className="p-2.5 rounded bg-white border border-[#E2E8F0]">
                          <span className="font-black text-[#111D32] block text-[11px] text-amber-600">
                            [C] Consulté
                          </span>
                          <span className="text-[#334155] font-medium block mt-1 text-[11px]">
                            {selectedMilestone.raci.c}
                          </span>
                        </div>

                        <div className="p-2.5 rounded bg-white border border-[#E2E8F0]">
                          <span className="font-black text-[#111D32] block text-[11px] text-slate-600">
                            [I] Informé
                          </span>
                          <span className="text-[#334155] font-medium block mt-1 text-[11px]">
                            {selectedMilestone.raci.i}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'risks' && (
            <div className="space-y-4">
              <InteractiveRiskMatrix risks={state.risks} />
            </div>
          )}

          {activeTab === 'decommissioning' && (
            <div className="space-y-6">
              
              <div className="bg-[#111D32] text-white p-5 rounded-xl border border-[#EABF48]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#EABF48] font-bold block mb-1">
                    Bilan Financier Décommissionnement
                  </span>
                  <div className="text-2xl font-black text-white tabular-numbers">
                    {formatEuro(state.realizedAnnualSavings)} / an
                  </div>
                  <span className="text-xs text-white/70">
                    Économies récurrentes nettes constatées sur le portefeuille applicatif
                  </span>
                </div>

                <div className="text-right text-xs bg-white/10 p-3 rounded-lg border border-white/10 shrink-0">
                  <span className="text-white/70 block">Gisement résiduel potentiel :</span>
                  <span className="text-base font-bold text-[#EABF48] tabular-numbers">
                    +{formatEuro(state.pendingAnnualSavings)} / an
                  </span>
                  <span className="text-[10px] text-white/50 block mt-0.5">
                    Sur 2 applications en cours d'analyse
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.legacyApps.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#111D32]/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-[#64748B]">
                          {app.code}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            app.status === 'RETIREE'
                              ? 'bg-[#168467]/15 text-[#168467]'
                              : app.status === 'PRETE'
                              ? 'bg-[#D98A25]/15 text-[#D98A25]'
                              : 'bg-[#64748B]/15 text-[#64748B]'
                          }`}
                        >
                          {app.status === 'RETIREE'
                            ? 'Retirée · Économies Actées'
                            : app.status === 'PRETE'
                            ? 'Prête au retrait'
                            : 'En cours d’analyse'}
                        </span>
                      </div>

                      <h5 className="text-sm font-bold text-[#111D32]">{app.name}</h5>
                      <p className="text-xs text-[#64748B] mt-1">{app.role}</p>

                      <div className="mt-3 p-2.5 bg-[#F8F9FB] rounded-lg border border-[#E2E8F0] text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#64748B]">Coût récurrent annuel :</span>
                          <span className="font-bold tabular-numbers text-[#111D32]">
                            {formatEuro(app.annualRunCost)} / an
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1 text-[11px]">
                          <span className="text-[#64748B]">Statut économie :</span>
                          <span
                            className={`font-semibold ${
                              app.savingsRealized ? 'text-[#168467]' : 'text-[#D98A25]'
                            }`}
                          >
                            {app.savingsRealized ? 'Simulée & Réalisée' : 'Potentielle'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
                      <strong>Dépendances :</strong> {app.dependencies}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-[#F8F9FB] border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 text-xs">
          <span className="text-[#64748B]">
            Astuce : Testez différents scénarios dans la section suivante pour observer la sensibilité de ces métriques.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#111D32] hover:bg-[#182844] text-white font-bold rounded-lg transition-colors"
          >
            Fermer l'exploration
          </button>
        </div>
      </div>
    </div>
  );
};
