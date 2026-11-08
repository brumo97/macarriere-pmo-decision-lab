/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ProgramState,
  formatEuro,
  formatCopilClipboardText,
} from '../../domain/pmoModel';
import {
  Copy,
  Check,
  FileCheck2,
  AlertCircle,
  TrendingUp,
  Clock,
  UserCheck,
  Calendar,
  Download,
  Vote,
  Sparkles,
} from 'lucide-react';

interface SponsorBriefProps {
  state: ProgramState;
}

type SponsorVote = 'approved' | 'conditional' | 'alternative';

export const SponsorBrief: React.FC<SponsorBriefProps> = ({ state }) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [sponsorVote, setSponsorVote] = useState<SponsorVote>('approved');

  const handleCopy = async () => {
    const textToCopy = formatCopilClipboardText(state);
    let success = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        success = true;
      }
    } catch {
      // Certains navigateurs refusent l'accès direct au presse-papiers.
    }

    if (!success) {
      const textArea = document.createElement('textarea');
      try {
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
      } catch {
        success = false;
      } finally {
        textArea.remove();
      }
    }

    setCopied(success);
    setCopyError(!success);
    window.setTimeout(() => {
      setCopied(false);
      setCopyError(false);
    }, 3000);
  };

  const handleDownload = () => {
    const textToDownload = formatCopilClipboardText(state);
    const blob = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MaCarriere_COPIL_Recommandation_${state.decisionId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section
      id="sponsor-brief"
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] mb-1">
            <span>SECTION 4 / COMMUNIQUER</span>
            <span aria-hidden="true">·</span>
            <span>SUPPORT DE COMITÉ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111D32] tracking-tight">
            Recommandation PMO — Synthèse COPIL
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] mt-1">
            La synthèse en 15 secondes pour le sponsor : situation, impact simulé, recommandation PMO et prochaine action.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleDownload}
            className="px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 bg-white hover:bg-[#F8F9FB] border border-[#CBD5E1] text-[#111D32] shadow-2xs cursor-pointer"
            aria-label="Télécharger la synthèse COPIL en fichier texte"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-[#168467]" aria-hidden="true" />
                <span>Téléchargé !</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#111D32]" aria-hidden="true" />
                <span>Télécharger (.txt)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer ${
              copied
                ? 'bg-[#168467] text-white'
                : 'bg-[#111D32] hover:bg-[#182844] text-white focus-visible:ring-2 focus-visible:ring-[#EABF48]'
            }`}
            aria-label="Copier la synthèse COPIL dans le presse-papier"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#EABF48]" aria-hidden="true" />
                <span>Synthèse copiée !</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#EABF48]" aria-hidden="true" />
                <span>{copyError ? "Copie impossible - essayez le téléchargement" : "Copier la synthèse COPIL"}</span>
              </>
            )}
          </button>
        </div>
      </div>
      {copyError && (
        <p role="alert" className="text-xs text-[#C94B4B] mt-2">Le navigateur a refusé la copie. Utilisez « Télécharger (.txt) ».</p>
      )}

      <div className="bg-white border-2 border-[#111D32] rounded-2xl shadow-xl overflow-hidden mb-6">
        
        <div className="bg-[#111D32] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-xs bg-[#EABF48]" aria-hidden="true" />
            <div>
              <span className="text-xs uppercase tracking-widest text-[#EABF48] font-bold block">
                Comité de Pilotage (COPIL) · Programme MaCarrière
              </span>
              <span className="text-base font-extrabold text-white">
                Fiche d'Arbitrage Exécutive — {state.decisionName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-white/70">
            <div>
              Date : <span className="text-white font-medium">Octobre 2026</span>
            </div>
            <span className="text-white/20" aria-hidden="true">|</span>
            <div>
              Rapporteur PMO : <span className="text-white font-medium">Bruno Moreau</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F8F9FB]/50">
          
          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#111D32] uppercase tracking-wider mb-2 pb-2 border-b border-[#F1F5F9]">
                <span className="w-5 h-5 rounded-full bg-[#111D32] text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>SITUATION</span>
              </div>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                {state.copilSlide.situation}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
              <strong>Focus :</strong> Identification claire de la cause racine nécessitant décision.
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#111D32] uppercase tracking-wider mb-2 pb-2 border-b border-[#F1F5F9]">
                <span className="w-5 h-5 rounded-full bg-[#111D32] text-white flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>IMPACT CHIFFRÉ</span>
              </div>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed mb-3">
                {state.copilSlide.impact}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs bg-[#F8F9FB] p-2.5 rounded-lg border border-[#E2E8F0]">
                <div>
                  <span className="text-[#64748B] text-[11px] block">Coût final EAC :</span>
                  <span className="font-bold tabular-numbers text-[#111D32]">
                    {formatEuro(state.estimatedAtCompletion)}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] text-[11px] block">Dérive Jalon :</span>
                  <span className="font-bold tabular-numbers text-[#111D32]">
                    {state.maxDelayWeeks === 0 ? '0 sem. (Tenu)' : `+${state.maxDelayWeeks} sem.`}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-[#64748B]">
              <strong>Focus :</strong> Quantification objective des écarts budgétaires et planning.
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#111D32] uppercase tracking-wider mb-2 pb-2 border-b border-[#F1F5F9]">
                <span className="w-5 h-5 rounded-full bg-[#EABF48] text-[#111D32] flex items-center justify-center text-[10px]">
                  3
                </span>
                <span>RECOMMANDATION DU PMO</span>
              </div>
              <p className="text-xs sm:text-sm text-[#111D32] font-medium leading-relaxed">
                {state.copilSlide.recommendation}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
              <strong>Focus :</strong> Prise de position argumentée avec balance bénéfices / risques.
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#111D32] uppercase tracking-wider mb-2 pb-2 border-b border-[#F1F5F9]">
                <span className="w-5 h-5 rounded-full bg-[#168467] text-white flex items-center justify-center text-[10px]">
                  4
                </span>
                <span>PROCHAINE ACTION IMMÉDIATE</span>
              </div>
              <div className="space-y-2.5 text-xs text-[#334155]">
                <div>
                  <span className="text-[#64748B] block text-[11px]">Action concrète :</span>
                  <span className="font-bold text-[#111D32]">
                    {state.copilSlide.nextAction.action}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[#64748B] block text-[11px]">Porteur désigné :</span>
                    <span className="font-medium text-[#111D32]">
                      {state.copilSlide.nextAction.owner}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#64748B] block text-[11px]">Échéance cible :</span>
                    <span className="font-semibold text-[#168467]">
                      {state.copilSlide.nextAction.deadline}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
              <strong>Focus :</strong> Engagement opérationnel immédiat sans latence post-comité.
            </div>
          </div>
        </div>

        <div className="bg-[#111D32] text-white/70 px-6 py-3 flex flex-wrap items-center justify-between text-xs border-t border-white/10">
          <span>Étude de cas PMO · Simulation décisionnelle pour comité de direction</span>
          <span className="text-[#EABF48] font-semibold">
            Bruno Moreau — MaCarrière Decision Lab
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9] mb-4">
          <div className="flex items-center gap-2">
            <Vote className="w-4 h-4 text-[#111D32]" />
            <h4 className="text-xs font-bold text-[#111D32] uppercase tracking-wider">
              Simulation de Vote du Sponsor en Séance COPIL
            </h4>
          </div>
          <span className="text-xs text-[#64748B]">
            Simulez la délibération du comité et générez le relevé de décision officiel
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <button
            type="button"
            onClick={() => setSponsorVote('approved')}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              sponsorVote === 'approved'
                ? 'bg-[#168467]/10 border-[#168467] text-[#168467] font-bold shadow-2xs'
                : 'bg-[#F8F9FB] border-[#E2E8F0] text-[#334155] hover:border-[#111D32]/30'
            }`}
          >
            <span className="block text-xs font-bold">1. Arbitrage Validé</span>
            <span className="block text-[11px] opacity-80 mt-0.5">
              Accord unanime sur la recommandation du PMO.
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSponsorVote('conditional')}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              sponsorVote === 'conditional'
                ? 'bg-[#D98A25]/10 border-[#D98A25] text-[#D98A25] font-bold shadow-2xs'
                : 'bg-[#F8F9FB] border-[#E2E8F0] text-[#334155] hover:border-[#111D32]/30'
            }`}
          >
            <span className="block text-xs font-bold">2. Accord Sous Réserve</span>
            <span className="block text-[11px] opacity-80 mt-0.5">
              Validation assortie d'un point d'étape hebdomadaire PMO.
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSponsorVote('alternative')}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              sponsorVote === 'alternative'
                ? 'bg-[#C94B4B]/10 border-[#C94B4B] text-[#C94B4B] font-bold shadow-2xs'
                : 'bg-[#F8F9FB] border-[#E2E8F0] text-[#334155] hover:border-[#111D32]/30'
            }`}
          >
            <span className="block text-xs font-bold">3. Décision Ajournée</span>
            <span className="block text-[11px] opacity-80 mt-0.5">
              Demande d'un chiffrage contradictoire complémentaire.
            </span>
          </button>
        </div>

        <div className="p-3.5 bg-[#F8F9FB] rounded-lg border border-[#E2E8F0] text-xs text-[#334155]">
          <div className="flex items-center justify-between font-bold text-[#111D32] mb-1">
            <span>Extrait du Procès-Verbal de Séance (Simulé) :</span>
            <span className="text-[11px] font-mono text-[#64748B]">Minute COPIL #14</span>
          </div>
          <p className="leading-relaxed">
            {sponsorVote === 'approved' && (
              <>
                « Le comité entérine la recommandation portée par le PMO (<strong>{state.decisionName}</strong>). L'action immédiate « <em>{state.copilSlide.nextAction.action}</em> » est engagée sous la responsabilité de <strong>{state.copilSlide.nextAction.owner}</strong> avec une échéance fixée à <strong>{state.copilSlide.nextAction.deadline}</strong>. »
              </>
            )}
            {sponsorVote === 'conditional' && (
              <>
                « Le comité approuve sous réserve les orientations du scénario (<strong>{state.decisionName}</strong>). Le PMO est mandaté pour instaurer une revue hebdomadaire des coûts et des jalons avec les équipes techniques jusqu'au passage de jalon. »
              </>
            )}
            {sponsorVote === 'alternative' && (
              <>
                « Le comité prend acte de la proposition du PMO mais sollicite une étude d'impact affinée sous 72h avant arbitrage définitif. L'équipe projet maintient les activités sans engagement de surcoût à date. »
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};
