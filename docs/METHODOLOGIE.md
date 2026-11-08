# Hypothèses de l'étude de cas

**Auteur du cas pratique : Bruno Moreau**

Ce simulateur présente un exercice de raisonnement PMO, pas un outil de prévision financière. Tous les montants sont fictifs et ne proviennent pas de données d'entreprise.

## Point de départ

- Budget initial : **1 200 k€** ; dépenses déjà engagées : **740 k€**.
- Coût estimé à terminaison (EAC) : **1 260 k€**, soit **+5 %** du budget initial.
- Cinq jalons au total ; trois terminés, un menacé, un encore planifié.
- Un risque critique initial ; quatre applications historiques, dont une retirée.
- Économies annuelles déjà constatées dans le scénario fictif : **45 k€**.

## Arbitrages prédéfinis

| Arbitrage | Intention | Effet principal présenté |
| --- | --- | --- |
| A — Accessibilité | Renforcer les moyens consacrés au RGAA | Jalon critique sécurisé ; budget estimé en hausse |
| B — Décommissionnement | Retirer plus vite une application historique | Économies annualisées accrues ; coût de transition |
| C — Maîtrise financière | Renégocier des dépenses fournisseurs | EAC réduit ; délai de livraison plus long |

## Simulation libre

Trois paramètres peuvent varier :

1. **Renfort RGAA :** 0 à 40 k€ par pas de 5 k€.
2. **Applications retirées :** 1 à 4 unités.
3. **Variation du forfait prestataires :** -40 à +20 k€ par pas de 10 k€.

L'EAC simulé part de 1 260 k€, auquel s'ajoutent le renfort RGAA, la variation des forfaits et un **coût de transition forfaitaire de 15 k€ par retrait supplémentaire**. Le retard et les risques sont évalués selon des règles discrètes explicitées dans `src/domain/pmoModel.ts`.

Économies annualisées retenues pour 1, 2, 3 ou 4 applications retirées : **45, 105, 140 et 160 k€**. Ces valeurs sont des hypothèses métier du scénario et non des gains mesurés.

## Limites

- Aucun flux de données réelles, aucune API et aucun calcul financier audité.
- Les scores de risques traduisent des hypothèses pédagogiques, pas une certification de conformité.
- Le modèle simplifie les dépendances et ne remplace ni un budget de projet ni un planning de production.
- Le statut global est calculé à partir des indicateurs du scénario ; il doit être interprété comme une illustration d'arbitrage.
