import {
  DEFAULT_WHATIF_PARAMS,
  type DecisionId,
  type WhatIfParams,
} from './pmoModel';

const STORAGE_KEY = 'macarriere_pmo_scenario_v1';
const LEGACY_DECISION_KEY = 'macarriere_pmo_selected_decision';

export interface SavedScenario {
  decisionId: DecisionId;
  whatIfParams: WhatIfParams;
}

const DECISIONS: DecisionId[] = ['none', 'option-a', 'option-b', 'option-c', 'custom-whatif'];

function isDecision(value: unknown): value is DecisionId {
  return typeof value === 'string' && DECISIONS.includes(value as DecisionId);
}

function isWhatIfParams(value: unknown): value is WhatIfParams {
  if (!value || typeof value !== 'object') return false;
  const params = value as Record<string, unknown>;

  // Les limites doivent correspondre aux curseurs visibles dans le simulateur.
  return typeof params.rgaaBudgetK === 'number'
    && Number.isFinite(params.rgaaBudgetK)
    && params.rgaaBudgetK >= 0 && params.rgaaBudgetK <= 40
    && params.rgaaBudgetK % 5 === 0
    && typeof params.decommissionedCount === 'number'
    && Number.isInteger(params.decommissionedCount)
    && params.decommissionedCount >= 1 && params.decommissionedCount <= 4
    && typeof params.vendorRenegotiationK === 'number'
    && Number.isFinite(params.vendorRenegotiationK)
    && params.vendorRenegotiationK >= -40 && params.vendorRenegotiationK <= 20
    && params.vendorRenegotiationK % 10 === 0;
}

export function readSavedScenario(): SavedScenario {
  const fallback: SavedScenario = {
    decisionId: 'none',
    whatIfParams: { ...DEFAULT_WHATIF_PARAMS },
  };

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        const data = parsed as Record<string, unknown>;
        if (isDecision(data.decisionId) && isWhatIfParams(data.whatIfParams)) {
          return { decisionId: data.decisionId, whatIfParams: data.whatIfParams };
        }
      }
    }

    // Compatibilité avec la première version du portfolio.
    const legacy = localStorage.getItem(LEGACY_DECISION_KEY);
    if (isDecision(legacy) && legacy !== 'custom-whatif') {
      return { ...fallback, decisionId: legacy };
    }
  } catch {
    // Navigation privée ou stockage indisponible : l'application reste utilisable.
  }

  return fallback;
}

export function saveScenario(decisionId: DecisionId, whatIfParams: WhatIfParams): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ decisionId, whatIfParams }));
  } catch {
    // Le stockage local est facultatif ; seule la session courante sera conservée.
  }
}
