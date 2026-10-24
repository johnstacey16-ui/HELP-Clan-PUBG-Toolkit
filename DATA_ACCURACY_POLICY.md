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
- The UI now calculates **theoretical best-case shotgun hits-to-kill**, displayed as **minimum shells (all pellets hit)** at the recorded checkpoints only. It multiplies recorded damage **per pellet** by the supplied pellet count and the chosen body part/class/armour factors, then divides 100 HP by the resulting full-connection shot damage and rounds up. This is **not** measured HTK in a match.
- Every pellet in every shell must land on the selected body area for the illustrated lower-bound scenario. Pellet spread, partial pellet hits, missed shots, armour durability changes, target health differences and player movement are not simulated. Real fights can require more shells; because armour degradation also isn't simulated, treat this as a fixed-armour idealisation, not an absolute guarantee.
- Actual damage to a real target and pellet shotgun **TTK remain No data**; the tool continues to show base per-pellet damage separately and never plots values beyond the shotgun source's last checkpoint.
- **Sawn-off pellet count discrepancy:** the historical toolkit used 8, and some community websites still say 8. PUBG's PC Update 4.3 patch notes explicitly increased the Sawn-off from 8 to 9 pellets, supported by other weapon databases; use 9 for the ideal-case calculation. This is a historical official change, not a fresh independent in-game verification of the October 2026 patch. Primary notes: https://store.steampowered.com/news/posts/?appids=578080&enddate=1565443536 (PUBG's update 4.3 release, September 2019). Compare https://pubg.gs/weapons/sawed-off/ and conflicting https://www.pubgsearch.com/weapons/sawed-off.
- Non-shotgun damage is displayed only at the source's published distances; hitbox/armor results are clearly labeled as calculations from those points.
- WinnerMeta beta drop checkpoints are only shown at recorded distances, without power-law interpolation or flat continuation.
- Flight time from *muzzle velocity* alone is not reliable beyond the muzzle, so effective-range flight time is **No data** rather than a fabricated constant-speed figure.
- Even a line drawn between measured endpoints can imply false confidence. This toolkit uses individual plotted markers for measured checkpoints.

## Recoil Analyzer — no invented per-shot pattern

- The old analyzer multiplied vertical recoil and horizontal bias by \`1 + (shot - 1) × speed × 0.05\`, then generated seeded horizontal variation. **No official or validated current-PUBG source supports this as a universal per-bullet formula. This calculation has been retired.**
- Do not replace that with invented fixed jumps at bullets 10, 20 and 30. No evidence has established those precise universal boundaries.
- KRAFTON's 7 August 2026 LMG developer letter describes recoil reaching a peak and then settling, and documents an adjustment of approximately −10% at the peak and +10% after recovery. https://pubg.com/en/news/10874
- Update 42.1 (16 June 2026) documents distinct early/mid recoil buildup for the SLR. https://pubg.com/en/news/10179
- Update 30.1 (11 June 2024) describes MP5K vertical recoil increasing gradually. https://pubg.com/en-asia/news/7424
- Build-derived PUBG weapon field listings include vertical/horizontal recoil speed, climb and fall values, recoil variation and horizontal direction-switch cadence. These do **not** by themselves establish verified per-shot displacement or a complete game-engine spray simulation. Example: https://pubgplanet.com/wiki/weapons/rpd
- The Recoil Evidence Explorer now displays original supplied weapon-level parameter values with an explicit caveat, while withholding simulated shot-by-shot/cumulative recoil. Unverified or absent measurements are **No data**. Neither a generic prone factor nor a fixed 5% growth is applied.
- To restore exact curves, require current-patch measurements or reproducible game-engine data sufficient to validate the shot-by-shot behavior. Keep provenance and patch identifiers.

## Other areas to audit before calling their outputs fully source-verified

The following pre-existing features contain explicitly documented approximations or placeholder inputs. Their figures should **not** be described as verified measurements until audited and replaced with reliable data, or suppressed if reliable data does not exist:

1. **Supplied recoil parameters** — several weapon-level fields lack independent current-patch validation; do not use them as exact per-shot recoil.
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
