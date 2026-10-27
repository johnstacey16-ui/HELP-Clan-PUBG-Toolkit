# Visible artwork and unified calculator workspaces

Owner request: display the proper pictures, stack sensitivity tools, compare current sensitivity speeds, add over-the-shoulder Aim, group armour advice and merge Hit Zones / Range / TTK.

- [x] Make weapon, scope, attachment, equipment, supply and comparison pictures visible in their tool; remove artwork toggles and art disclosures.
- [x] Show weapon pictures directly in database rows and in the weapon gallery.
- [x] Keep inactive tools from downloading their media on the Scope landing screen.
- [x] Stack Scope Matcher, Vertical Multiplier and Resolution with yellow downward jump links.
- [x] Add instructions and eight current-sensitivity inputs with independent px/s and reference selection.
- [x] Add Aim above 1x, using the owner's 15x constants: A=53, B=0.2 and the same calibration range.
- [x] Group equipment imagery, durability check, crossover table, threshold explanation and reality check in the Armour & Durability Guide; remove the redundant database jump link.
- [x] Combine the model, exact distance, armour and body-area selection with Range and TTK under Combat Lab; preserve legacy Range / TTK links.
- [x] Add model TTK display using the existing 100 HP / maximum-fire-rate calculation. Unknown shotgun whole-shell TTK stays unknown.
- [x] Pass unit, real-browser and responsive checks; review updated screenshots.
  - 185 unit checks, generated source, browser interactions, all image decoding, cold image budget and hit-zone geometry passed.
  - Responsive checks passed at 320, 360, 390, 768, 1280 and 1440px.
  - CI run `40474282430`, tested head `5bc5510c04e76d31a3a3886f4d680b1fa55575ef`; reviewed phone/desktop captures, including the compact model controls and visible image libraries.
- [x] Merge and verify the production site.
  - PR #49 merged as `2237247187783f148e165f5e6af058c188527d16`.
  - Fresh production browser verified all three sensitivity regions, eight current-setting inputs and the Aim option. Aim and 15x at sensitivity 10 both showed 4347 px/s.
  - Live Combat Lab at M416 / 0m / no armour showed 44.0 chest damage and 0.17 seconds in both model TTK mode and the shared timing results.
  - Production: https://help-clan-pubg-toolkit.vercel.app/

The model portrait, hit-zone geometry, weapon records, damage checkpoints, existing sensitivity constants and conversion formulas stay unchanged. New Aim constants are explicitly owner supplied. Pixel speeds use the existing 3840-pixel reference width, not a measurement of the visitor's screen.
