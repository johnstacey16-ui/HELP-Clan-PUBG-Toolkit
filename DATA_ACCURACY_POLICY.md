# HELP Clan PUBG Toolkit — Data Accuracy Rules

## Core rule: unknown stays unknown

This toolkit is a reference, not a physics simulator. **Never fabricate numeric results from missing evidence.** When the required source is absent, insufficient, beyond its measured range, or incompatible with the calculation, display **No data** and explain why.

### Measured, calculated and unknown

- **Measured / source-published**: original datapoint at its recorded distance. Identify its source, date or patch when available.
- **Calculated from measured values**: a transparent calculation (for example, armor reduction at a sourced damage checkpoint). Label it as calculated, never as observed in a game.
- **Estimated / historical / community-derived**: do not silently represent as measured. Do not turn unverified assumptions into apparently exact damage, hit-count or kill-time statistics.
- **Unknown**: show **No data**. Do not use zeros, last-value carry-forward, arbitrary falloff percentages, placeholder reload times, extrapolation, or assumed target geometry as substitutes.

## Effective Range — enforced

- Each weapon has its own list of *published distance checkpoints*. The range slider selects those actual source points only.
- **DBS** pellet damage: recorded 0–70m; **S686**: 0–80m; **S12K**: 0–70m; **Sawn-off**: 0–50m (pubgstatistics.com, checked October 2026).
- These shotgun measurements are **base damage per pellet**, **not** the number of pellets that strike a player. Neither a historical spread cone nor an assumed target width establishes current hip-fire or ADS hits.
- Actual damage to a target, HTK and TTK for pellet shotguns are **No data**. No damage chart extends beyond the shotgun source's last measured point.
- Non-shotgun damage is displayed only at the source's published distances; hitbox/armor results are clearly labeled as calculations from those points.
- WinnerMeta beta drop checkpoints are only shown at recorded distances, without power-law interpolation or flat continuation.
- Flight time from *muzzle velocity* alone is not reliable beyond the muzzle, so effective-range flight time is **No data** rather than a fabricated constant-speed figure.
- Even a line drawn between measured endpoints can imply false confidence. This toolkit uses individual plotted markers for measured checkpoints.

## Other areas to audit before calling their outputs fully source-verified

The following pre-existing features contain explicitly documented approximations or placeholder inputs. Their figures should **not** be described as verified measurements until audited and replaced with reliable data, or suppressed if reliable data does not exist:

1. **Recoil Analyzer** — generic prone stance factor (`PRONE_EXTRA`) and some incomplete recoil samples.
2. **Attachment estimates** — approximate community modifier percentages where no patch-confirmed figure is available.
3. **Magazine capacities** — generic extended-magazine estimates for weapons lacking exact values.
4. **Armor crossovers** — derivations from fixed source tables; distinguish mathematical model outputs from live/current-patch observation.
5. **RPD reload value** — explicitly marked as a placeholder in the original dataset. TTK including that placeholder is now withheld; examine other calculators that still reference reload.

When a model is optional, make it visibly optional and unmistakably *an estimate*; do not default to presenting it as source-backed. If the user asks for fully verified numbers only, suppress unsupported outputs instead.

## Verification

Run `node --test tests/*.test.cjs` after updating the toolkit. The `range-evidence.test.cjs` suite checks shotgun source boundaries, other-weapon distance bounds, missing sample distances, bullet-drop limits and browser script syntax.

## Source

- Weapon damage and published falloff checkpoints: https://pubgstatistics.com/weapons
- The source explicitly states damage outside its recorded range is unknown.
- WinnerMeta bullet-drop observations: https://winnermeta.win

Update these rules if authoritative data genuinely changes. Do not replace unknowns with convenient assumptions merely to make an interface look complete.
