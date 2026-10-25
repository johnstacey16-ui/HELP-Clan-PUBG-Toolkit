# HELP Clan PUBG Toolkit — Calculation and Reference Notes

## Project approach: developer-built models are allowed

The HELP Clan toolkit includes original formulas, manual calibrations and calculations designed by its creator. **These are intentional features, not automatically invalid because they are not published by KRAFTON.** The previous blanket requirement to use only verified official measurements has been retired at the owner's request.

Keep this distinction **in the repository documentation**, without filling the public interface with lengthy methodology:

- **Published measurements:** retain the source, patch and any known coverage limits.
- **Custom or empirical calculators:** may use the creator's original formulas, fitted coefficients and practical assumptions. Keep the maths and intended behavior in source control; clearly note important limitations here for maintainers.
- **Unknown measurements:** an absence of data is not the same as zero. Where a feature explicitly promises recorded values (such as the existing shotgun damage-distance tables), continue respecting the table's known endpoints. A separate modeled calculator can exist when intentionally designed.
- **Avoid accidental changes to proven user-created maths:** interface improvements should not replace or silently remove working sensitivity and scope-matching formulas.

### Core custom sensitivity calculations

The Scope Sensitivity Matcher uses owner-supplied scope-specific A/B constants and two mathematical functions:
`pixel_speed = 3840 × (C + B) / ((A/60) × (10+B))` and
`matched_sensitivity = (A/60) × (10+B) × pixel_speed / 3840 − B`.
These are **deliberately used empirical conversion formulas**, not a claim to reproduce an official game-engine implementation. They remain in the app and can be the default opening calculator.

## Effective Range — current recorded-distance behavior

- Each weapon has its own list of *published distance checkpoints*. The range slider selects those actual source points only.
- **DBS** pellet damage: recorded 0–70m; **S686**: 0–80m; **S12K**: 0–70m; **Sawn-off**: 0–50m (pubgstatistics.com, checked October 2026).
- These shotgun measurements are **base damage per pellet**, **not** the number of pellets that strike a player. Neither a historical spread cone nor an assumed target width establishes current hip-fire or ADS hits.
- The UI now calculates **theoretical best-case shotgun hits-to-kill**, displayed as **minimum shells (all pellets hit)** at the recorded checkpoints only. It multiplies recorded damage **per pellet** by the supplied pellet count and the chosen body part/class/armour factors, then divides 100 HP by the resulting full-connection shot damage and rounds up. This is **not** measured HTK in a match.
- Every pellet in every shell must land on the selected body area for the illustrated lower-bound scenario. Pellet spread, partial pellet hits, missed shots, armour durability changes, target health differences and player movement are not simulated. Real fights can require more shells; because armour degradation also isn't simulated, treat this as a fixed-armour idealisation, not an absolute guarantee.
- Actual damage to a real target and pellet shotgun **TTK remain No data**; the tool continues to show base per-pellet damage separately and never plots values beyond the shotgun source's last checkpoint.
- **Sawn-off pellet count discrepancy:** the historical toolkit used 8, and some community websites still say 8. PUBG's PC Update 4.3 patch notes explicitly increased the Sawn-off from 8 to 9 pellets, supported by other weapon databases; use 9 for the ideal-case calculation. This is a historical official change, not a fresh independent in-game verification of the October 2026 patch. Primary notes: https://store.steampowered.com/news/posts/?appids=578080&enddate=1565443536 (PUBG's update 4.3 release, September 2019). Compare https://pubg.gs/weapons/sawed-off/ and conflicting https://www.pubgsearch.com/weapons/sawed-off.
- Non-shotgun damage is displayed only at the source's published distances; hitbox/armor results are clearly labeled as calculations from those points.
- WinnerMeta gravity-drop estimates are derived from telemetry flight times (½gt²), not measured point-of-impact drop or scope holdover. Published values refer to **50m buckets** (e.g., 200–250m), not exact point distances. The Range panel identifies the bin and approximates any equivalent angle from its midpoint; do not treat this as a sight correction. Show only published distance buckets, without interpolation or extension.
- Flight time from *muzzle velocity* alone is not reliable beyond the muzzle, so effective-range flight time is **No data** rather than a fabricated constant-speed figure.
- Even a line drawn between measured endpoints can imply false confidence. This toolkit uses individual plotted markers for measured checkpoints.

## Recoil Analyzer — current behavior and future options

