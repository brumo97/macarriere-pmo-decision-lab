/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modèle de simulation PMO - programme fictif MaCarrière
 * Étude de cas conçue et présentée par Bruno Moreau
 */

export type DecisionId = 'none' | 'option-a' | 'option-b' | 'option-c' | 'custom-whatif';

export type HealthStatus = 'MAITRISE' | 'VIGILANCE' | 'CRITIQUE';

export interface Milestone {
  id: string;
  code: string;
  name: string;
  targetDate: string;
  status: 'COMPLETED' | 'AT_RISK' | 'PLANNED';
  delayWeeks: number;
  criticalPath: boolean;
  comment: string;
  deliverables?: string[];
  raci?: { r: string; a: string; c: string; i: string };
}

export interface RiskItem {
  id: string;
  code: string;
  title: string;
  category: 'CONFORMITE' | 'FINANCE' | 'TECH' | 'METIER';
  severity: 'CRITIQUE' | 'MODERE' | 'MAITRISE';
  probability: 'FORTE' | 'MOYENNE' | 'FAIBLE';
  impactDescription: string;
  mitigation: string;
  impactScore: number;
  probabilityScore: number;
  owner: string;
}

export interface LegacyApp {
  id: string;
  code: string;
  name: string;
  role: string;
  status: 'RETIREE' | 'PRETE' | 'EN_ANALYSE';
  annualRunCost: number; // en euros
  savingsRealized: boolean;
  dependencies: string;
}

export interface MetricTrend {
  type: 'IMPROVED' | 'DEGRADED' | 'NEUTRAL';
  direction: 'up' | 'down' | 'same';
  label: string;
  tooltip: string;
}

export interface MetricTrends {
  budget: MetricTrend;
  schedule: MetricTrend;
  risks: MetricTrend;
  decommissioning: MetricTrend;
}

export interface ProgramState {
  decisionId: DecisionId;
  decisionName: string;
  trends: MetricTrends;
  
  // Budget
  initialBudget: number;
  actualSpend: number;
  estimatedAtCompletion: number;
  varianceAmount: number;
  variancePercent: number;
  budgetStatus: HealthStatus;
  budgetTrend: string;
  
  // Planning et jalons
  milestones: Milestone[];
  completedMilestonesCount: number;
  atRiskMilestonesCount: number;
  plannedMilestonesCount: number;
  maxDelayWeeks: number;
  scheduleStatus: HealthStatus;
  
  // Risques
  risks: RiskItem[];
  criticalRisksCount: number;
  moderateRisksCount: number;
  controlledRisksCount: number;
  risksStatus: HealthStatus;
  
  // Retrait des applications historiques
  legacyApps: LegacyApp[];
  decommissionedCount: number;
  readyCount: number;
  analyzingCount: number;
  realizedAnnualSavings: number;
  pendingAnnualSavings: number;
  decommissioningStatus: 'A_ACCELERER' | 'EN_TRAJECTOIRE' | 'CRITIQUE';
  
  // État général du programme
  globalHealth: HealthStatus;
  weatherSummary: string;
  executiveSummary: string;
  
  // Restitution pour le comité de pilotage
  copilSlide: {
    situation: string;
    impact: string;
    recommendation: string;
    nextAction: {
      action: string;
      owner: string;
      deadline: string;
    };
  };
  
  // Hypothèses de calcul et contreparties des arbitrages
  hypotheses: string[];
  residualRisks: string[];
}

export const BASELINE_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    code: 'J1',
    name: 'Cadrage & Architecture cible',
    targetDate: '15 Janvier',
    status: 'COMPLETED',
    delayWeeks: 0,
    criticalPath: true,
    comment: 'Validé en COPIL sans réserve.',
    deliverables: ['Dossier d’architecture technique', 'Cahier des charges fonctionnel', 'Charte projet PMO'],
    raci: { r: 'Architecte SI & MOA', a: 'Directeur de Transformation', c: 'RSSI & PMO', i: 'Métiers RH' },
  },
  {
    id: 'm2',
    code: 'J2',
    name: 'MVP Portail Collaborateur',
    targetDate: '30 Avril',
    status: 'COMPLETED',
    delayWeeks: 0,
    criticalPath: true,
    comment: 'Livraison socle fonctionnel conforme.',
    deliverables: ['Socle React/TypeScript', 'Parcours recherche de poste', 'Espace profil collaborateur'],
    raci: { r: 'Lead Dev & UX Designer', a: 'Chef de Projet SI', c: 'PMO & Référents RH', i: 'Sponsors' },
  },
  {
    id: 'm3',
    code: 'J3',
    name: 'Intégration SIRH & Recette V1',
    targetDate: '15 Juillet',
    status: 'COMPLETED',
    delayWeeks: 0,
    criticalPath: true,
    comment: 'Connecteurs principaux validés.',
    deliverables: ['Connecteur Paie/RH', 'Flux référentiel compétences', 'PV de recette intégration'],
    raci: { r: 'Équipe Intégration SIRH', a: 'Responsable Domaine RH', c: 'PMO & Experts Métier', i: 'DSI' },
  },
  {
    id: 'm4',
    code: 'J4',
    name: 'Déploiement V1 & Audit RGAA',
    targetDate: '30 Octobre',
    status: 'AT_RISK',
    delayWeeks: 3,
    criticalPath: true,
    comment: 'Dérive de 3 semaines constatée sur l’accessibilité numérique.',
    deliverables: ['Rapport d’audit RGAA tiers', 'Correctifs accessibilité', 'Homologation d’ouverture'],
    raci: { r: 'Lead Tech Front & Qualité', a: 'Directeur de Programme', c: 'Cabinet RGAA & PMO', i: 'Utilisateurs RH' },
  },
  {
    id: 'm5',
    code: 'J5',
    name: 'Bascule & Clôture Décommissionnement',
    targetDate: '15 Décembre',
    status: 'PLANNED',
    delayWeeks: 0,
    criticalPath: false,
    comment: 'Conditionné par le calendrier de retrait des outils legacy.',
    deliverables: ['Arrêt contractuel des serveurs', 'Rapport d’archivage légal', 'Bilan financier de clôture'],
    raci: { r: 'Resp. Décommissionnement SI', a: 'Sponsor Groupe', c: 'Achats IT & Juridique', i: 'Comité de Direction' },
  },
];

