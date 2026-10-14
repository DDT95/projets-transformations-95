# Styles QGIS – logements autorisés / commencés (moyenne annuelle 2023-2026)

Même symbologie que les cartes 2020-2023 / 2020-2022 :
- Gradué sur `moy_total`, classes manuelles < 1 / 1-5 / 5-10 / 10-100 / 100-200 / > 200, palette orange (#fff5eb → #7f2803), opacité 62 %.
- Camemberts `moy_collec` (#77acd3), `moy_indiv` (#bbf1b1), `moy_resid` (#c86f98), taille proportionnelle à `moy_diag` (de 5 mm à 20 par an jusqu’à 14 mm à 500 par an), affichés seulement si `diag` = 1 (`moy_diag` est vide sinon). `moy_diag` vaut `moy_total` seulement si la commune a au moins 20 logements/an ET au moins deux types à 10 % ou plus du total ; sinon 0 et aucun camembert (champ `diag` = 1/0).

Appliquer : clic droit sur la couche → Propriétés → Symbologie → Style → Charger le style…

Textes de mise en page à mettre à jour :
- Titre : « Moyenne annuelle de logements autorisés de 2023 à 2026 par commune dans le Val-d'Oise »
- Titre : « Moyenne annuelle de logements commencés de 2023 à 2026 par commune dans le Val-d'Oise »
- Sources : « IGN-BDCARTO®2018 ; SITADEL2 en Date réelle - données arrêtées à fin août 2026 ; DDT95 »
