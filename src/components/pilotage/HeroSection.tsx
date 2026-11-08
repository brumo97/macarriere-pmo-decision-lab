/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowDown, Play, Target, Shield, Briefcase } from 'lucide-react';

interface HeroSectionProps {
  onExploreDecision: () => void;
  onExploreCockpit: () => void;
  currentDecision?: string;
  onSelectDecision?: (decision: any) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreDecision,
  onExploreCockpit,
  currentDecision = 'none',
  onSelectDecision,
}) => {
  return (
    <section
      id="hero"
      className="relative bg-[#111D32] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden"
    >
      
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto">
        
        <div className="flex flex-wrap items-center gap-2 text-xs text-white/60 mb-6">
          <span className="text-[#EABF48] font-semibold">Étude de cas indépendante</span>
          <span aria-hidden="true">·</span>
          <span>Données simulées</span>
          <span aria-hidden="true">·</span>
          <span>Inspirée des missions publiques du programme MaCarrière</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 text-balance">
          MaCarrière <span className="text-[#EABF48] font-light">|</span> PMO Decision Lab
        </h1>

        <p className="text-lg sm:text-xl font-medium text-[#EABF48] mb-6 tracking-wide">
          « Anticiper les risques. Éclairer les décisions. Sécuriser l'exécution. »
        </p>

        <div className="space-y-4 max-w-3xl mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white/95 leading-snug">
            Comment sécuriser les délais, maîtriser les budgets et transformer les risques en décisions ?
          </h2>
          <p className="text-base sm:text-lg text-white/75 leading-relaxed">
            Une simulation interactive de pilotage PMO conçue pour une revue de programme : identifiez une alerte, choisissez une action stratégique et observez immédiatement son impact sur la trajectoire financière, calendaire et technique du programme.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 py-4 px-5 rounded-lg bg-white/5 border border-white/10 mb-8 max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EABF48] text-[#111D32] font-bold flex items-center justify-center text-sm shadow-xs">
              BM
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Bruno Moreau</div>
              <div className="text-xs text-white/70">
                Candidat Alternant Chef de Projet / PMO · 12 mois
              </div>
            </div>
          </div>
          <span className="hidden sm:inline-block w-px h-8 bg-white/15" aria-hidden="true" />
          <div className="text-xs text-white/60 space-y-0.5">
            <div>
              Candidature ciblée : <span className="text-white/90 font-medium">Programme MaCarrière — La Poste Groupe</span>
            </div>
            <div>
              Formation : <span className="text-white/90">SKEMA Business School (MS Supply Chain & Achats)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onExploreDecision}
            className="px-6 py-3 bg-[#EABF48] hover:bg-[#deb13c] text-[#111D32] font-bold rounded-lg text-sm sm:text-base transition-colors flex items-center gap-2 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EABF48] cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            <span>Explorer une décision</span>
          </button>

          <button
            type="button"
            onClick={onExploreCockpit}
            className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg text-sm sm:text-base transition-colors border border-white/20 flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
          >
            <ArrowDown className="w-4 h-4 text-white/70" aria-hidden="true" />
            <span>Consulter le Cockpit Santé</span>
          </button>
        </div>

        {onSelectDecision && (
          <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#EABF48] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1 shrink-0 mr-1">
              ⚡ Test 1-clic :
            </span>
            <button
              type="button"
              onClick={() => onSelectDecision('option-a')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                currentDecision === 'option-a'
                  ? 'bg-[#EABF48] text-[#111D32] shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Option A · RGAA (+25 k€)
            </button>
            <button
              type="button"
              onClick={() => onSelectDecision('option-b')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                currentDecision === 'option-b'
                  ? 'bg-[#EABF48] text-[#111D32] shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Option B · Legacy (+60 k€/an)
            </button>
            <button
              type="button"
              onClick={() => onSelectDecision('option-c')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                currentDecision === 'option-c'
                  ? 'bg-[#EABF48] text-[#111D32] shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Option C · Budget (-40 k€)
            </button>
            <button
              type="button"
              onClick={() => onSelectDecision('none')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                currentDecision === 'none'
                  ? 'bg-white/30 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              Base (Sans arbitrage)
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10 text-xs">
          <div className="flex items-start gap-2.5 text-white/80">
            <Target className="w-4 h-4 text-[#EABF48] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <div className="font-semibold text-white">Rigueur budgétaire & Jalons</div>
              <div className="text-white/60 mt-0.5">Distinction rigoureuse entre budget approuvé, dépenses et coût final estimé (EAC).</div>
            </div>
          </div>
          <div className="flex items-start gap-2.5 text-white/80">
            <Shield className="w-4 h-4 text-[#EABF48] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <div className="font-semibold text-white">Gestion active des risques</div>
              <div className="text-white/60 mt-0.5">Qualification d’impact, arbitrages d’accessibilité RGAA et plan de remédiation.</div>
            </div>
          </div>
          <div className="flex items-start gap-2.5 text-white/80">
            <Briefcase className="w-4 h-4 text-[#EABF48] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <div className="font-semibold text-white">Communication sponsor</div>
              <div className="text-white/60 mt-0.5">Synthèse exécutive au format COPIL prête pour la prise de décision.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