export const BASELINE_RISKS: RiskItem[] = [
  {
    id: 'r1',
    code: 'R-01',
    title: 'Accessibilité & Audit RGAA non conforme',
    category: 'CONFORMITE',
    severity: 'CRITIQUE',
    probability: 'FORTE',
    impactDescription: 'Blocage juridique et dégradation de l’expérience collaborateur sur la nouvelle page d’accueil.',
    mitigation: 'Arbitrage requis : renfort d’experts accessibilité pour corriger les composants avant déploiement.',
    impactScore: 5,
    probabilityScore: 4,
    owner: 'Lead Tech Front & Qualité Web',
  },
  {
    id: 'r2',
    code: 'R-02',
    title: 'Surcoût double run des applications historiques',
    category: 'FINANCE',
    severity: 'MODERE',
    probability: 'MOYENNE',
    impactDescription: 'Poursuite des coûts de maintenance et licences anciennes si le décommissionnement traîne.',
    mitigation: 'Accélération de la bascule sur les applications ayant déjà validé la reprise de données.',
    impactScore: 3,
    probabilityScore: 4,
    owner: 'Resp. Décommissionnement SI',
  },
  {
    id: 'r3',
    code: 'R-03',
    title: 'Dérive charge prestataire connecteurs SIRH',
    category: 'TECH',
    severity: 'MODERE',
    probability: 'MOYENNE',
    impactDescription: 'Dépassement du forfait initial sur les flux de compétences complexes.',
    mitigation: 'Gel des avenants non prioritaires et renégociation du reste à faire.',
    impactScore: 4,
    probabilityScore: 3,
    owner: 'Resp. Achats Prestations IT',
  },
  {
    id: 'r4',
    code: 'R-04',
    title: 'Disponibilité des référents métiers RH',
    category: 'METIER',
    severity: 'MAITRISE',
    probability: 'FAIBLE',
    impactDescription: 'Risque de latence sur les validations de recettes fonctionnelles.',
    mitigation: 'Planning de mobilisation RH verrouillé et validé avec la direction des ressources.',
    impactScore: 2,
    probabilityScore: 2,
    owner: 'Chef de Projet Métier RH',
  },
  {
    id: 'r5',
    code: 'R-05',
    title: 'Dimensionnement infrastructure & Sécurité',
    category: 'TECH',
    severity: 'MAITRISE',
    probability: 'FAIBLE',
    impactDescription: 'Pics de charge lors de l’ouverture nationale de la campagne carrière.',
    mitigation: 'Tests de montée en charge et homologation sécurité RSSI finalisés avec succès.',
    impactScore: 2,
    probabilityScore: 1,
    owner: 'Architecte SI & RSSI',
  },
];

export const BASELINE_APPS: LegacyApp[] = [
  {
    id: 'app1',
    code: 'APP-LEGACY-01',
    name: 'Annuaire CV Ancien',
    role: 'Recherche profils & historiques postes',
    status: 'RETIREE',
    annualRunCost: 45000,
    savingsRealized: true,
    dependencies: 'Données archivées dans le coffre-fort RH centralisé.',
  },
  {
    id: 'app2',
    code: 'APP-LEGACY-02',
    name: 'Bilan Pro Legacy',
    role: 'Entretiens professionnels annuels',
    status: 'PRETE',
    annualRunCost: 60000,
    savingsRealized: false,
    dependencies: 'Recette miroir validée. En attente d’arbitrage COPIL pour coupure définitive.',
  },
  {
    id: 'app3',
    code: 'APP-LEGACY-03',
    name: 'Gestionnaire Mobilité V2',
    role: 'Diffusion des offres internes',
    status: 'EN_ANALYSE',
    annualRunCost: 35000,
    savingsRealized: false,
    dependencies: 'Dépendance flux paie et conventions collectives territoriales en cours d’audit.',
  },
  {
    id: 'app4',
    code: 'APP-LEGACY-04',
    name: 'Portail Évaluation Antérieur',
    role: 'Grilles de compétences 2018-2022',
    status: 'EN_ANALYSE',
    annualRunCost: 20000,
    savingsRealized: false,
    dependencies: 'Purge réglementaire RGPD et conversion de format en cours.',
  },
];

