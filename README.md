# MaCarrière — PMO Decision Lab

**Étude de cas interactive conçue et présentée par Bruno Moreau.**

Un simulateur de pilotage de programme qui permet de comparer plusieurs arbitrages, d'en lire les conséquences sur le budget, les délais, les risques et les économies, puis de préparer une recommandation pour un comité de pilotage (COPIL).

> Ce portfolio est un exercice personnel. Les indicateurs, scénarios, montants, applications et jalons sont fictifs. Il n'utilise aucune donnée interne ni aucun livrable officiel du groupe mentionné dans l'étude de cas.

## Ce qu'on peut explorer

- **Cockpit de pilotage** : santé globale du programme, jalons, budget, risques et décommissionnement.
- **Trois arbitrages** : accessibilité, accélération du retrait des applications, maîtrise budgétaire.
- **Simulation libre** : ajustement de trois leviers, avec recalcul immédiat des indicateurs.
- **Lecture des risques** : matrice de criticité 5 × 5 et détail des mesures de maîtrise.
- **Restitution COPIL** : synthèse de décision copiable ou téléchargeable au format texte.
- **Visite guidée** : parcours rapide conçu pour présenter l'étude de cas à un recruteur.

## Démarrage en local

**Prérequis :** Node.js 22 ou version compatible avec Vite 8, et npm.

```bash
npm install
npm run dev
```

Ouvrir l'adresse indiquée par Vite (généralement `http://localhost:5173`). Aucun compte, service distant ni clé API ne sont nécessaires.

## Contrôles avant publication

```bash
npm run typecheck
npm test
npm run build
```

La commande `npm run check` enchaîne ces vérifications.

## Organisation du code

```text
src/
├── App.tsx                   # Composition de la page et gestion de l'état
├── domain/
│   ├── pmoModel.ts          # Règles métier et scénarios de simulation
│   ├── pmoModel.test.ts     # Tests des principales hypothèses chiffrées
│   └── decisionStorage.ts   # Sauvegarde locale des scénarios
└── components/
    ├── navigation/          # Navigation, visite guidée, pied de page
    ├── pilotage/            # Cockpit, indicateurs et matrice des risques
    ├── arbitrages/          # Comparaison des options et simulateur libre
    └── restitution/         # Synthèse COPIL et présentation de la méthode
```

Le modèle de calcul est séparé des composants d'interface. La simulation est déterministe : les mêmes paramètres produisent toujours les mêmes résultats. Le choix de scénario est sauvegardé dans le navigateur via `localStorage`.

## Démarche et limites

Le projet met en scène un programme de transformation RH avec une contrainte de mise en conformité, un calendrier de livraison et des applications historiques à retirer. Son objectif est de **rendre visibles les compromis** : une amélioration du planning ou du niveau de risque peut avoir un coût, tandis qu'une économie immédiate peut créer un retard.

Les données sont **illustratives et non prévisionnelles**. Les formules et les hypothèses sont détaillées dans [docs/METHODOLOGIE.md](docs/METHODOLOGIE.md), et les choix de structure dans [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## À propos

**Bruno Moreau** — Conception du cas pratique, structuration des scénarios d'arbitrage et présentation du démonstrateur PMO.

Cette réalisation est indépendante de l'entreprise dont les missions publiques ont inspiré le contexte du cas. Elle ne constitue ni un projet officiel ni une prestation effectuée pour cette entreprise.

## Licence

Code distribué selon la licence Apache-2.0 ; voir [LICENSE](LICENSE). Les dépendances tierces conservent leurs propres licences.
