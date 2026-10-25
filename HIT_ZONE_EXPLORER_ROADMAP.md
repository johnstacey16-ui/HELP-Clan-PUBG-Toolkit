# Hit Zone Damage Explorer — Roadmap

> **Persistent project handoff** for the HELP Clan PUBG Toolkit. Last updated: **2026-10-25, accessibility/CI passed — Vercel still rate limited**.
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
- [x] **P2 — Visual asset:** finish polished, mobile-legible, keyboard-accessible front-only SVG with 13 region keys and mirrored limb shapes, equipment overlays and fixed-position result labels.
  - [x] Scaffold structural invariants covered by `tests/hit-zone-scaffold.test.cjs`: 13 IDs/labels, mirrored arms/legs, separate helmet and vest overlays, and absence from production navigation. [CI check](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40178789623) passed.
  - [x] Replace the rough silhouette with layered, more anatomically contoured SVG geometry, tactical background, separate gear coverage tints, and 13 persistent two-line readout cards.
  - [x] Browser layout QA: `tests/hit-zone-preview.html` + `tests/hit-zone-preview-smoke.cjs` check 390px mobile and 1280px desktop actual Chromium rendering, callout visibility/collision, keyboard targets, independent overlays and no page overflow. [Passing workflow](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40179367950).
  - [x] Inspected integrated screenshots from actual headless Chrome at **390×1600 mobile** and **1440×1100 desktop**; all 13 chips were legible and the original HELP CLAN visual language was preserved. Notes at [visual review](docs/hit-zone-explorer-visual-review.md) on PR #39. Manual device/screen-reader testing remains a later polish task.