export function computeMetricTrends(params: {
  estimatedAtCompletion: number;
  maxDelayWeeks: number;
  criticalRisksCount: number;
  realizedAnnualSavings: number;
}): MetricTrends {
  const BASELINE_EAC = 1260000;
  const BASELINE_DELAY = 3;
  const BASELINE_CRITICAL_RISKS = 1;
  const BASELINE_SAVINGS = 45000;

  // 1. Budget : une baisse de coût est favorable.
  const costDiff = params.estimatedAtCompletion - BASELINE_EAC;
  let budgetTrend: MetricTrend;
  if (costDiff < 0) {
    budgetTrend = {
      type: 'IMPROVED',
      direction: 'down',
      label: `${costDiff / 1000} k€`,
      tooltip: `Coût final réduit de ${Math.abs(costDiff) / 1000} k€ vs référence initiale (1 260 k€)`,
    };
  } else if (costDiff > 0) {
    budgetTrend = {
      type: 'DEGRADED',
      direction: 'up',
      label: `+${costDiff / 1000} k€`,
      tooltip: `Surcoût prévisionnel de +${costDiff / 1000} k€ vs référence initiale (1 260 k€)`,
    };
  } else {
    budgetTrend = {
      type: 'NEUTRAL',
      direction: 'same',
      label: 'Réf. initiale',
      tooltip: 'Niveau budgétaire initial du scénario de référence (1 260 k€)',
    };
  }

  // 2. Délais : une baisse du retard est favorable.
  const delayDiff = params.maxDelayWeeks - BASELINE_DELAY;
  let scheduleTrend: MetricTrend;
  if (delayDiff < 0) {
    scheduleTrend = {
      type: 'IMPROVED',
      direction: 'down',
      label: `${delayDiff} sem.`,
      tooltip: `Dérive planning résorbée de ${Math.abs(delayDiff)} semaine(s) vs référence initiale`,
    };
  } else if (delayDiff > 0) {
    scheduleTrend = {
      type: 'DEGRADED',
      direction: 'up',
      label: `+${delayDiff} sem.`,
      tooltip: `Dérive planning accrue de +${delayDiff} semaine(s) vs référence initiale`,
    };
  } else {
    scheduleTrend = {
      type: 'NEUTRAL',
      direction: 'same',
      label: 'Réf. (+3 sem.)',
      tooltip: 'Délai inchangé par rapport à la référence initiale (+3 semaines)',
    };
  }

  // 3. Risques : moins de risques critiques est favorable.
  const riskDiff = params.criticalRisksCount - BASELINE_CRITICAL_RISKS;
  let risksTrend: MetricTrend;
  if (riskDiff < 0) {
    risksTrend = {
      type: 'IMPROVED',
      direction: 'down',
      label: '-1 critique',
      tooltip: 'Risque critique d’accessibilité RGAA levé vs référence initiale',
    };
  } else if (riskDiff > 0) {
    risksTrend = {
      type: 'DEGRADED',
      direction: 'up',
      label: `+${riskDiff} critique`,
      tooltip: `Risques critiques accrus (+${riskDiff})`,
    };
  } else {
    risksTrend = {
      type: 'NEUTRAL',
      direction: 'same',
      label: 'Réf. (1 critique)',
      tooltip: 'Niveau de risque critique inchangé par rapport à la référence',
    };
  }

  // 4. Décommissionnement : des économies réalisées plus élevées sont favorables.
  const savingsDiff = params.realizedAnnualSavings - BASELINE_SAVINGS;
  let decommissioningTrend: MetricTrend;
  if (savingsDiff > 0) {
    decommissioningTrend = {
      type: 'IMPROVED',
      direction: 'up',
      label: `+${savingsDiff / 1000} k€/an`,
      tooltip: `+${savingsDiff / 1000} k€/an d’économies récurrentes débloquées immédiatement`,
    };
  } else if (savingsDiff < 0) {
    decommissioningTrend = {
      type: 'DEGRADED',
      direction: 'down',
      label: `-${Math.abs(savingsDiff) / 1000} k€/an`,
      tooltip: 'Économies récurrentes réduites vs référence',
    };
  } else {
    decommissioningTrend = {
      type: 'NEUTRAL',
      direction: 'same',
      label: 'Réf. (45 k€/an)',
      tooltip: 'Économies constatées inchangées par rapport à la référence',
    };
  }

  return {
    budget: budgetTrend,
    schedule: scheduleTrend,
    risks: risksTrend,
    decommissioning: decommissioningTrend,
  };
}

export interface WhatIfParams {
  rgaaBudgetK: number; // de 0 à 40 k€
  decommissionedCount: number; // de 1 à 4 applications
  vendorRenegotiationK: number; // de -40 à +20 k€
}

