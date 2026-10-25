# Hit Zone Damage Explorer — Roadmap

> **Persistent project handoff** for the HELP Clan PUBG Toolkit. Last updated: **2026-10-25**.
> For a new ChatGPT conversation, send the repository URL and say:
> **"Continue the Hit Zone Damage Explorer from HIT_ZONE_EXPLORER_ROADMAP.md. Check the repository first, do the next unchecked task, run the applicable tests, and update this roadmap."**

## Goal / agreed decisions

Build a polished **front-view only** PUBG hit-zone damage explorer inside the existing static HTML/JS toolkit. The user selects **weapon, helmet level, vest level and a sourced distance**. All body regions show their results **simultaneously**; tapping a region is optional and only reveals its detailed calculation. **No rear view or turntable**. The vest must never be drawn/calculated as protecting limbs. Gear levels are independent. Prefer a crisp segmented SVG anatomy figure, not a noninteractive generated infographic.

Default modes: **damage**, **hits-to-kill (100 HP)**, and **heatmap**. Never display invented values to fill holes in data. The toolkit's existing sensitivity and other calculators must remain unchanged.

## Current state

- [x] Product decisions agreed: single front view, simultaneous zone labels, independent helmet/vest, optional tap-for-detail.
- [x] Existing source inspected (2026-10-25): the toolkit already has 13 detailed hit-zone keys, class-based modifiers, weapon-specific head overrides, documented measured distance tables and basic 30/40/55% equipment reductions.
- [x] Technical implementation blueprint recorded in [docs/hit-zone-explorer-architecture.md](docs/hit-zone-explorer-architecture.md).
- [x] Starter HTML front-view SVG, scoped CSS, and unbundled JS controller created under `src/explorer/` (prototype only, **not deployed**, not yet validated visually).
- [x] Cross-check standard hit-zone coverage and 30/40/55% armour reductions against extracted PC Update 43.2 data; documented in [source audit](docs/hit-zone-source-check-2026-10-25.md).
- [ ] Reconcile per-weapon base-damage disagreements and weapon-specific overrides against versioned sources; do not overwrite owner-tested values without evidence.
- [x] **P1 — Data adapter:** independent helmet/vest calculations added to `src/calculators/00-damage-ballistics.part` and regenerated `js/toolkit-calculators.js`; `tests/hit-zone-adapter.test.cjs` covers all 13 zones, nil armour, helmet-only, vest-only, combined gear, Dragunov override, exact checkpoints, shotguns and bad levels. GitHub Actions passed on commit `7fcb1c2` ([CI run](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40178640515)).
- [ ] **P2 — Visual asset:** finish polished, mobile-legible, keyboard-accessible front-only SVG with 13 region keys and mirrored limb shapes, equipment overlays and fixed-position result labels.
  - [x] Scaffold structural invariants covered by `tests/hit-zone-scaffold.test.cjs`: 13 IDs/labels, mirrored arms/legs, separate helmet and vest overlays, and absence from production navigation. [CI check](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40178789623) passed.
  - [ ] Replace rough silhouette with polished visuals; inspect rendered desktop/mobile legibility and accessibility in a real browser before P2 is considered complete.
- [ ] **P3 — Live panel:** wire the explorer into `index.html`, toolkit sidebar and navigation, CSS, and the assembled static JavaScript in source/build order. Do not publish a broken or unfinished eighth tab.
- [ ] **P4 — Modes and detail:** implement damage / HTK / heatmap, optional region drill-down, explicit no-data and shotgun best-case labels.
- [ ] **P5 — Validation:** run `node scripts/build-static.cjs`, `node scripts/build-static.cjs --check`, `node --test tests/*.test.cjs`, and `node tests/browser-smoke.cjs`; expand smoke coverage for the new panel, mobile and source-limit behaviour.
- [ ] **P6 — Visual polish:** inspect mobile and desktop render, improve silhouettes, alignment, spacing, contrast, gear overlays and accessibility; confirm all displayed values match the engine.
- [ ] **P7 — Release:** update the README tool count and browser assertions, document the new feature and verify the Vercel deployment separately.

## Architecture constraints (do not silently change)

