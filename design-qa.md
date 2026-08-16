# Design QA — correction du gabarit Comprendre

- Source visual truth: `/var/folders/3h/px_6bwl96w50x8y34bkz_k_80000gn/T/TemporaryItems/NSIRD_screencaptureui_33Iex1/Capture d’écran 2026-08-16 à 21.21.23.png`
- Implementation screenshot: `/tmp/projets-transformations-95-corrected.png`
- Viewport: 2146 × 914 CSS px
- Source pixels: 2146 × 914, density normalized at 1×
- Implementation pixels: 2146 × 914, density normalized at 1×
- State: initial department view, all project themes and stages visible

## Full-view comparison evidence

The reference and implementation were opened at the same pixel dimensions and compared for header height, logo/title alignment, left-panel width, rounded card geometry, map framing, floating controls, color tokens, type hierarchy and overall density.

## Focused region comparison evidence

- Header: shared 111 px shell, 104 px institutional logo slot, blue uppercase eyebrow, large deep-blue title and secondary descriptor.
- Left rail: 390 px width, 23 px radius, white translucent surface, compact intro/search/filter rhythm and DSFR-blue toggles.
- Map: 25 px rounded container, light CARTO background, top-left blue controls, bottom-right selection count.
- Detail state: verified as a right-side rounded overlay without changing map geometry.

## Comparison history

### Iteration 1

- P1: initial implementation used the compact technical-observatory layout instead of the recent Comprendre template.
- P1: header, sidebar and map were flush to viewport edges with insufficient radius and whitespace.
- P2: synthesis control and filter cards did not match the shared anatomy.

Fixes made:

- Rebased the visual system on `acces-services95` tokens and component proportions.
- Rebuilt the page shell as a 111 px header plus a padded 390 px filter rail and rounded map card.
- Moved map actions into floating controls and restyled filter cards, switches, source note and details panel.

Post-fix evidence: `/tmp/projets-transformations-95-corrected.png`.

## Interaction and runtime QA

- Browser-rendered QA: Codex in-app Browser.
- Search results: passed.
- Project detail open/close: passed.
- Department synthesis dialog open/close: passed.
- Initial visible count: 12.
- Console warnings/errors: none.

## Findings

No actionable P0, P1 or P2 visual mismatch remains. Content naturally differs from the service-accessibility reference because this page represents territorial projects.

### Interaction correction

- A commune without a linked project no longer empties the map; the interface reports the absence while keeping the current projects visible.
- “Recentrer” now resets themes, stages, commune selection, search, details panel, communal styling and department bounds.
- Closing the right-hand project panel applies the same full reset.

### Shared command standard

- “Recentrer” and “Données & évolutions” now use the same two-button block below search as `val-doise-nuisances`.
- The duplicate floating map buttons were removed.
- Map feedback now uses the standard bottom-left status note.

final result: passed

### Enrichissement des données — août 2026

- 14 grands projets, dont 3 opérations ferroviaires SNCF Réseau documentées.
- 183 communes couvertes par une extraction SDES–Sitadel : 2 839 autorisations logements, 19 393 logements déclarés, 1 949 autorisations de locaux et 341 permis d’aménager depuis 2022.
- Les trois familles Sitadel sont activables indépendamment et rendues par un symbole agrégé par commune afin de préserver la lisibilité.
- Fiche communale, synthèse départementale, masquage/affichage et reset testés dans le navigateur.
- Compteur initial : 196 objets cartographiques (14 projets + 182 communes avec au moins une donnée active).
- Console : aucune erreur.

final result: passed