export const DEFAULT_WHATIF_PARAMS: WhatIfParams = {
  rgaaBudgetK: 25,
  decommissionedCount: 2,
  vendorRenegotiationK: -20,
};

export function computeProgramState(
  decision: DecisionId,
  whatIfParams?: WhatIfParams
): ProgramState {
  if (decision === 'custom-whatif') {
    return computeWhatIfState(whatIfParams || DEFAULT_WHATIF_PARAMS);
  }

  const initialBudget = 1200000;
  const actualSpend = 740000;

  if (decision === 'option-a') {
    // OPTION A — Prioriser l'accessibilité
    const estimatedAtCompletion = 1285000;
    const varianceAmount = estimatedAtCompletion - initialBudget; // +85 000 € (+7.1%)
    const variancePercent = Number(((varianceAmount / initialBudget) * 100).toFixed(1));

    const milestones: Milestone[] = BASELINE_MILESTONES.map((m) => {
      if (m.code === 'J4') {
        return {
          ...m,
          status: 'COMPLETED' as const,
          delayWeeks: 0,
          comment: 'Sécurisé : conformité RGAA atteinte grâce au renfort d’experts dédiés.',
        };
      }
      return m;
    });

    const risks: RiskItem[] = BASELINE_RISKS.map((r) => {
      if (r.code === 'R-01') {
        return {
          ...r,
          severity: 'MAITRISE' as const,
          impactDescription: 'Risque levé : conformité RGAA validée par le cabinet tiers.',
          mitigation: 'Composants audités et validés par l’équipe d’experts dédiée.',
        };
      }
      return r;
    });

    return {
      decisionId: 'option-a',
      decisionName: 'Option A — Prioriser l’accessibilité',
      trends: computeMetricTrends({
        estimatedAtCompletion,
        maxDelayWeeks: 0,
        criticalRisksCount: 0,
        realizedAnnualSavings: 45000,
      }),
      initialBudget,
      actualSpend,
      estimatedAtCompletion,
      varianceAmount,
      variancePercent,
      budgetStatus: 'VIGILANCE',
      budgetTrend: '+25 k€ additionnels pour sécuriser l’accessibilité',
      milestones,
      completedMilestonesCount: 4,
      atRiskMilestonesCount: 0,
      plannedMilestonesCount: 1,
      maxDelayWeeks: 0,
      scheduleStatus: 'MAITRISE',
      risks,
      criticalRisksCount: 0,
      moderateRisksCount: 2,
      controlledRisksCount: 3,
      risksStatus: 'MAITRISE',
      legacyApps: BASELINE_APPS,
      decommissionedCount: 1,
      readyCount: 1,
      analyzingCount: 2,
      realizedAnnualSavings: 45000,
      pendingAnnualSavings: 115000,
      decommissioningStatus: 'A_ACCELERER',
      globalHealth: 'VIGILANCE', // Dépassement du budget initial de 7,1 %.
      weatherSummary: 'Jalons et conformité sécurisés · Tension budgétaire accrue (+7,1 %)',
      executiveSummary: 'L’arbitrage en faveur de l’accessibilité lève le blocage critique sur le jalon 4, au prix d’un dépassement budgétaire de +25 k€ à régulariser en comité d’engagement.',
      copilSlide: {
        situation: 'Non-conformités RGAA bloquantes sur le portail collaborateur risquant d’entraîner 3 semaines de dérive et un risque d’exclusion des utilisateurs.',
        impact: 'Surcoût ponctuel estimé à +25 000 € (experts accessibilité), mais annulation intégrale du retard de 3 semaines sur le jalon J4.',
        recommendation: 'Valider l’enveloppe de renfort pour garantir la conformité légale, l’image de marque employeur et la date de livraison cible.',
        nextAction: {
          action: 'Contractualiser le renfort accessibilité et caler les revues d’audit de recette.',
          owner: 'Lead Tech Front & Responsable Recette RH',
          deadline: 'Vendredi S+1 (J+7)',
        },
      },
      hypotheses: [
        'Intervention immédiate de 2 consultants seniors spécialistes RGAA pendant 3 semaines.',
        'Périmètre fonctionnel préservé sans régression sur les autres modules RH.',
        'Nécessité de justifier +25 k€ d’avenant budgétaire en commission d’arbitrage financier.',
      ],
      residualRisks: [
        'Tension résiduelle sur la ligne budgétaire globale (marge de réserve consommée).',
        'Charge accrue sur l’équipe de développement interne pour intégrer les correctifs graphiques.',
      ],
    };
  }

  if (decision === 'option-b') {
    // OPTION B — Accélérer le décommissionnement
    const estimatedAtCompletion = 1275000;
    const varianceAmount = estimatedAtCompletion - initialBudget; // +75 000 € (+6.25%)
    const variancePercent = Number(((varianceAmount / initialBudget) * 100).toFixed(1));

    const updatedApps: LegacyApp[] = BASELINE_APPS.map((app) => {
      if (app.code === 'APP-LEGACY-02') {
        return {
          ...app,
          status: 'RETIREE' as const,
          savingsRealized: true,
          dependencies: 'Coupure validée en COPIL anticipé. Données migrées vers le socle unifié.',
        };
      }
      return app;
    });

    const risks: RiskItem[] = BASELINE_RISKS.map((r) => {
      if (r.code === 'R-02') {
        return {
          ...r,
          severity: 'MAITRISE' as const,
          impactDescription: 'Risque maîtrisé : coupure de Bilan Pro Legacy actée, arrêt immédiat des licences.',
          mitigation: 'Arrêt contractuel au 31/10 notifié à l’éditeur historique.',
        };
      }
      return r;
    });

    return {
      decisionId: 'option-b',
      decisionName: 'Option B — Accélérer le décommissionnement',
      trends: computeMetricTrends({
        estimatedAtCompletion,
        maxDelayWeeks: 3,
        criticalRisksCount: 1,
        realizedAnnualSavings: 105000,
      }),
      initialBudget,
      actualSpend,
      estimatedAtCompletion,
      varianceAmount,
      variancePercent,
      budgetStatus: 'VIGILANCE',
      budgetTrend: '+15 k€ de transition amortis en 3 mois par 60 k€/an d’économies récurrentes',
      milestones: BASELINE_MILESTONES,
      completedMilestonesCount: 3,
      atRiskMilestonesCount: 1, // Le jalon J4 reste sous surveillance.
      plannedMilestonesCount: 1,
      maxDelayWeeks: 3,
      scheduleStatus: 'VIGILANCE',
      risks,
      criticalRisksCount: 1, // R-01 RGAA still critical
      moderateRisksCount: 1,
      controlledRisksCount: 3,
      risksStatus: 'CRITIQUE',
      legacyApps: updatedApps,
      decommissionedCount: 2,
      readyCount: 0,
      analyzingCount: 2,
      realizedAnnualSavings: 105000, // 45k + 60k
      pendingAnnualSavings: 55000,
      decommissioningStatus: 'EN_TRAJECTOIRE',
      globalHealth: 'VIGILANCE',
      weatherSummary: 'Excellente opération ROI récurrente (+60 k€/an) · Dérive RGAA non résolue',
      executiveSummary: 'Le retrait anticipé de Bilan Pro Legacy débloque 60 000 € d’économies annuelles pérennes, mais le sujet accessibilité sur le jalon 4 reste entier.',
      copilSlide: {
        situation: 'Application historique Bilan Pro prête au décommissionnement mais maintenant un coût de licence inutile de 5 000 € par mois d’attente.',
        impact: 'Coût ponctuel de bascule accélérée (+15 000 €), générant 60 000 € d’économies nettes récurrentes par an (retour sur investissement en 3 mois).',
        recommendation: 'Acter immédiatement la coupure définitive de l’application historique pour assainir le paysage applicatif et optimiser l’OPEX.',
        nextAction: {
          action: 'Déclencher la procédure de résiliation éditeur et ouvrir la cellule d’assistance utilisateur 15 jours.',
          owner: 'Responsable Décommissionnement SI & Achats IT',
          deadline: 'Fin de mois en cours (M)',
        },
      },
      hypotheses: [
        'Validation formelle de l’archivage des données d’entretiens conformément aux obligations légales.',
        'Mise en place d’une hotline dédiée aux gestionnaires RH durant les 2 semaines post-bascule.',
        'Aucun impact direct sur le calendrier du portail web (l’accessibilité reste à traiter séparément).',
      ],
      residualRisks: [
        'Sollicitation accrue du support RH de proximité en cas d’interrogation sur les anciens formulaires.',
        'Le risque critique d’accessibilité (R-01) demeure actif sur le portail cible.',
      ],
    };
  }

  if (decision === 'option-c') {
    // OPTION C — Renforcer le pilotage financier
    const estimatedAtCompletion = 1220000;
    const varianceAmount = estimatedAtCompletion - initialBudget; // +20 000 € (+1.7%)
    const variancePercent = Number(((varianceAmount / initialBudget) * 100).toFixed(1));

    const milestones: Milestone[] = BASELINE_MILESTONES.map((m) => {
      if (m.code === 'J4') {
        return {
          ...m,
          delayWeeks: 4,
          comment: 'Dérive portée à 4 semaines : gel temporaire des avenants et renégociation du reste à faire.',
        };
      }
      return m;
    });

    const risks: RiskItem[] = BASELINE_RISKS.map((r) => {
      if (r.code === 'R-03') {
        return {
          ...r,
          severity: 'MAITRISE' as const,
          impactDescription: 'Maîtrisé : forfaits prestataires renégociés et suivi des engagements sous contrôle.',
          mitigation: 'Revue budgétaire bi-hebdomadaire et plafond contractuel ferme.',
        };
      }
      return r;
    });

    return {
      decisionId: 'option-c',
      decisionName: 'Option C — Renforcer le pilotage financier',
      trends: computeMetricTrends({
        estimatedAtCompletion,
        maxDelayWeeks: 4,
        criticalRisksCount: 1,
        realizedAnnualSavings: 45000,
      }),
      initialBudget,
      actualSpend,
      estimatedAtCompletion,
      varianceAmount,
      variancePercent,
      budgetStatus: 'MAITRISE', // Un dépassement de 1,7 % reste dans la zone maîtrisée.
      budgetTrend: '-40 k€ d’économies sur le coût final par rationalisation du reste à faire',
      milestones,
      completedMilestonesCount: 3,
      atRiskMilestonesCount: 1,
      plannedMilestonesCount: 1,
      maxDelayWeeks: 4,
      scheduleStatus: 'CRITIQUE', // Quatre semaines de retard constituent une situation critique.
      risks,
      criticalRisksCount: 1, // R-01 still critical
      moderateRisksCount: 1,
      controlledRisksCount: 3,
      risksStatus: 'CRITIQUE',
      legacyApps: BASELINE_APPS,
      decommissionedCount: 1,
      readyCount: 1,
      analyzingCount: 2,
      realizedAnnualSavings: 45000,
      pendingAnnualSavings: 115000,
      decommissioningStatus: 'A_ACCELERER',
      globalHealth: 'VIGILANCE',
      weatherSummary: 'Discipline budgétaire rétablie (+1,7 %) · Compromis sur le calendrier (+1 sem.)',
      executiveSummary: 'L’arbitrage budgétaire sécurise l’enveloppe financière sous le seuil d’alerte (+1,7 %), mais allonge la dérive de recette d’une semaine supplémentaire.',
      copilSlide: {
        situation: 'Dérive progressive des coûts prestataires sur les connecteurs d’intégration et cumul de demandes hors périmètre.',
        impact: 'Économie de 40 000 € sur le coût final estimé (EAC ramené à 1 220 000 €), avec un impact planning de +1 semaine pour réalignement des équipes.',
        recommendation: 'Acter le gel des fonctionnalités secondaires et imposer un suivi strict à l’engagement pour préserver la rentabilité globale.',
        nextAction: {
          action: 'Signer l’avenant de cadrage forfaitaire et notifier les équipes métiers du report des demandes non essentielles en V2.',
          owner: 'PMO & Responsable Achats Prestations IT',
          deadline: 'Mercredi prochain (J+5)',
        },
      },
      hypotheses: [
        'Report des 5 demandes d’évolution ergonomiques mineures sur un lot V2 post-lancement.',
        'Engagement ferme du prestataire sur un forfait d’achèvement sans facturation d’heures supplémentaires.',
        'Maintien d’un tableau de bord d’engagements actualisé chaque lundi matin.',
      ],
      residualRisks: [
        'Frustration possible de certains utilisateurs RH suite au décalage de fonctionnalités secondaires.',
        'Calendrier plus tendu pour la bascule de fin d’année avec 4 semaines de décalage sur J4.',
      ],
    };
  }

  // Référence du programme, sans arbitrage supplémentaire.
  const estimatedAtCompletion = 1260000;
  const varianceAmount = estimatedAtCompletion - initialBudget; // +60 000 € (+5.0%)
  const variancePercent = Number(((varianceAmount / initialBudget) * 100).toFixed(1));

  return {
    decisionId: 'none',
    decisionName: 'Situation Actuelle (Sans arbitrage)',
    trends: computeMetricTrends({
      estimatedAtCompletion,
      maxDelayWeeks: 3,
      criticalRisksCount: 1,
      realizedAnnualSavings: 45000,
    }),
    initialBudget,
    actualSpend,
    estimatedAtCompletion,
    varianceAmount,
    variancePercent,
    budgetStatus: 'VIGILANCE',
    budgetTrend: 'Dérive prévisionnelle de +60 k€ (+5,0 %) nécessitant un arbitrage',
    milestones: BASELINE_MILESTONES,
    completedMilestonesCount: 3,
    atRiskMilestonesCount: 1,
    plannedMilestonesCount: 1,
    maxDelayWeeks: 3,
    scheduleStatus: 'VIGILANCE',
    risks: BASELINE_RISKS,
    criticalRisksCount: 1,
    moderateRisksCount: 2,
    controlledRisksCount: 2,
    risksStatus: 'CRITIQUE',
    legacyApps: BASELINE_APPS,
    decommissionedCount: 1,
    readyCount: 1,
    analyzingCount: 2,
    realizedAnnualSavings: 45000,
    pendingAnnualSavings: 115000,
    decommissioningStatus: 'A_ACCELERER',
    globalHealth: 'VIGILANCE',
    weatherSummary: 'Programme sous vigilance · Écart budgétaire (+5,0 %) et jalon RGAA à arbitrer',
    executiveSummary: 'Le programme progresse, mais l’écart budgétaire prévisionnel (+60 k€) et un jalon sensible (RGAA à +3 sem.) nécessitent un arbitrage rapide des sponsors.',
    copilSlide: {
      situation: 'Trois alertes concomitantes : non-conformité RGAA bloquante sur le portail, retard de coupure de l’outil historique Bilan Pro, et dépassement de charge prestataire.',
      impact: 'Coût final prévisionnel en dépassement de +60 000 € (+5,0 %) et risque de dérive calendrier de 3 semaines sur le déploiement général.',
      recommendation: 'Sélectionner l’un des trois leviers d’arbitrage proposés par le PMO pour restaurer la trajectoire du programme selon les priorités du comité.',
      nextAction: {
        action: 'Soumettre les trois options d’arbitrage en séance pour décision immédiate du Sponsor.',
        owner: 'Chef de Projet / PMO MaCarrière',
        deadline: 'Fin de séance COPIL',
      },
    },
    hypotheses: [
      'Projection de coût final basée sur la vélocité actuelle et les devis en cours.',
      'Risque critique RGAA sans plan de remédiation contractuel à date.',
      'Frais de maintien de l’ancienne application continuant de courir chaque mois.',
    ],
    residualRisks: [
      'Risque de cumul des dérives si aucun arbitrage n’est rendu sous 15 jours.',
      'Démobilisation potentielle des équipes projet en l’absence de priorité claire.',
    ],
  };
}

