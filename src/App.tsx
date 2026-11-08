/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * MaCarrière | PMO Decision Lab
 * Démonstrateur de pilotage de programme conçu et présenté par Bruno Moreau
 */

import { useState, useEffect, useCallback } from 'react';
import {
  DecisionId,
  WhatIfParams,
  computeProgramState,
} from './domain/pmoModel';
import { Navbar } from './components/navigation/Navbar';
import { RecruiterTourBar } from './components/navigation/RecruiterTourBar';
import { HeroSection } from './components/pilotage/HeroSection';
import { ExecutiveControlRoom } from './components/pilotage/ExecutiveControlRoom';
import { DecisionLab } from './components/arbitrages/DecisionLab';
import { ComparisonModal } from './components/arbitrages/ComparisonModal';
import { SponsorBrief } from './components/restitution/SponsorBrief';
import { BehindTheMethod } from './components/restitution/BehindTheMethod';
import { Footer } from './components/navigation/Footer';
import { Sparkles } from 'lucide-react';
import { readSavedScenario, saveScenario } from './domain/decisionStorage';

export default function App() {
  // Un scénario est restauré uniquement si ses paramètres sont valides.
  const [initialScenario] = useState(readSavedScenario);
  const [decisionId, setDecisionId] = useState<DecisionId>(initialScenario.decisionId);
  const [whatIfParams, setWhatIfParams] = useState<WhatIfParams>(initialScenario.whatIfParams);

  // Message bref après une action de l'utilisateur
  const [toastMessage, setToastMessage] = useState<{ title: string; subtitle: string } | null>(null);

  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Visite guidée du portfolio (facultative)
  const [isDemoActive, setIsDemoActive] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1' || params.get('demo') === '1';
    }
    return false;
  });
  const [demoStep, setDemoStep] = useState(1);

  // Le moteur recalcule les indicateurs localement, sans appel à un serveur.
  const programState = computeProgramState(decisionId, whatIfParams);

  const showToast = useCallback((title: string, subtitle: string) => {
    setToastMessage({ title, subtitle });
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectDecision = (newDecision: DecisionId) => {
    setDecisionId(newDecision);
    saveScenario(newDecision, whatIfParams);

    if (newDecision === 'option-a') {
      showToast('Arbitrage Option A sélectionné', 'Jalon J4 sécurisé (0 sem.), conformité RGAA validée, surcoût +25 k€.');
    } else if (newDecision === 'option-b') {
      showToast('Arbitrage Option B sélectionné', 'Coupure anticipée Bilan Pro Legacy (+60 k€/an d’économies nettes).');
    } else if (newDecision === 'option-c') {
      showToast('Arbitrage Option C sélectionné', 'Discipline budgétaire renforcée (EAC 1 220 k€ / +1,7 %), dérive +4 sem.');
    } else if (newDecision === 'none') {
      showToast('Situation initiale restaurée', 'Cockpit réinitialisé à l’état de base sans arbitrage COPIL.');
    }
  };

  // Mémorise ensemble la sélection et les curseurs du scénario libre.
  const handleApplyWhatIf = (params: WhatIfParams) => {
    setWhatIfParams(params);
    setDecisionId('custom-whatif');
    saveScenario('custom-whatif', params);
    showToast(
      'Scénario What-If personnalisé appliqué',
      `+${params.rgaaBudgetK} k€ RGAA · ${params.decommissionedCount} app(s) retirée(s) · ${params.vendorRenegotiationK} k€ forfait.`
    );
  };

  const handleReset = () => {
    handleSelectDecision('none');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToDemoStep = useCallback((step: number) => {
    setDemoStep(step);
    setIsDemoActive(true);
    if (step === 1) scrollTo('hero');
    else if (step === 2) scrollTo('cockpit');
    else if (step === 3) scrollTo('decision-lab');
    else if (step === 4) scrollTo('method');
  }, []);

  const handleNextDemoStep = () => {
    if (demoStep < 4) {
      goToDemoStep(demoStep + 1);
    }
  };

  const handlePrevDemoStep = () => {
    if (demoStep > 1) {
      goToDemoStep(demoStep - 1);
    }
  };

  const handleToggleDemo = () => {
    if (!isDemoActive) {
      goToDemoStep(1);
    } else {
      setIsDemoActive(false);
    }
  };

  // Les flèches du clavier pilotent la visite, sauf si la comparaison est ouverte.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComparisonOpen) return;
      if (isDemoActive) {
        if (e.key === 'ArrowRight' && demoStep < 4) goToDemoStep(demoStep + 1);
        else if (e.key === 'ArrowLeft' && demoStep > 1) goToDemoStep(demoStep - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDemoActive, demoStep, isComparisonOpen, goToDemoStep]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] text-[#111D32] selection:bg-[#EABF48] selection:text-[#111D32]">
      
      <Navbar
        onStartDemo={handleToggleDemo}
        isDemoActive={isDemoActive}
        activeDemoStep={demoStep}
      />

      {isDemoActive && (
        <RecruiterTourBar
          currentStep={demoStep}
          totalSteps={4}
          onNext={handleNextDemoStep}
          onPrev={handlePrevDemoStep}
          onSelectStep={goToDemoStep}
          onClose={() => setIsDemoActive(false)}
        />
      )}

      <main id="top" className="flex-1">
        
        <HeroSection
          onExploreDecision={() => scrollTo('decision-lab')}
          onExploreCockpit={() => scrollTo('cockpit')}
          currentDecision={decisionId}
          onSelectDecision={handleSelectDecision}
        />

        <ExecutiveControlRoom
          state={programState}
          onExploreDecisions={() => scrollTo('decision-lab')}
        />

        <DecisionLab
          state={programState}
          onSelectDecision={handleSelectDecision}
          onApplyWhatIf={handleApplyWhatIf}
          whatIfParams={whatIfParams}
          onOpenComparison={() => setIsComparisonOpen(true)}
          onReset={handleReset}
        />

        <SponsorBrief state={programState} />

        <BehindTheMethod />
      </main>

      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        currentDecision={decisionId}
        onSelectDecision={handleSelectDecision}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#111D32] text-white p-4 rounded-xl shadow-2xl border border-[#EABF48]/40 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="w-7 h-7 rounded-lg bg-[#EABF48] text-[#111D32] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 fill-current" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>{toastMessage.title}</span>
            </div>
            <div className="text-[11px] text-white/70 leading-snug">
              {toastMessage.subtitle}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
