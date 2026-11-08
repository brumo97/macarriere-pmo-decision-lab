/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111D32] text-white border-t border-white/10 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-base font-bold text-white tracking-tight">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#EABF48]" aria-hidden="true" />
              <span>MaCarrière</span>
              <span className="text-white/40">|</span>
              <span className="text-white/80 font-medium">PMO Decision Lab</span>
            </div>
            <p className="text-xs text-[#EABF48] mt-1 font-medium">
              « Anticiper les risques. Éclairer les décisions. Sécuriser l'exécution. »
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
            <a
              href="mailto:bmoreau7@outlook.com?subject=Candidature%20PMO%20La%20Poste"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <span>bmoreau7@outlook.com</span>
            </a>
            <span className="text-white/20" aria-hidden="true">|</span>
            <span>Bruno Moreau — Candidat Alternant PMO (12 mois)</span>
            <span className="text-white/20" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-white/60 hover:text-white transition-colors"
              aria-label="Retourner en haut de la page"
            >
              <span>Haut de page</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="text-[11px] text-white/50 leading-relaxed max-w-4xl space-y-2">
          <p>
            <strong>Note de transparence & indépendance :</strong> Ce projet est une étude de cas personnelle et indépendante conçue par Bruno Moreau, inspirée exclusivement des missions publiques de l'offre d'emploi d'Alternant Chef de Projet / PMO au sein du Groupe La Poste (programme MaCarrière).
          </p>
          <p>
            Aucune donnée interne, aucun livrable officiel ni aucune connaissance confidentielle de La Poste Groupe ne sont utilisés. L'ensemble des chiffres, coûts, applications, métriques et scénarios présentés sont entièrement fictifs et ont pour seule vocation de démontrer des compétences méthodologiques en pilotage de portefeuille projet, gouvernance et communication exécutive.
          </p>
        </div>
      </div>
    </footer>
  );
};
