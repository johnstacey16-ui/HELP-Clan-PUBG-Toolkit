# Damage guide — design, data and artwork

Reviewed https://pubgstatistics.com/weapons on 27 October 2026 (page identifies PUBG 43.2 and 17 October 2026 data update).

## Useful presentation ideas adopted

- Separate the formula, fixed hit-area factors, class defaults and combined gear factors into four named sections.
- Put values directly beside the corresponding body region on a model, with live SVG leader lines and readable percentage labels.
- Show all seven class profiles together rather than burying factors in optional calculation details.
- Add independent helmet/vest controls, explicit distance exclusion, numeric table equivalents and mobile wrapping.
- Put yellow jump links at the top of Combat Lab and above the guide.

This is an independently implemented interface and original artwork. No source website scripts, styling or portraits were copied.

## Numerical decisions

The requested factor tables already exist in `src/calculators/00-damage-ballistics.part`. A read-only `PT.DAMAGE_GUIDE` adapter exposes them; no class or region factors are replaced. Each new combined label equals the existing class factor × hit-area factor × gear remaining. No distance factor is included in combined diagrams. Class diagrams represent defaults, with Dragunov's ×2.80 head/neck exception explicitly explained; the live formula uses the actual selected weapon exception.

The source prose says five factors but lists base damage plus four multipliers. The guide describes it accurately as base × distance × armour remaining × hit area × class. Distance factor is the existing recorded distance damage divided by the selected base damage; it does not interpolate or extend missing checkpoints. Unknown values remain No data. Pellet shotguns retain unavailable actual whole-shell damage.

The reference's measured rates (e.g. Vector 1110, Groza 740, SLR 320) differ from our extracted or existing rates. Their measured-versus-extracted methodology needs separate reconciliation; this visual upgrade does not overwrite them or re-open the approved MP5K/Vector rate decision. The reference also exposes custom firing cadence, bolt-action ADS timing, additional weapon pages and patch histories; these are research candidates, not silently imported data. We already provide damage/HTK/TTK modes, weapon comparison, equipment selections and exact recorded-distance results.

## Artwork

Fifteen distinct fictional 18-year-old adult fashion portraits were generated with the built-in image generator: one hit-area portrait, seven class portraits and seven combined portraits. Prompts request ordinary fully clothed, non-sexual fashion-catalog poses, opaque fitted evening outfits and clear front views. Source prompts are in `docs/damage-guide-image-prompts.json`. The hit-area portrait received a background cleanup edit to preserve a complete opaque figure against #091722.

Assets live at `assets/damage-*.webp`, encoded to 512×768. Encoding/resizing changes no numerical labels. Total new artwork is approximately 0.5 MB. The total catalogue budget rises from 8 to 9 MiB for the new fifteen assets; the unchanged 64 KiB initial-screen transfer check remains enforced by deferring guide portraits until Combat Lab opens.

Portraits are decorative underlying photographs. Live text, table equivalents and the calculation engine carry the data. Leader lines indicate approximate anatomical areas rather than claiming that fashion photography reproduces PUBG's collision geometry. Left/right limbs share values. The existing approved interactive Model 2 and its hit targets remain intact; the new fifteen portraits belong to the explanatory guide.
