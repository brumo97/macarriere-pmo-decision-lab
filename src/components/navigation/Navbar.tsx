/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Clock, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onStartDemo: () => void;
  isDemoActive: boolean;
  activeDemoStep: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartDemo,
  isDemoActive,
  activeDemoStep,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#111D32] border-b border-white/10 text-white backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-8">
        
        <a
          href="#top"
          className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <span className="w-2.5 h-2.5 rounded-xs bg-[#EABF48]" aria-hidden="true" />
          <span>MaCarrière</span>
          <span className="text-white/40 font-normal">|</span>
          <span className="hidden sm:inline text-white/80 font-medium">PMO Decision Lab</span>
          <span className="sm:hidden text-white/80 font-medium text-xs">PMO Lab</span>
        </a>

        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70"
        >
          <a
            href="#cockpit"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Cockpit PMO
          </a>
          <a
            href="#decision-lab"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Simulation 3 Choix
          </a>
          <a
            href="#sponsor-brief"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Synthèse COPIL
          </a>
          <a
            href="#method"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Méthode & Candidat
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onStartDemo}
            className={`px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
              isDemoActive
                ? 'bg-[#EABF48] text-[#111D32] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
            }`}
            aria-label={
              isDemoActive
                ? `Mode Démo actif étape ${activeDemoStep} sur 4`
                : 'Lancer le parcours Démo 60 secondes'
            }
          >
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{isDemoActive ? `Démo 60s (${activeDemoStep}/4)` : 'Démo 60 secondes'}</span>
            <span className="sm:hidden">{isDemoActive ? `${activeDemoStep}/4` : 'Démo 60s'}</span>
          </button>

          <a
            href="mailto:bmoreau7@outlook.com?subject=Echange%20-%20Candidature%20PMO%20La%20Poste"
            className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-semibold text-[#111D32] bg-[#EABF48] hover:bg-[#deb13c] rounded-md transition-colors items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>Contacter Bruno</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
};
