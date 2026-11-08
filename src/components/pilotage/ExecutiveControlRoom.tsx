/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  ShieldAlert,
  Server,
  DollarSign,
  Calendar,
  Layers,
  ChevronRight,
  Info,
  ArrowUp,
  ArrowDown,
  Minus,
  Maximize2,
} from 'lucide-react';
import { ProgramState, formatEuro, MetricTrend } from '../../domain/pmoModel';
import { InteractiveKpiModal, KpiTabId } from './InteractiveKpiModal';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

interface ExecutiveControlRoomProps {
  state: ProgramState;
  onSelectMilestone?: (milestoneCode: string) => void;
  onExploreDecisions: () => void;
}

const MetricTrendBadge: React.FC<{ trend: MetricTrend }> = ({ trend }) => {
  if (trend.type === 'NEUTRAL') {
    return (
      <span
        title={trend.tooltip}
        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded border border-[#E2E8F0] whitespace-nowrap shrink-0"
      >
        <Minus className="w-3 h-3 text-[#94A3B8]" aria-hidden="true" />
        <span>{trend.label}</span>
      </span>
    );
  }

  const isImproved = trend.type === 'IMPROVED';
  const Icon = trend.direction === 'up' ? ArrowUp : ArrowDown;

  return (
    <span
      title={trend.tooltip}
      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded border whitespace-nowrap shrink-0 transition-all ${
        isImproved
          ? 'text-[#168467] bg-[#168467]/10 border-[#168467]/25'
          : 'text-[#C94B4B] bg-[#C94B4B]/10 border-[#C94B4B]/25'
      }`}
    >
      <Icon className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
      <span>{trend.label}</span>
      <span className="text-[9px] uppercase tracking-wider font-semibold opacity-85">
        {isImproved ? 'Gain' : 'Dérive'}
      </span>
    </span>
  );
};

export const ExecutiveControlRoom: React.FC<ExecutiveControlRoomProps> = ({
  state,
  onExploreDecisions,
}) => {
  const [drilldownTab, setDrilldownTab] = useState<KpiTabId | null>(null);

  // Données utilisées pour comparer visuellement les écarts.
  const budgetChartData = [
    {
      category: 'Budget Initial Approuvé',
      montant: state.initialBudget,
      color: '#111D32',
    },
    {
      category: 'Dépense Réalisée (Actuals)',
      montant: state.actualSpend,
      color: '#168467',
    },
    {
      category: 'Coût Final Estimé (EAC)',
      montant: state.estimatedAtCompletion,
      color: state.variancePercent <= 2 ? '#168467' : state.variancePercent <= 6 ? '#D98A25' : '#C94B4B',
    },
  ];

  return (
    <section id="cockpit" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] mb-1">
            <span>SECTION 2 / ANALYSER</span>
            <span aria-hidden="true">·</span>
            <span>COCKPIT GOUVERNANCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111D32] tracking-tight">
            MaCarrière — Executive Program Health
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] mt-1">
            Vue consolidée des échéances, coûts, risques et décommissionnements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="text-[#64748B] block">Scénario actif</span>
            <span className="font-semibold text-[#111D32]">{state.decisionName}</span>
          </div>
          <button
            type="button"
            onClick={onExploreDecisions}
            className="px-3.5 py-2 text-xs font-semibold text-[#111D32] bg-[#EABF48] hover:bg-[#deb13c] rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Simuler un arbitrage</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 mb-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F1F5F9]">
          
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                state.globalHealth === 'MAITRISE'
                  ? 'bg-[#168467]/10 text-[#168467]'
                  : state.globalHealth === 'VIGILANCE'
                  ? 'bg-[#D98A25]/10 text-[#D98A25]'
                  : 'bg-[#C94B4B]/10 text-[#C94B4B]'
              }`}
            >
              {state.globalHealth === 'MAITRISE' ? (
                <CheckCircle className="w-8 h-8" aria-hidden="true" />
              ) : state.globalHealth === 'VIGILANCE' ? (
                <AlertTriangle className="w-8 h-8" aria-hidden="true" />
              ) : (
                <ShieldAlert className="w-8 h-8" aria-hidden="true" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Indicateur Global Synthétique
              </div>
              <div className="text-2xl font-black tracking-tight text-[#111D32] flex items-center gap-2">
                <span>PROGRAM HEALTH :</span>
                <span
                  className={
                    state.globalHealth === 'MAITRISE'
                      ? 'text-[#168467]'
                      : state.globalHealth === 'VIGILANCE'
                      ? 'text-[#D98A25]'
                      : 'text-[#C94B4B]'
                  }
                >
                  {state.globalHealth === 'MAITRISE'
                    ? 'MAÎTRISÉ'
                    : state.globalHealth === 'VIGILANCE'
                    ? 'VIGILANCE'
                    : 'CRITIQUE'}
                </span>
              </div>
              <div className="text-xs text-[#64748B] mt-0.5">
                Statut fondé sur des règles explicites de gouvernance PMO (seuil variance &gt; +3 % ou jalon critique à risque).
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <div className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-lg p-3 text-center">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase block">
                Budget
              </span>
              <span
                className={`text-xs font-bold block mt-1 ${
                  state.budgetStatus === 'MAITRISE'
                    ? 'text-[#168467]'
                    : state.budgetStatus === 'VIGILANCE'
                    ? 'text-[#D98A25]'
                    : 'text-[#C94B4B]'
                }`}
              >
                {state.budgetStatus === 'MAITRISE' ? 'Maîtrisé' : 'Vigilance (+5%)'}
              </span>
            </div>

            <div className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-lg p-3 text-center">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase block">
                Délais
              </span>
              <span
                className={`text-xs font-bold block mt-1 ${
                  state.scheduleStatus === 'MAITRISE'
                    ? 'text-[#168467]'
                    : state.scheduleStatus === 'VIGILANCE'
                    ? 'text-[#D98A25]'
                    : 'text-[#C94B4B]'
                }`}
              >
                {state.scheduleStatus === 'MAITRISE'
                  ? 'Maîtrisé'
                  : state.scheduleStatus === 'VIGILANCE'
                  ? 'Vigilance (+3 sem.)'
                  : 'Critique (+4 sem.)'}
              </span>
            </div>

            <div className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-lg p-3 text-center">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase block">
                Qualité / RGAA
              </span>
              <span
                className={`text-xs font-bold block mt-1 ${
                  state.criticalRisksCount === 0
                    ? 'text-[#168467]'
                    : 'text-[#D98A25]'
                }`}
              >
                {state.criticalRisksCount === 0 ? 'Maîtrisée' : 'Sous tension'}
              </span>
            </div>

            <div className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-lg p-3 text-center">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase block">
                Legacy SI
              </span>
              <span
                className={`text-xs font-bold block mt-1 ${
                  state.decommissioningStatus === 'EN_TRAJECTOIRE'
                    ? 'text-[#168467]'
                    : 'text-[#D98A25]'
                }`}
              >
                {state.decommissioningStatus === 'EN_TRAJECTOIRE'
                  ? 'En trajectoire'
                  : 'À accélérer'}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm font-medium text-[#111D32]">
            <span className="font-bold text-[#111D32]">Synthèse Sponsor :</span>{' '}
            <span className="text-[#334155]">{state.executiveSummary}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div
          role="button"
          tabIndex={0}
          onClick={() => setDrilldownTab('budget')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setDrilldownTab('budget')}
          className="bg-white hover:bg-[#FAFBFD] border border-[#E2E8F0] hover:border-[#111D32]/50 hover:shadow-md rounded-xl p-5 shadow-xs flex flex-col justify-between transition-all cursor-pointer group text-left"
          title="Cliquer pour explorer la décomposition budgétaire par chantier"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-[#64748B] group-hover:text-[#111D32] transition-colors">
                <DollarSign className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider">KPI 1 · Budget</span>
              </div>
              <MetricTrendBadge trend={state.trends.budget} />
            </div>

            <div className="text-2xl font-black text-[#111D32] tabular-numbers tracking-tight">
              {formatEuro(state.estimatedAtCompletion)}
            </div>
            <div className="text-xs text-[#64748B] mt-0.5 flex items-center justify-between">
              <span>Coût Final Estimé (EAC)</span>
              <span className="text-[10px] text-[#111D32] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                <Maximize2 className="w-2.5 h-2.5" /> Explorer
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F1F5F9] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Budget initial approuvé :</span>
                <span className="font-semibold tabular-numbers text-[#111D32]">
                  {formatEuro(state.initialBudget)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Dépense réalisée à date :</span>
                <span className="font-semibold tabular-numbers text-[#168467]">
                  {formatEuro(state.actualSpend)} (61,7 %)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Écart prévisionnel (VAC) :</span>
                <span
                  className={`font-bold tabular-numbers ${
                    state.variancePercent <= 2
                      ? 'text-[#168467]'
                      : 'text-[#D98A25]'
                  }`}
                >
                  +{state.variancePercent} % ({formatEuro(state.varianceAmount)})
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-[11px] text-[#64748B] bg-[#F8F9FB] p-2 rounded flex items-center justify-between">
            <span><strong>Chantiers :</strong> Cliquez pour voir le détail des 5 lots.</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#111D32] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => setDrilldownTab('schedule')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setDrilldownTab('schedule')}
          className="bg-white hover:bg-[#FAFBFD] border border-[#E2E8F0] hover:border-[#111D32]/50 hover:shadow-md rounded-xl p-5 shadow-xs flex flex-col justify-between transition-all cursor-pointer group text-left"
          title="Cliquer pour voir la matrice RACI et les critères d'acceptation"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-[#64748B] group-hover:text-[#111D32] transition-colors">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider">KPI 2 · Calendrier</span>
              </div>
              <MetricTrendBadge trend={state.trends.schedule} />
            </div>

            <div className="text-2xl font-black text-[#111D32] tabular-numbers tracking-tight">
              5 Jalons Clés
            </div>
            <div className="text-xs text-[#64748B] mt-0.5 flex items-center justify-between">
              <span>{state.completedMilestonesCount} réalisés · {state.atRiskMilestonesCount} à risque</span>
              <span className="text-[10px] text-[#111D32] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                <Maximize2 className="w-2.5 h-2.5" /> RACI
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F1F5F9] space-y-2">
              {state.milestones.map((m) => (
                <div key={m.id} className="flex items-center justify-between text-xs py-0.5">
                  <div className="flex items-center gap-1.5 truncate pr-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        m.status === 'COMPLETED'
                          ? 'bg-[#168467]'
                          : m.status === 'AT_RISK'
                          ? 'bg-[#D98A25]'
                          : 'bg-[#94A3B8]'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="font-medium text-[#111D32] truncate">
                      {m.code} : {m.name}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 tabular-numbers text-[11px] font-semibold ${
                      m.status === 'COMPLETED'
                        ? 'text-[#168467]'
                        : m.status === 'AT_RISK'
                        ? 'text-[#D98A25]'
                        : 'text-[#64748B]'
                    }`}
                  >
                    {m.status === 'COMPLETED'
                      ? 'Conforme'
                      : m.status === 'AT_RISK'
                      ? `+${m.delayWeeks} sem.`
                      : 'T4'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-[11px] text-[#64748B] bg-[#F8F9FB] p-2 rounded flex items-center justify-between">
            <span><strong>RACI & Livrables :</strong> Cliquez pour inspecter.</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#111D32] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => setDrilldownTab('risks')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setDrilldownTab('risks')}
          className="bg-white hover:bg-[#FAFBFD] border border-[#E2E8F0] hover:border-[#111D32]/50 hover:shadow-md rounded-xl p-5 shadow-xs flex flex-col justify-between transition-all cursor-pointer group text-left"
          title="Cliquer pour afficher la matrice des risques 5x5 interactive"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-[#64748B] group-hover:text-[#111D32] transition-colors">
                <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider">KPI 3 · Risques</span>
              </div>
              <MetricTrendBadge trend={state.trends.risks} />
            </div>

            <div className="text-2xl font-black text-[#111D32] tabular-numbers tracking-tight">
              {state.risks.length} Risques Suivis
            </div>
            <div className="text-xs text-[#64748B] mt-0.5 flex items-center justify-between">
              <span>Cartographie active du programme</span>
              <span className="text-[10px] text-[#111D32] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                <Maximize2 className="w-2.5 h-2.5" /> Matrice 5x5
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F1F5F9] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C94B4B]" aria-hidden="true" />
                  <span>Critiques :</span>
                </span>
                <span className="font-bold tabular-numbers text-[#C94B4B]">
                  {state.criticalRisksCount} alerte{state.criticalRisksCount > 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D98A25]" aria-hidden="true" />
                  <span>Modérés :</span>
                </span>
                <span className="font-semibold tabular-numbers text-[#D98A25]">
                  {state.moderateRisksCount} sous surveillance
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#168467]" aria-hidden="true" />
                  <span>Maîtrisés :</span>
                </span>
                <span className="font-semibold tabular-numbers text-[#168467]">
                  {state.controlledRisksCount} sécurisés
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-[11px] text-[#64748B] bg-[#F8F9FB] p-2 rounded flex items-center justify-between">
            <span><strong>Matrice 5x5 :</strong> Cliquez pour voir les fiches actions.</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#111D32] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => setDrilldownTab('decommissioning')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setDrilldownTab('decommissioning')}
          className="bg-white hover:bg-[#FAFBFD] border border-[#E2E8F0] hover:border-[#111D32]/50 hover:shadow-md rounded-xl p-5 shadow-xs flex flex-col justify-between transition-all cursor-pointer group text-left"
          title="Cliquer pour voir la cartographie des 4 applications legacy"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-[#64748B] group-hover:text-[#111D32] transition-colors">
                <Server className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider">KPI 4 · Décomm.</span>
              </div>
              <MetricTrendBadge trend={state.trends.decommissioning} />
            </div>

            <div className="text-2xl font-black text-[#111D32] tabular-numbers tracking-tight">
              4 Applications
            </div>
            <div className="text-xs text-[#64748B] mt-0.5 flex items-center justify-between">
              <span>Périmètre historique à retirer</span>
              <span className="text-[10px] text-[#111D32] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                <Maximize2 className="w-2.5 h-2.5" /> Cartographie
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F1F5F9] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Retirée(s) :</span>
                <span className="font-semibold tabular-numbers text-[#168467]">
                  {state.decommissionedCount} app ({formatEuro(state.realizedAnnualSavings)}/an)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Prête au retrait :</span>
                <span className="font-semibold tabular-numbers text-[#D98A25]">
                  {state.readyCount} app (60 000 €/an)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">En analyse :</span>
                <span className="font-semibold tabular-numbers text-[#111D32]">
                  {state.analyzingCount} apps (55 000 €/an)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-[11px] text-[#64748B] bg-[#F8F9FB] p-2 rounded flex items-center justify-between">
            <span><strong>Trajectoire OPEX :</strong> Cliquez pour voir les 4 applications.</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#111D32] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-[#111D32] uppercase tracking-wider">
              Trajectoire Budgétaire & Comparatif Réalisé vs EAC
            </h3>
            <p className="text-xs text-[#64748B]">
              Comprendre immédiatement l'écart financier prévisionnel ({formatEuro(state.varianceAmount)} / +{state.variancePercent} %)
            </p>
          </div>
          <div className="text-xs text-[#64748B]">
            Échelle en euros (€)
          </div>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={budgetChartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 140, bottom: 5 }}
            >
              <XAxis
                type="number"
                domain={[0, 1400000]}
                tickFormatter={(val) => `${val / 1000} k€`}
                stroke="#94A3B8"
                fontSize={11}
              />
              <YAxis
                type="category"
                dataKey="category"
                stroke="#111D32"
                fontSize={12}
                width={135}
                tick={{ fill: '#111D32', fontWeight: 500 }}
              />
              <Tooltip
                formatter={(value: any) => [formatEuro(Number(value)), 'Montant']}
                contentStyle={{
                  backgroundColor: '#111D32',
                  borderColor: '#334155',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="montant" radius={[0, 4, 4, 0]} barSize={22}>
                {budgetChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4 border-t border-[#F1F5F9] text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-[#111D32]" aria-hidden="true" />
            <span>Budget Approuvé (1 200 k€)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-[#168467]" aria-hidden="true" />
            <span>Dépense Réalisée (740 k€)</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-xs ${
                state.variancePercent <= 2
                  ? 'bg-[#168467]'
                  : state.variancePercent <= 6
                  ? 'bg-[#D98A25]'
                  : 'bg-[#C94B4B]'
              }`}
              aria-hidden="true"
            />
            <span>Coût Final Estimé EAC ({formatEuro(state.estimatedAtCompletion)})</span>
          </div>
        </div>
      </div>

      <InteractiveKpiModal
        isOpen={drilldownTab !== null}
        initialTab={drilldownTab || 'budget'}
        state={state}
        onClose={() => setDrilldownTab(null)}
      />
    </section>
  );
};