- The old analyzer multiplied vertical recoil and horizontal bias by \`1 + (shot - 1) × speed × 0.05\`, then generated seeded horizontal variation. **No official or validated current-PUBG source supports this as a universal per-bullet formula. This calculation has been retired.**
- The old implementation was removed because its universal behavior was not supported. The owner can add a clearly intentional custom recoil model later; bullet-10/20/30 stages should not be described as official PUBG mechanics without evidence.
- KRAFTON's 7 August 2026 LMG developer letter describes recoil reaching a peak and then settling, and documents an adjustment of approximately −10% at the peak and +10% after recovery. https://pubg.com/en/news/10874
- Update 42.1 (16 June 2026) documents distinct early/mid recoil buildup for the SLR. https://pubg.com/en/news/10179
- Update 30.1 (11 June 2024) describes MP5K vertical recoil increasing gradually. https://pubg.com/en-asia/news/7424
- Build-derived PUBG weapon field listings include vertical/horizontal recoil speed, climb and fall values, recoil variation and horizontal direction-switch cadence. These do **not** by themselves establish verified per-shot displacement or a complete game-engine spray simulation. Example: https://pubgplanet.com/wiki/weapons/rpd
- The Recoil Evidence Explorer now displays original supplied weapon-level parameter values with an explicit caveat, while withholding simulated shot-by-shot/cumulative recoil. Unverified or absent measurements are **No data**. Neither a generic prone factor nor a fixed 5% growth is applied.
- Future recoil features can use either game measurements or explicitly designed creator-owned models. Keep the algorithm, intended inputs and any supporting references in the repository. Do not advertise a custom model as an exact engine reproduction.

## Other models and known limitations

The following existing features include custom estimates or incomplete inputs. They can remain useful tools, including when they are the creator's own original work. Track their assumptions here so future code changes don't accidentally alter their behavior:

1. **Supplied recoil parameters** — several weapon-level fields lack independent current-patch validation; do not use them as exact per-shot recoil.
2. **Attachment estimates** — approximate community modifier percentages where no patch-confirmed figure is available.
3. **Magazine capacities** — generic extended-magazine estimates for weapons lacking exact values.
4. **Armor crossovers** — derivations from fixed source tables; distinguish mathematical model outputs from live/current-patch observation.
5. **RPD reload value** — explicitly marked as a placeholder in the original dataset. TTK including that placeholder is now withheld; examine other calculators that still reference reload.

When a model is deliberately included by the creator, retain it and document its assumptions here. Keep the main UI practical and compact; surface a short warning only where it materially changes how a result should be interpreted.

## Verification

Run `node --test tests/*.test.cjs` after updating the toolkit. The `range-evidence.test.cjs` suite checks shotgun source boundaries, other-weapon distance bounds, missing sample distances, bullet-drop limits and browser script syntax.

## Source

- Weapon damage and published falloff checkpoints: https://pubgstatistics.com/weapons
- The source explicitly states damage outside its recorded range is unknown.
- WinnerMeta telemetry-derived gravity estimates: https://winnermeta.win

These notes describe current decisions and are not a ban on future owner-authored formulas or modeled calculations. Preserve the source maths and update this file whenever behavior changes.

## 25 October 2026: vest capacity, item weights, and attachment effects

Update 28.2 folded the Utility Belt +50 into character base carrying capacity (70), but **not** the equipped vest's +50. Standard and Jammer packs each provide +150/+200/+250: totals are **270/320/370 wearing a vest** and **220/270/320 without one**. The calculator defaults to vest equipped but lets players choose. Sources: https://pubg.com/en/news/7083 , https://pubg.gs/gear/ .

PC 43.2 game-file sources: https://pubg.gs/ammo/ , https://pubg.gs/consumables/ , https://pubg.gs/throwables/ ; Steam build 26072644, extracted 2026-10-21. Existing common weights match. Newly covered: .50 Caliber 1/round; BZ Grenade 23, Decoy 12, Sticky Bomb 20, Spike Trap 18, Mini Smoke Grenade 10, Emergency Cover Flare 27, Emergency Support Flare 35. Exclude event/test duplicates (e.g. a 1-unit Frag or Molotov). Some items are limited to particular maps/modes.

PUBG item effects from https://pubg.gs/attachments/ : 43.2 item tooltip reductions largely match existing vertical/horizontal/recovery data. Attachment Optimizer score **excludes** ADS, hip-fire accuracy, initial-shot control, camera shake and sway. Display those secondary effects in the selected-attachment note rather than fabricating conversions into simulated spray. Keep the creator's sensitivity formulas and current preset scoring unchanged.

Official Update 43.2: https://pubg.com/en/news/11136 (PC Oct 14, Console Oct 22). New console controller presets do not publish an alternative sensitivity-conversion equation. Official Update 43.1: https://pubg.com/en/news/11057 . LMG posture changes are already subsequent to the earlier tuning and are captured by the source's 43.2 game-file recoil parameters; **do not apply the 43.1 nerfs a second time**. 43.1 console hitbox improvements explicitly did not rebalance weapon damage, recoil or rate of fire.

## 25 October 2026: dual-family magazine audit and Chrome checks

Game-file attachment slot compatibility at https://pubg.gs/attachments/ (PC 43.2) confirms that Dragunov, SLR, Mini14, Mk12, Mk14, SKS and VSS can equip **both AR/DMR and DMR/SR magazine item families**. The UI now exposes the alternatives for these seven DMRs rather than only for Mk14. Where the toolkit already has supported weapon-loaded counts for both, it reuses them. Mk14's explicitly distinct 22/20 DMR/SR and 20/20 AR-family variants remain independent. The attachment item labels "42 rounds" or "8 rounds" **cannot be applied to every compatible weapon**.

ACE32 40/42 and Dragunov 18/20 conflicting capacity variants remain **unknown** until their exact family and game version are demonstrated; https://pubg.fandom.com/wiki/Extended_Mag_%28AR%2C_DMR%2C_S12K%29 , https://pubg.gs/weapons/ace32/ and https://pubg.gs/weapons/dragunov/ confirm base magazines but do not resolve loaded extension by family. The toolkit now tells the player that variants disagree when one is selected, without substituting a fabricated result.

The GitHub smoke workflow additionally runs **real headless Chrome** over a local static HTTP server with no npm packages or internet: validates the seven panels, default Scope Sensitivity Matcher, range/TTK/recoil output, DMR magazine family switching, ambiguous ACE32, backlink state, and Jammer capacity with and without a vest. This tests committed static JS and HTML in a real browser but **does not** prove the hosted Vercel deployment is current. Official console Update 43.2 https://www.pubg.com/en/news/11136 retains Type A/B/C and Custom alongside the two new console presets; does not justify altering the owner's sensitivity formula.