- [ ] **P3 — Live panel:** wire the explorer into `index.html`, toolkit sidebar and navigation, CSS, and the assembled static JavaScript in source/build order. Do not publish a broken or unfinished eighth tab.
  - [x] **Implemented and CI-passed in isolated draft PR [#39](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/pull/39)** on branch `feature/hit-zone-explorer-visual`. Includes the integrated `src/calculators/45-hit-zone-explorer.part`, regenerated browser bundle, eighth sidebar panel and browser checks.
  - [x] Integrated mobile/desktop screenshots inspected; code and runtime tests pass.
  - [ ] **Release blocker** (2026-10-25 09:29 UTC): commit status **Vercel = failure**, message **“Deployment rate limited — retry in 24 hours.”** This is separate from successful GitHub Actions checks. Hold PR #39 unmerged; do not claim the new tool is deployed or try to bypass provider limits. Recheck after capacity becomes available, then merge and verify production.
- [x] **P4 — Modes and detail:** implement damage / HTK / heatmap, optional region drill-down, explicit no-data and shotgun best-case labels.
  - [x] Branch PR #39 implements damage, HTK, heatmap, optional click/keyboard zone details, measured-distance selection and explicit shotgun per-pellet limitation.
  - [x] Added separate **Shotgun: theoretical minimum shells (all pellets hit)** selector using `shotgunMinShellsAt`. Actual damage and HTK remain No data for pellet shotguns; controls automatically exit that mode for non-pellet weapons. Node tests and Chrome smoke verify source limits and warnings. [Passing run](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40180403824).
- [x] **P5 — Validation (feature branch):** source-assembled JS updated, `node scripts/build-static.cjs --check`, all Node tests, integrated eight-tool Chrome smoke and **320px/360px/390px/768px/1280px** visual geometry smoke passed. All **45 weapons** pass the full 13-region dynamic browser data/no-data sweep. [Passing run](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40180844593). Repeat on main at release.
- [ ] **P6 — Visual polish:** actual mobile/desktop screenshots reviewed, all 13 readouts inspected. **Accessibility hardening on PR #39:** meaningful `N hits` labels instead of ambiguous `Nx`, explicit 100-HP/same-zone HTK caveat, keyboard-selected region announced via `aria-pressed`, SVG buttons linked to their optional detail panel with `aria-controls`, captioned 13-row table, and clearer dynamic aria-label units. Full browser/static/320–1280px layout CI [passed](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40181782454). Actual physical-device, screen-reader and final deployed-site checks remain outstanding. See [visual review](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/blob/feature/hit-zone-explorer-visual/docs/hit-zone-explorer-visual-review.md).
- [ ] **P7 — Release:** branch README and browser expectations updated for eight tools; source check + Node + Chrome pass. **Blocked by Vercel deployment rate limit**; merge/production status have not been verified. Retry later and confirm new production commit and eighth panel.

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

**Next milestone: Vercel release-gate recovery.** Branch [PR #39](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/pull/39) has full green GitHub Actions, integrated screenshot QA and separate shotgun ideal-shell mode. GitHub commit status reports **Vercel failure / Deployment rate limited — retry in 24 hours** since 2026-10-25 09:29 UTC. Do NOT merge until Vercel can deploy again or the owner explicitly accepts an unverified production release. Once restored, rerun branch CI, inspect preview, mark PR ready, merge, and verify production's eighth panel/commit.** Keep the final visual screenshot review open in P2/P6, and the weapon-source reconciliation as an independent data-quality task. The already-created but UNWIRED starter files are `src/explorer/hit-zone-explorer.fragment.html`, `src/explorer/hit-zone-explorer.scaffold.css`, and `src/explorer/hit-zone-explorer.scaffold.part`. They must not be loaded on the live page as-is. The P1 adapter is already built and tested; wire the next stage to `getAllZoneDamageForWeapon(w, distance, helmetLevel, vestLevel)` and `sourcedRangeRows(w)`, consulting `docs/hit-zone-explorer-architecture.md`. Do not mark implementation stages complete just because starter files exist. After each coding session, check off only verified steps, note remaining issues here, and commit changes. The project is private; use the connected GitHub repository tools.

## Progress log

- **2026-10-25 (accessibility refinement while release rate-limited)** — On draft PR [#39](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/pull/39), changed HTK readouts to **“4 hits”**, added 100-HP/repeated-same-zone explanation, exposed selected-body-zone state (`aria-pressed`) and detail target (`aria-controls`) to assistive technology, and added caption + scoped column headings to the fallback 13-zone table. Regenerated production JS directly from source fragments; all source synchronization, Node, existing eight-tool browser tests, and responsive figure checks **passed** [run 40181782454](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40181782454), branch head `a068be8`. **Vercel remains FAILED:** “Deployment rate limited — retry in 24 hours”, confirmed at **09:42 UTC**. Do **not** merge yet; production remains on seven tools.


- **2026-10-25 (extra narrow-phone and complete-weapon QA)** — On draft PR [#39](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/pull/39), expanded real Chrome callout geometry testing to **320, 360, 390, 768 and 1280px**. Added an exhaustive in-browser sweep of **all 45 toolkit weapons** to ensure all 13 on-body values and table rows remain coherent, No data stays explicit, shotgun whole-shell damage is never manufactured, and theoretical shell mode only activates on pellet shotguns. Fixed incorrect “whole-shell” terminology when a non-shotgun lacks source damage. **Source bundle check, 125+ Node tests, eight-tool browser smoke and five-size visual QA passed** in [GitHub Actions run 40181373365](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40181373365). Latest PR head `4e49c66` is STILL **Vercel: failure — Deployment rate limited; retry in 24 hours** (checked 2026-10-25 ~09:37 UTC). No merge or verified production release.


- **2026-10-25 (P2/P4/P5 completed on feature branch; deployment gated)** — Reviewed **real screenshots** of the integrated app in headless Chrome ([mobile run 40180519016](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40180519016), [desktop run 40180604834](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40180604834)); see [visual review](docs/hit-zone-explorer-visual-review.md). Added explicitly labelled ideal shotgun **minimum shells** mode, kept real shotgun damage/HTK as No data, tested distance retention, weapon resets, keyboard activation, and all 13 accessible table rows. Removed screenshot logs from normal CI. Branch tests passed [40180844593](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40180844593) including static build check, 125+ Node tests and Chrome. **Blocked:** Vercel status on PR head `f5901f6` failed at **09:29 UTC** with “Deployment rate limited — retry in 24 hours.” Leave PR as draft/unmerged until release verification is possible. Source-data differences remain tracked.

- **2026-10-25 (P3 draft integrated)** — Developed `feature/hit-zone-explorer-visual` and opened **draft PR [#39](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/pull/39)**. Branch adds a new eighth navigation entry, integrates 13 SVG region readouts with the P1 adapter, independent helmet/vest dropdowns and real checkpoint distances, and ships damage / HTK / heatmap modes with optional region details. Automated browser tests checked M416 unarmoured/helmet/vest math, unchanged limb damage, shotgun withholding, O12 recorded 2m start, checkpoint changes, region clicks and all seven pre-existing tools. [GitHub Actions run 40179899582](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40179899582) **passed**. The PR is **unmerged**, and a human screenshot/visual review is still required before release.

- **2026-10-25 (P2 front-view refinement)** — Redesigned the provisional SVG with curved body zones, dual mirrored limbs, 13 permanent two-line numeric callout cards, technical reticle background, distinct helmet/vest tint groups and responsive scoped CSS. Added `tests/hit-zone-preview.html` and deterministic real Chromium 390px + 1280px layout/collision checks to CI; test run [40179367950](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40179367950) passed including 124 Node tests and original seven-tool browser smoke. No eighth panel is published yet. Screenshot-level aesthetic inspection remains to do.

- **2026-10-25 (P2 testing started)** — Added an automated scaffold invariant test for 13 on-body labels, front-only SVG layout, mirrored limbs, independent gear overlays and keeping the unfinished tab out of production. GitHub Actions passed [run 40178789623](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40178789623). P2 remains **unchecked** until actual visual/artwork and mobile QA.

- **2026-10-25 (P1 completed)** — Added the pure all-zone adapter `getAllZoneDamageForWeapon` and gear-slot helpers within the existing calculator closure, rebuilt the browser JS from all six source fragments, and added dedicated tests. The full Node test suite and existing seven-tool Chrome smoke job passed in [GitHub Actions run 40178640515](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40178640515). No new panel has been made live. Next: P2 visual asset and mobile/keyboard checks. Known weapon source differences remain open.

- **2026-10-25** — Requirements fixed; inspected current source layout, damage formula, static builder, navigation and smoke tests. Created a durable roadmap, architecture specification and three unwired prototype files. Cross-checked the 13 hit areas and helmet/vest coverage against 2026-10-21 game-data extraction, with weapon-specific source conflicts left open. No claim that the live new panel is finished.
