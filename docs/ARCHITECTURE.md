# Organisation technique

L'application est un site React 19 / TypeScript, compilé avec Vite, mis en forme avec Tailwind CSS et visualisé en partie avec Recharts. Aucune donnée n'est envoyée à un serveur.

## Responsabilités

- `src/domain/pmoModel.ts` contient les données de référence fictives et les fonctions qui produisent les états des scénarios. Elles sont indépendantes de React et testables séparément.
- `src/domain/decisionStorage.ts` valide les données restaurées depuis `localStorage` et conserve le scénario et ses trois paramètres dans un même objet.
- `src/components/pilotage/` regroupe les visualisations, les indicateurs détaillés et la matrice des risques.
- `src/components/arbitrages/` porte les interactions permettant de choisir ou comparer les scénarios.
- `src/components/restitution/` génère la synthèse COPIL et présente le cadre du cas pratique.
- `src/components/navigation/` gère les éléments de navigation et la visite guidée.
- `src/App.tsx` relie ces fonctionnalités sans réimplémenter les règles de calcul.

## Choix retenus

Le moteur reste **déterministe** afin qu'un même arbitrage donne les mêmes résultats. La persistance est locale, facultative et validée au chargement. Le site peut être déployé comme application statique après `npm run build`.

## Évolutions possibles

- Centraliser les paramètres métier dans un objet de configuration versionné.
- Ajouter des tests d'interactions et d'accessibilité.
- Extraire les sections les plus volumineuses du cockpit en sous-composants.
- Ajouter un routage si le portfolio s'enrichit de plusieurs études de cas.
