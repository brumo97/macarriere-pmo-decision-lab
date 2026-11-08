/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeProgramState,
  computeWhatIfState,
  formatEuro,
  formatCopilClipboardText,
} from './pmoModel';

test('Baseline program state correctly reflects initial conditions', () => {
  const state = computeProgramState('none');
  
  // Budget
  assert.equal(state.initialBudget, 1200000);
  assert.equal(state.actualSpend, 740000);
  assert.equal(state.estimatedAtCompletion, 1260000);
  assert.equal(state.varianceAmount, 60000);
  assert.equal(state.variancePercent, 5.0);
  assert.equal(state.budgetStatus, 'VIGILANCE');
  
  // Cinq jalons : trois terminés, un menacé et un prévu.
  assert.equal(state.milestones.length, 5);
  assert.equal(state.completedMilestonesCount, 3);
  assert.equal(state.atRiskMilestonesCount, 1);
  assert.equal(state.plannedMilestonesCount, 1);
  assert.equal(state.maxDelayWeeks, 3);
  
  // Un risque critique, deux modérés et deux maîtrisés.
  assert.equal(state.criticalRisksCount, 1);
  assert.equal(state.moderateRisksCount, 2);
  assert.equal(state.controlledRisksCount, 2);
  
  // Quatre applications : une retirée, une prête et deux en analyse.
  assert.equal(state.legacyApps.length, 4);
  assert.equal(state.decommissionedCount, 1);
  assert.equal(state.readyCount, 1);
  assert.equal(state.analyzingCount, 2);
  assert.equal(state.realizedAnnualSavings, 45000);
  assert.equal(state.pendingAnnualSavings, 115000);
  
  // Synthèse de l’état du programme
  assert.equal(state.globalHealth, 'VIGILANCE');
});

test('Option A (Prioriser accessibilité) secures J4 and eliminates critical risk but increases budget', () => {
  const state = computeProgramState('option-a');
  
  // Le coût total estimé augmente de 25 k€.
  assert.equal(state.estimatedAtCompletion, 1285000);
  assert.equal(state.varianceAmount, 85000);
  assert.equal(state.variancePercent, 7.1);
  
  // Le jalon J4 est sécurisé et ne présente plus de retard.
  assert.equal(state.atRiskMilestonesCount, 0);
  assert.equal(state.completedMilestonesCount, 4);
  assert.equal(state.maxDelayWeeks, 0);
  assert.equal(state.scheduleStatus, 'MAITRISE');
  
  // Le risque critique R-01 est levé.
  assert.equal(state.criticalRisksCount, 0);
  assert.equal(state.controlledRisksCount, 3);
  
  // Les contreparties sont toujours documentées.
  assert.ok(state.residualRisks.length > 0);
  assert.ok(state.hypotheses.length > 0);

  // Évolution par rapport à la situation initiale
  assert.equal(state.trends.budget.type, 'DEGRADED');
  assert.equal(state.trends.budget.direction, 'up');
  assert.equal(state.trends.schedule.type, 'IMPROVED');
  assert.equal(state.trends.schedule.direction, 'down');
  assert.equal(state.trends.risks.type, 'IMPROVED');
  assert.equal(state.trends.risks.direction, 'down');
  assert.equal(state.trends.decommissioning.type, 'NEUTRAL');
});

test('Option B (Accélérer décommissionnement) retires Bilan Pro and boosts realized savings to 105k/yr', () => {
  const state = computeProgramState('option-b');
  
  // Le retrait occasionne 15 k€ de coût de transition.
  assert.equal(state.estimatedAtCompletion, 1275000);
  
  // Deux applications retirées portent les économies à 105 k€/an.
  assert.equal(state.decommissionedCount, 2);
  assert.equal(state.readyCount, 0);
  assert.equal(state.realizedAnnualSavings, 105000);
  assert.equal(state.pendingAnnualSavings, 55000);
  assert.equal(state.decommissioningStatus, 'EN_TRAJECTOIRE');
  
  // L’option B ne résout pas le retard de trois semaines sur J4.
  assert.equal(state.maxDelayWeeks, 3);

  // Évolution par rapport à la situation initiale
  assert.equal(state.trends.budget.type, 'DEGRADED');
  assert.equal(state.trends.decommissioning.type, 'IMPROVED');
  assert.equal(state.trends.decommissioning.direction, 'up');
  assert.equal(state.trends.schedule.type, 'NEUTRAL');
});

test('Option C (Renforcer pilotage financier) reduces cost to 1220k but increases delay to 4 weeks', () => {
  const state = computeProgramState('option-c');
  
  // L’arbitrage réduit le coût estimé de 40 k€.
  assert.equal(state.estimatedAtCompletion, 1220000);
  assert.equal(state.variancePercent, 1.7);
  assert.equal(state.budgetStatus, 'MAITRISE');
  
  // Le retard atteint quatre semaines.
  assert.equal(state.maxDelayWeeks, 4);
  assert.equal(state.scheduleStatus, 'CRITIQUE');

  // Évolution par rapport à la situation initiale
  assert.equal(state.trends.budget.type, 'IMPROVED');
  assert.equal(state.trends.budget.direction, 'down');
  assert.equal(state.trends.schedule.type, 'DEGRADED');
  assert.equal(state.trends.schedule.direction, 'up');
});

test('formatCopilClipboardText generates a complete 4-part executive slide', () => {
  const state = computeProgramState('option-a');
  const text = formatCopilClipboardText(state);
  
  assert.ok(text.includes('[1. SITUATION]'));
  assert.ok(text.includes('[2. IMPACT SIMULÉ]'));
  assert.ok(text.includes('[3. RECOMMANDATION PMO]'));
  assert.ok(text.includes('[4. PROCHAINE ACTION IMMÉDIATE]'));
  assert.ok(text.includes('Bruno Moreau'));
  assert.ok(text.includes(formatEuro(state.estimatedAtCompletion)));
});

test('formatEuro formats values with currency symbol', () => {
  const formatted = formatEuro(1200000);
  assert.ok(formatted.includes('1'));
  assert.ok(formatted.includes('200'));
  assert.ok(formatted.includes('000'));
  assert.ok(formatted.includes('€'));
});

test('computeWhatIfState dynamically calculates custom parameters', () => {
  const customState = computeWhatIfState({
    rgaaBudgetK: 30, // Sécurisation du jalon RGAA
    decommissionedCount: 3, // Économies annualisées : 140 k€
    vendorRenegotiationK: -20, // Économie de 20 k€, avec une semaine de retard supplémentaire.
  });

  // Calcul du scénario libre : coût initial ajusté et transition.
  assert.equal(customState.estimatedAtCompletion, 1300000);
  assert.equal(customState.realizedAnnualSavings, 140000);
  assert.equal(customState.criticalRisksCount, 0); // Risque levé grâce au renfort RGAA
  assert.equal(customState.maxDelayWeeks, 1); // Pas de retard RGAA ; une semaine liée au prestataire
});