export function computeWhatIfState(params: WhatIfParams): ProgramState {
  const initialBudget = 1200000;
  const actualSpend = 740000;

  // Les retraits supplémentaires occasionnent un coût de transition.
  const transitionCost = params.decommissionedCount >= 2 ? (params.decommissionedCount - 1) * 15000 : 0;
  
  // Estimation du coût total à terminaison (EAC).
  const estimatedAtCompletion = 1260000 
    + (params.rgaaBudgetK * 1000) 
    + (params.vendorRenegotiationK * 1000) 
    + transitionCost;
  
  const varianceAmount = estimatedAtCompletion - initialBudget;
  const variancePercent = Number(((varianceAmount / initialBudget) * 100).toFixed(1));

  // Le retard dépend de l’effort RGAA et de la renégociation fournisseur.
  const rgaaDelayWeeks = params.rgaaBudgetK >= 25 ? 0 : params.rgaaBudgetK >= 15 ? 1 : params.rgaaBudgetK >= 8 ? 2 : 3;
  const vendorDelayWeeks = params.vendorRenegotiationK <= -20 ? 1 : 0;
  const maxDelayWeeks = rgaaDelayWeeks + vendorDelayWeeks;

  // Les économies dépendent du nombre d’applications retirées.
  const savingsTable = [45000, 105000, 140000, 160000];
  const realizedAnnualSavings = savingsTable[Math.min(params.decommissionedCount, 4) - 1];
  const pendingAnnualSavings = 160000 - realizedAnnualSavings;

  // Jalons
  const milestones = BASELINE_MILESTONES.map((m) => {
    if (m.code === 'J4') {
      return {
        ...m,
        status: maxDelayWeeks === 0 ? ('COMPLETED' as const) : ('AT_RISK' as const),
        delayWeeks: maxDelayWeeks,
        comment: maxDelayWeeks === 0
          ? 'Conforme : accessibilité sécurisée par le budget alloué.'
          : `Dérive de ${maxDelayWeeks} sem. sous les paramètres What-If actuels.`,
      };
    }
    return m;
  });

  // Risques
  const criticalRisksCount = params.rgaaBudgetK >= 25 ? 0 : 1;
  const moderateRisksCount = params.decommissionedCount >= 2 ? 1 : 2;
  const controlledRisksCount = 5 - (criticalRisksCount + moderateRisksCount);

  const risks = BASELINE_RISKS.map((r) => {
    if (r.code === 'R-01') {
      const isMaitrise = params.rgaaBudgetK >= 25;
      return {
        ...r,
        severity: isMaitrise ? ('MAITRISE' as const) : ('CRITIQUE' as const),
        impactScore: isMaitrise ? 2 : 5,
        probabilityScore: isMaitrise ? 1 : 4,
      };
    }
    if (r.code === 'R-02' && params.decommissionedCount >= 2) {
      return {
        ...r,
        severity: 'MAITRISE' as const,
        impactScore: 1,
        probabilityScore: 1,
      };
    }
    if (r.code === 'R-03' && params.vendorRenegotiationK <= -20) {
      return {
        ...r,
        severity: 'MAITRISE' as const,
        impactScore: 2,
        probabilityScore: 2,
      };
    }
    return r;
  });

  // Applications historiques
  const legacyApps = BASELINE_APPS.map((app, idx) => ({
    ...app,
    status: idx < params.decommissionedCount ? ('RETIREE' as const) : idx === params.decommissionedCount ? ('PRETE' as const) : ('EN_ANALYSE' as const),
    savingsRealized: idx < params.decommissionedCount,
  }));

  const budgetStatus: HealthStatus = variancePercent <= 2 ? 'MAITRISE' : variancePercent <= 6 ? 'VIGILANCE' : 'CRITIQUE';
  const scheduleStatus: HealthStatus = maxDelayWeeks === 0 ? 'MAITRISE' : maxDelayWeeks <= 3 ? 'VIGILANCE' : 'CRITIQUE';
  const globalHealth: HealthStatus = (criticalRisksCount > 0 || budgetStatus === 'CRITIQUE' || scheduleStatus === 'CRITIQUE') ? 'CRITIQUE' : (budgetStatus === 'VIGILANCE' || scheduleStatus === 'VIGILANCE') ? 'VIGILANCE' : 'MAITRISE';

  return {
    decisionId: 'custom-whatif',
    decisionName: `What-If Custom (+${params.rgaaBudgetK}k€ RGAA, ${params.decommissionedCount} Apps)`,
    initialBudget,
    actualSpend,
    estimatedAtCompletion,
    varianceAmount,
    variancePercent,
    budgetStatus,
    budgetTrend: `What-If : ajustement net de ${params.rgaaBudgetK + params.vendorRenegotiationK} k€`,
    milestones,
    completedMilestonesCount: maxDelayWeeks === 0 ? 4 : 3,
    atRiskMilestonesCount: maxDelayWeeks === 0 ? 0 : 1,
    plannedMilestonesCount: 1,
    maxDelayWeeks,
    scheduleStatus,
    risks,
    criticalRisksCount,
    moderateRisksCount,
    controlledRisksCount,
    risksStatus: criticalRisksCount === 0 ? 'MAITRISE' : 'CRITIQUE',
    legacyApps,
    decommissionedCount: params.decommissionedCount,
    readyCount: params.decommissionedCount < 4 ? 1 : 0,
    analyzingCount: Math.max(0, 4 - params.decommissionedCount - 1),
    realizedAnnualSavings,
    pendingAnnualSavings,
    decommissioningStatus: params.decommissionedCount >= 2 ? 'EN_TRAJECTOIRE' : 'A_ACCELERER',
    globalHealth,
    weatherSummary: `Simulation What-If · EAC ${formatEuro(estimatedAtCompletion)} · Dérive ${maxDelayWeeks} sem.`,
    executiveSummary: `Simulation What-If libre avec ${params.rgaaBudgetK} k€ sur l’accessibilité, ${params.decommissionedCount} app(s) décommissionnée(s) et ${params.vendorRenegotiationK} k€ d'arbitrage prestataire.`,
    copilSlide: {
      situation: `Scénario What-If personnalisé configuré en séance de revue par le sponsor ou le PMO.`,
      impact: `Coût final prévisionnel estimé à ${formatEuro(estimatedAtCompletion)} (${variancePercent >= 0 ? '+' : ''}${variancePercent} %), dérive résiduelle de ${maxDelayWeeks} semaine(s), ${realizedAnnualSavings / 1000} k€/an d'économies récurrentes.`,
      recommendation: `Ce dimensionnement personnalisé permet de tester en direct la sensibilité des compromis budgétaires et temporels.`,
      nextAction: {
        action: 'Présenter la trajectoire simulée et valider l’arbitrage cible avec les parties prenantes.',
        owner: 'PMO & Sponsor Projet',
        deadline: 'Sous 5 jours ouvrés',
      },
    },
    hypotheses: [
      `Allocation de ${params.rgaaBudgetK} k€ sur l’accessibilité numérique.`,
      `Retrait effectif de ${params.decommissionedCount} application(s) historique(s).`,
      `Effort de négociation prestataire de ${params.vendorRenegotiationK} k€.`,
    ],
    residualRisks: [
      maxDelayWeeks > 0 ? `Dérive de planning persistante (${maxDelayWeeks} sem.) à sécuriser.` : 'Planning sous contrôle.',
      variancePercent > 5 ? `Dépassement budgétaire sensible (+${variancePercent} %) à faire approuver en commission.` : 'Budget dans la cible acceptable.',
    ],
    trends: computeMetricTrends({
      estimatedAtCompletion,
      maxDelayWeeks,
      criticalRisksCount,
      realizedAnnualSavings,
    }),
  };
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCopilClipboardText(state: ProgramState): string {
  return `=== SYNTHÈSE COMITÉ DE PILOTAGE — PROGRAMME MACARRIÈRE ===
Réf : Recommandation PMO · Arbitrage Sponsor
Scénario : ${state.decisionName}
Date : Octobre 2026
Auteur : Bruno Moreau — PMO MaCarrière

[1. SITUATION]
${state.copilSlide.situation}

[2. IMPACT SIMULÉ]
${state.copilSlide.impact}
- Coût Final Estimé (EAC) : ${formatEuro(state.estimatedAtCompletion)} (Écart : ${state.variancePercent >= 0 ? '+' : ''}${state.variancePercent} % / ${formatEuro(state.varianceAmount)})
- Dérive calendaire max : ${state.maxDelayWeeks === 0 ? 'Aucune (Délais tenus)' : `+${state.maxDelayWeeks} semaines`}
- Risques résiduels : ${state.criticalRisksCount} critique(s), ${state.moderateRisksCount} modéré(s), ${state.controlledRisksCount} maîtrisé(s)
- Économies décommissionnement : ${formatEuro(state.realizedAnnualSavings)} / an constatées (${formatEuro(state.pendingAnnualSavings)} / an en attente)

[3. RECOMMANDATION PMO]
${state.copilSlide.recommendation}

[4. PROCHAINE ACTION IMMÉDIATE]
Action : ${state.copilSlide.nextAction.action}
Responsable : ${state.copilSlide.nextAction.owner}
Échéance : ${state.copilSlide.nextAction.deadline}

---
Note : Étude de cas indépendante et données de simulation PMO.`;
}
