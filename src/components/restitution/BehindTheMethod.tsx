/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Mail,
  Linkedin,
  FileText,
  Building2,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Layers,
  Database,
  Users2,
  Sliders,
} from 'lucide-react';

export const BehindTheMethod: React.FC = () => {
  return (
    <section id="method" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] mb-2">
          <span>SECTION 5 / LE CANDIDAT</span>
          <span aria-hidden="true">·</span>
          <span>VALEUR & MÉTHODE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111D32] tracking-tight mb-3">
          Behind the Method
        </h2>
        <p className="text-xl font-bold text-[#EABF48] tracking-tight">
          « Mon approche : transformer les données en décisions, et les décisions en actions. »
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-4 text-sm text-[#334155] leading-relaxed">
            <p>
              Chez <strong className="text-[#111D32]">Aptar Beauty</strong>, j'ai évolué pendant plus de deux ans dans un environnement industriel international, en coordonnant plusieurs équipes et en exploitant <strong className="text-[#111D32]">SAP, CRM C4C et Excel</strong> pour suivre les activités et les indicateurs.
            </p>
            <p>
              Cette expérience, complétée par une première exposition au développement web et ma formation en Achats & Supply Chain à <strong className="text-[#111D32]">SKEMA</strong>, nourrit mon intérêt pour le pilotage de projets et la transformation digitale.
            </p>
            <p>
              Ce démonstrateur illustre la manière dont j'aborderais un projet PMO : <strong className="text-[#111D32]">structurer les informations</strong>, <strong className="text-[#111D32]">anticiper les risques</strong>, <strong className="text-[#111D32]">éclairer les arbitrages</strong> et <strong className="text-[#111D32]">faciliter la coordination</strong> des parties prenantes.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xs">
            <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-4">
              Compétences Clés Mobilisées en PMO
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#F8F9FB] border border-[#E2E8F0]">
                <TrendingUp className="w-4 h-4 text-[#111D32] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="font-bold text-[#111D32]">Analyse et reporting</div>
                  <div className="text-[#64748B] mt-0.5">Suivi rigoureux des indicateurs, seuils d'alerte et écarts prévisionnels (EAC/VAC).</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#F8F9FB] border border-[#E2E8F0]">
                <Users2 className="w-4 h-4 text-[#111D32] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="font-bold text-[#111D32]">Coordination transverse</div>
                  <div className="text-[#64748B] mt-0.5">Alignement direct entre équipes métiers, MOE technique et prestataires externes.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#F8F9FB] border border-[#E2E8F0]">
                <Database className="w-4 h-4 text-[#111D32] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="font-bold text-[#111D32]">Systèmes d'information</div>
                  <div className="text-[#64748B] mt-0.5">Pratique quotidienne de SAP, CRM C4C et modélisation avancée Excel.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#F8F9FB] border border-[#E2E8F0]">
                <Sliders className="w-4 h-4 text-[#111D32] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="font-bold text-[#111D32]">Processus & Gouvernance</div>
                  <div className="text-[#64748B] mt-0.5">Préparation des comités (COPIL/COPROJ), suivi des jalons et formalisation d'actions.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#111D32] text-white rounded-2xl p-6 sm:p-7 shadow-lg space-y-5">
            <h3 className="text-xs font-bold text-[#EABF48] uppercase tracking-wider">
              Preuves de Parcours Professionnel
            </h3>

            <div className="space-y-4">
              <div className="border-b border-white/10 pb-3">
                <div className="text-3xl font-black text-white tabular-numbers">
                  94
                </div>
                <div className="text-xs font-semibold text-white/90 mt-0.5">
                  Comptes B2B suivis
                </div>
                <div className="text-[11px] text-white/60 mt-0.5">
                  En environnement industriel international complexe chez Aptar Beauty.
                </div>
              </div>

              <div className="border-b border-white/10 pb-3">
                <div className="text-3xl font-black text-[#EABF48] tabular-numbers">
                  12,5 M€
                </div>
                <div className="text-xs font-semibold text-white/90 mt-0.5">
                  D'activité associée au portefeuille
                </div>
                <div className="text-[11px] text-white/60 mt-0.5">
                  Suivi des flux opérationnels, livraisons et indicateurs d'activité.
                </div>
              </div>

              <div>
                <div className="text-3xl font-black text-white tabular-numbers">
                  +2 ans
                </div>
                <div className="text-xs font-semibold text-white/90 mt-0.5">
                  D'expérience industrielle
                </div>
                <div className="text-[11px] text-white/60 mt-0.5">
                  Exposition transverse directe aux opérations, à la supply chain et aux SI.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-start gap-2.5 text-xs text-white/80">
                <GraduationCap className="w-4 h-4 text-[#EABF48] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="font-bold text-white">SKEMA Business School</div>
                  <div className="text-white/70">
                    MS Manager de la Chaîne Logistique et Achats, 2026–2027
                  </div>
                  <div className="text-[#EABF48] font-semibold mt-0.5">
                    Rythme : Alternance de 12 mois
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-[#111D32] shadow-md">
            <h3 className="text-base font-extrabold text-[#111D32] mb-1">
              Et si nous parlions pilotage de projet ?
            </h3>
            <p className="text-xs text-[#64748B] mb-5">
              Disponible pour échanger sur vos enjeux PMO et la mise en œuvre de la transformation MaCarrière.
            </p>

            <div className="space-y-2.5">
              <a
                href="mailto:bmoreau7@outlook.com?subject=Echange%20-%20Candidature%20PMO%20La%20Poste"
                className="w-full py-3 px-4 bg-[#EABF48] hover:bg-[#deb13c] text-[#111D32] font-bold rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Mail className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>Échanger avec Bruno Moreau</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <div className="flex items-center justify-center gap-3 pt-2 text-xs text-[#64748B]">
                <a
                  href="mailto:bmoreau7@outlook.com"
                  className="hover:text-[#111D32] underline underline-offset-2"
                >
                  bmoreau7@outlook.com
                </a>
                <span aria-hidden="true">·</span>
                <span>Paris / Île-de-France</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