1. Existing site is plain static HTML/JS, **not React**; preserve the ordered `js/app-navigation.js`, `js/shared.js`, `js/combat-database.js`, `js/sensitivity.js`, `js/toolkit-calculators.js` scripts.
2. `src/calculators/*.part` sections are assembled by `scripts/build-static.cjs`; new source parts require an entry in the build script and regeneration of `js/toolkit-calculators.js`. Never edit generated JS alone.
3. Reuse `BODY_PARTS`, `CLASS_MULT_DETAILED`, `WEAPON_HEAD_MULT`, `FALLOFF_TABLES`, `PELLET_FALLOFF`, `finalDamageAt` and `htkFor`; do not duplicate or guess multipliers.
4. Current modeled protection mapping: **helmet head/neck**, **vest clavicle/chest/upperStomach/lowerStomach/pelvis**, **no limb armour**. This must be evidence-reviewed before calling the display independently validated.
5. Armour factor currently modeled: no gear `1`, L1 `0.70`, L2 `0.60`, L3 `0.45`. Calculate each zone using the **correct equipment selector**; the old single-`armorLevel` UI must not be mistakenly reused for both.
6. For non-shotguns use **published exact distance checkpoints only**. Unknown checkpoint = **No data**. For pellet shotguns, do **not** present per-pellet damage as real whole-shell damage or actual TTK. A separate explicitly labeled theoretical minimum-shell mode is permitted.
7. Preserve the author's original sensitivity mathematics, named weapon data, and existing seven tools until the eighth tool is integrated and verified.

## Suggested implementation contract

- Panel: `panel-hit-zone`; selectors: `hz_weapon`, `hz_distance`, `hz_helmet`, `hz_vest`, `hz_mode`.
- View: `hz_body`, `hz_labels` (optional annotation group), `hz_summary`, `hz_detail`, `hz_status`; scaffold uses `[data-hz-value]` text labels embedded in the SVG.
- SVG region selector: `[data-hit-zone]` with values matching `DETAILED_PARTS`.
- Calculation adapter accepts `{weapon, distance, helmetLevel, vestLevel}` and returns ordered objects `{id,label,damage,htk,hitAreaMultiplier,classMultiplier,armorMultiplier,armorSource,sourceStatus}`.
- CSS scoped under `#panel-hit-zone` and accessible no-SVG fallback table.
- Draft UI / JS **starter files** under `src/explorer/` are an **unwired scaffold**, not a released feature.

## Acceptance criteria

- Every body region shows a result at once without tapping, for a supported weapon/distance; mirrored limbs display the same region value.
- Changing helmet only changes head/neck; changing vest only changes the documented torso coverage; neither changes the limbs.
- Equipment overlays align exactly with damage zones, not misleading decorative armour over unprotected regions.
- Missing data is visible as “No data”; no fabricated interpolation/extrapolation or shotgun shell damage.
- Smartphone layouts remain readable and navigable without hover.
- Keyboard access and a plain-text/tabular result equivalent are available.
- All existing calculator and browser regressions continue to pass.

## Handoff / next task

**Next milestone: P2 — polish and verify the front-only SVG asset, accessibility and mobile value labels; weapon-source reconciliation remains an independent open data-quality item.** The already-created but UNWIRED starter files are `src/explorer/hit-zone-explorer.fragment.html`, `src/explorer/hit-zone-explorer.scaffold.css`, and `src/explorer/hit-zone-explorer.scaffold.part`. They must not be loaded on the live page as-is. The P1 adapter is already built and tested; wire the next stage to `getAllZoneDamageForWeapon(w, distance, helmetLevel, vestLevel)` and `sourcedRangeRows(w)`, consulting `docs/hit-zone-explorer-architecture.md`. Do not mark implementation stages complete just because starter files exist. After each coding session, check off only verified steps, note remaining issues here, and commit changes. The project is private; use the connected GitHub repository tools.

## Progress log

- **2026-10-25 (P2 testing started)** — Added an automated scaffold invariant test for 13 on-body labels, front-only SVG layout, mirrored limbs, independent gear overlays and keeping the unfinished tab out of production. GitHub Actions passed [run 40178789623](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40178789623). P2 remains **unchecked** until actual visual/artwork and mobile QA.

- **2026-10-25 (P1 completed)** — Added the pure all-zone adapter `getAllZoneDamageForWeapon` and gear-slot helpers within the existing calculator closure, rebuilt the browser JS from all six source fragments, and added dedicated tests. The full Node test suite and existing seven-tool Chrome smoke job passed in [GitHub Actions run 40178640515](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40178640515). No new panel has been made live. Next: P2 visual asset and mobile/keyboard checks. Known weapon source differences remain open.

- **2026-10-25** — Requirements fixed; inspected current source layout, damage formula, static builder, navigation and smoke tests. Created a durable roadmap, architecture specification and three unwired prototype files. Cross-checked the 13 hit areas and helmet/vest coverage against 2026-10-21 game-data extraction, with weapon-specific source conflicts left open. No claim that the live new panel is finished.
