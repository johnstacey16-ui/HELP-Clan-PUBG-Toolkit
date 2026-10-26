# HELP Clan PUBG Toolkit — Complete Visual Upgrade Roadmap

> Persistent handoff / live checklist. Started **2026-10-25**. Working branch: `feature/toolkit-visual-upgrade` from `main` at `8753b151`. **Never mark a task complete merely because it is planned.** Check off a step only when its source, tests and (where applicable) visual evidence exist. Record commits / PRs and update this file with each milestone.
>
> Next conversation instruction: **"Continue the HELP Clan visual upgrade from VISUAL_UPGRADE_ROADMAP.md in johnstacey16-ui/HELP-Clan-PUBG-Toolkit. Inspect the latest branch/PR, complete the next unchecked task, run tests, and update the checkboxes. Do not merge without my approval."**

## Outcome and non-negotiables

Make all seven remaining tools look like one premium, readable PUBG companion app with realistic, useful, locally hosted imagery: weapon photography-style illustrations, representative optics, attachments, equipment, ballistic visuals and compact thumbnails. **Keep approved Model 2 unchanged** in the Hit Zone Damage Explorer, including the 13 SVG zones. Retain HELP Clan's dark navy, cyan and warm amber/gold palette and existing static HTML/CSS/JS stack — no React or new build system. Content must remain a working toolkit, not a gallery.

**Every image is subordinate to data:** no obscured readouts or controls; no decorative image should masquerade as verified PUBG game data. Use original/licensed/redistribution-permitted images, preserve provenance and avoid externally hotlinked assets. Use accessible alt text for informative images and `alt=""` (or `aria-hidden`) for decorative ones. No invented weapon statistics. No unrelated changes to gameplay maths.

## Progress dashboard

- [x] **P0 — Repo audit and scope locked** (2026-10-25). Confirmed eight panels, seven targets, one committed Model 2 WebP, existing five-script architecture, CSS palette and GitHub Actions browser/Node checks.
- [x] **P0 — Safe branch created**: `feature/toolkit-visual-upgrade` from current `main`. Production/main untouched.
- [x] **P1a — Media policy and catalogue**: checked-in asset manifest, explicit provenance/accessibility/size requirements and asset-regression test added in this planning commit. **CI status is tracked below; this does not mean new images are already integrated.**
- [x] **P1b — Reusable visual components and first image pilot**: responsive CSS image tiles, no-art/error fallbacks, original 5 KB M416-style SVG and browser-decoding validation. **This is an illustrated pilot, not a completed photorealistic weapon catalogue.** [CI run 40243494382](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40243494382) passed.
- [ ] **P2 — Scope Sensitivity Matcher**.
- [ ] **P3 — Combat Database**.
- [ ] **P4 — Attachments and Recoil**.
- [ ] **P5 — Effective Range**.
- [ ] **P6 — TTK Calculator**.
- [ ] **P7 — Recoil Analyzer**.
- [ ] **P8 — Tactical Loadout / Backpack**.
- [ ] **P9 — Shared UI refinement and cross-tool cohesion**.
- [ ] **P10 — Acceptance testing, owner preview and release**.

The checked foundation items include the initial Combat DB **illustrated M416 pilot**; **all 7 target tools now have initial original illustrations; weapon-name illustration coverage is now 45/45 (illustrations only, not photorealistic); higher-fidelity art and physical-device QA remain unfinished**. Photo-grade cataloguing and all other tools are pending.

### Batch milestone — six-panel first visual pass (verified 2026-10-25)

- [x] All seven target tools now have at least one local, original artwork element (Combat DB M416 from the earlier pilot; six additional tool panels in the new batch).
- [x] Scope Matcher: seven representative optic illustrations, connected to the magnification selector; original sensitivity formulas untouched.
- [x] Attachments: four responsive category illustrations and the selected attachment names beside their matching controls.
- [x] Backpack: backpack/ammo/medical/throwable art with a label that follows pack type and level selections.
- [x] Effective Range and TTK: restrained reference artwork with source-backed numbers left unobscured.
- [x] Recoil Analyzer: an evidence-parameter illustration, not a fictional shot-by-shot recoil trace; the existing Coming Soon notice remains.
- [x] 17 new self-contained local SVGs registered with original-art provenance and size/alt metadata.
- [x] [GitHub Actions 40244407117](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40244407117) passed Node/asset tests, bundle check, eight-tool Chromium interaction smoke and 320–1280px Hit Zone layout tests after the full batch.
- [x] Vercel marked the batch preview READY at commit `20e48831`.
- [ ] Physical device screenshot review, full per-weapon/item catalogue, further fidelity improvements and final owner preview approval. **Keep PR #41 in draft; no production merge yet.**

### 2026-10-26 — 45/45 weapon illustration and mobile-layout milestone

- [x] Illustrated **all 45 weapon names** in the existing Combat DB with original class-specific, exact-name SVG concept art, and added small decorative lazy-loaded thumbnails to the searchable weapon rows.
- [x] Kept the original weapon data, maths, filtering, sorting, 13 hit zones, Model 2 image and separate companion tools intact.
- [x] Passed all 45 image HTTP/decode checks in Chromium, plus unit/integrity/asset budget tests; validated full-table search at run [40250316674](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40250316674).
- [x] Added seven-tool artwork layout CI at 320, 390, 768 and 1280 px, passed run [40250452348](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40250452348). Approved Model 2's five-width test also passed.
- [x] Vercel review deployment READY, commit `aae3f44f`. Full branch preview: https://help-clan-pubg-toolkit-8gv9jiojb-acme-a675.vercel.app
- [ ] Upgrade original class-specific concept art to photo-grade/high-fidelity imagery where appropriate and rights-cleared. SVG silhouettes are visually illustrative, **not** exact real-world or official PUBG weapon models.
- [ ] Manual Xbox Edge, physical mobile, screenshot aesthetics/contrast/focus and owner final preview review. No production merge without approval.

## P0. Baseline and guardrails

- [x] Inspect eight live panel IDs and navigation: `panel-sensitivity`, `panel-combat`, `panel-hit-zone`, `panel-range`, `panel-ttk`, `panel-recoil2`, `panel-attach`, `panel-backpack`.
- [x] Confirm only committed artwork is `assets/hit-zone-model-2.webp` (40,064 B, 500×750, transparent).
- [x] Identify existing browser workflow `.github/workflows/ui-smoke.yml`, `tests/browser-smoke.cjs`, `tests/hit-zone-preview-smoke.cjs` and Node test suite.
- [x] Confirm static files `index.html`, `app-shell.css`, `design-refresh.css`, `js/*.js`; change source parts and regenerate bundles if calculator behavior is ever intentionally modified.
- [x] New work happens on a separate branch with PR/preview. **No automatic merge**.

## P1. Asset foundation — do this before filling tool panels

- [x] Add `assets/visual-manifest.json`: register shipped assets, origin/usage, dimensions and accessibility intent.
- [x] Add `tests/visual-asset-registry.test.cjs`: reject missing/unlisted imagery, malformed metadata, excessive file budgets and invalid WebP assets.
- [x] Record source rights, image and page budgets, named layouts, Xbox Edge considerations and fallbacks in this document.
- [x] Add reusable image-tile/card classes in scoped `visual-assets.css`, linked only where useful; preserve existing layout/brand and keep stats unobscured. Implemented on P1b Combat DB pilot.
- [ ] Replace first **representative vector artwork pilot** with an optimized photographic or higher-fidelity original/rights-cleared image if desired; record actual image rights/dimensions. Current SVG illustration is an interim image, not a photograph. Verify the selected final image loads in the preview.
- [x] Implement accessible informative `alt`, `width`/`height`, offscreen lazy loading and error fallback in the first Combat DB pilot; enforce future asset metadata through manifest tests. Further artwork follows this pattern.
- [x] All new visuals are explicitly original non-official SVG illustrations; provenance and intended illustrative use are registered in `assets/visual-manifest.json`.
- [ ] Manual visual screenshot review on 320/360/390/768/1280/1440px and Xbox Series S Edge; automated four-width media geometry checks are added to CI, but manual review is still outstanding.

**Budgets for this rollout:** total committed images at most **1.5 MiB** without explicit budget revision; normal thumbnail **≤90 KiB**, icon **≤60 KiB**, hero/illustration **≤180 KiB**. Prefer WebP/AVIF, no remote hotlinked images, no autoplay, and use lazy loading for noncritical images. Respect mobile/Xbox network and memory. If showing many weapon thumbnails, use a staged catalogue/on-demand loading rather than eagerly downloading every weapon.

## P2. Scope Sensitivity Matcher (tool 01)

- [ ] Establish visual language: clean icon/thumbnail set for red dot/holographic/2×/3×/4×/6×/8× sights, clearly marked representative when not officially sourced.
- [ ] Place a corresponding scope image near the selected optic; do not obstruct editable sensitivity fields, conversion results or horizontal result table.
- [ ] Verify the scope selector maps to the correct image and graceful fallback if no image exists.
- [x] Original `pixelSpeed` / `matchedSens` functions and user-supplied A/B constants were not edited; the full source-sync and scope regressions passed in Actions.
- [ ] Phone/Xbox keyboard/focus and layout regression.

## P3. Combat DB (tool 02)

- [x] Build an **original, representative 45-weapon concept-art catalogue** (initial M416 pilot plus 44 additional exact-name entries). 960×320 SVG source, not official screenshots, registered with licensing/provenance notes; higher-fidelity licensed/photo art remains a separate unfinished task.
- [x] Display matching exact-name weapon concept art in each Combat DB detail, compact sortable/searchable table rows and the original M416 featured card. Unknown asset names still use a no-art fallback.
- [x] Provide an explicit no-image text state and broken-file fallback; art is labelled representative and never substituted for another weapon.
- [ ] Optionally add a small visual key for helmet/vest, but preserve precise damage/armour tables, numbers and stickied table header.
- [x] Validate the 9-weapon original illustration catalogue with exact-name mapping against WEAPONS, browser switching tests, and fallback for remaining names; no wrong weapon image is substituted. The remaining full catalogue is still pending.

## Hit Zone Damage Explorer (tool 03) — frozen approved reference

- [x] Original fictional adult Model 2 photo, 13 body zones, persistent damage labels, helmet/vest, damage/HTK/heatmap/theoretical shells have already shipped through PR #40.
- [ ] After any shared visual CSS changes, check figure alignment, all 13 labels, keyboard/touch interactions and tablet/mobile legibility.
- [ ] Keep the model artwork, geometry and formulas unchanged unless the owner specifically requests a separate change.

## P4. Attachments & Recoil (tool 07)

- [ ] Build compact original/licensed images for optics, muzzle devices, grips and magazines; use accurate type labels, not guessed model-specific stats.
- [x] Present selected attachment names in compact responsive tiles and a matching selected-weapon artwork strip, leaving compatibility selectors unaffected.
- [x] Weapon-specific attachment compatibility and recoil calculation modules were left unmodified; existing attachment and Chromium smoke regressions passed.
- [ ] Ensure no images cover comparison values or controls at 320px.

## P5. Effective Range & Damage (tool 04)

- [x] Added restrained original target reference and exact-name selected-weapon art to Effective Range, separate from charts and checkpoint values.
- [ ] Keep observed checkpoint and `No data` distinctions unambiguous.
- [ ] Test charts, input selection, weapon switching, shotgun theoretical labels and source warnings.

## P6. TTK Calculator (tool 05)

- [x] Add dynamic, exact-name weapon comparison thumbnails for A/B/C in TTK, with explicit missing-art fallback for nonillustrated weapons.
- [ ] Keep hits-to-kill, reload notes, comparison charts and tabular data dominant.
- [x] Decouple TTK single-weapon and A/B/C comparison images from calculations; exact name lookup and fallback are verified for illustrated and nonillustrated choices.
- [ ] Do not change any HTK/TTK formula or weapon reload evidence.

## P7. Recoil Analyzer (tool 06)

- [x] Add dynamically updated exact-name weapon illustration beside the existing abstract recoil-parameter reference (no fabricated shot pattern).
- [x] Preserved the prominent **COMING SOON / IN DEVELOPMENT** banner for unreleased shot-by-shot analysis; verified by existing launch-polish regression.
- [ ] Keep existing evidence limits, charts and parameters readable; no deceptive illustrative spray pattern.
- [ ] Verify responsive chart behavior and reduced-motion preference on real Xbox/mobile hardware (Chromium automated smoke passed; physical-device review remains).

## P8. Tactical Loadout & Backpack (tool 08)

- [ ] Add compact category images for backpack levels, helmet/vest, ammunition, healing, boosters and throwables.
- [x] Backpack selection heading follows Standard vs Jammer Pack and selected level; distinct art is labelled representative and does not replace the original capacity labels.
- [ ] Preserve carry weight, capacity, vest boost and Jammer calculations and all item list controls.
- [ ] Test dense mobile cards and tap targets.

## P9. Cross-tool polish

- [ ] Standardise image aspect ratios, rounded corners, borders, crop handling, placeholder colors, badge placement and responsive spacing.
- [ ] Ensure the nav/sidebar and headers benefit from imagery **only if** it improves recognition without shrinking navigation targets.
- [ ] Add consistent source/fictional-art attribution in project docs where appropriate; avoid official endorsement claims.
- [ ] No overlay/fixed image should cover controls or cause page horizontal overflow.

## P10. Verification, approval and release

- [x] `node scripts/build-static.cjs --check` — passed in GitHub Actions 40250452348.
- [x] `node --test tests/*.test.cjs` including the 45-weapon asset registry and integrity tests — passed in GitHub Actions 40250452348.
- [x] `node tests/browser-smoke.cjs` for all eight existing tools; all 45 artwork SVGs decoded successfully in Chromium.
- [x] `node tests/hit-zone-preview-smoke.cjs` for approved Model 2 at 320–1280 px, and **new seven-panel media geometry tests** at 320/390/768/1280 px. Screenshots/physical-device visual inspection remain pending.
- [ ] Verify broken asset fallback, alt text, lazy/eager priority, mobile/LCP performance budget and no layout shifts.
- [ ] Browser review on real desktop, mobile and Xbox Edge; include keyboard and contrast/reduced-motion checks.
- [x] Publish a Vercel **preview** for the feature branch — READY for commit `aae3f44f`; https://help-clan-pubg-toolkit-8gv9jiojb-acme-a675.vercel.app .
- [ ] Get explicit owner visual approval for the complete preview. **No merge to main before this.**
- [ ] Merge reviewed PR, confirm production Vercel READY and post-merge Actions green.
- [ ] Update this roadmap with release commit and what, if anything, needs manual follow-up.

## Implementation order and update discipline

The first on-screen pilot is **Combat DB (original M416 SVG plus reusable responsive pattern)**, then Scope Matcher, then Attachments, followed by Range, TTK, Recoil and Backpack. This reduces risk before expanding to a full artwork catalogue.

When a task is done, change its literal `- [ ]` to `- [x]` **in GitHub**, alongside the source/asset/test commit. State the exact commit, CI/preview status and any limitations in the PR or below. Never mark a browser preview or asset as delivered on the basis of a plan alone. Keep existing tool-specific [Hit Zone Explorer roadmap](HIT_ZONE_EXPLORER_ROADMAP.md) as an independent reference.

### Nine-weapon batch — CI-confirmed

- [x] 9 named weapon images supported (M416, AKM, Beryl M762, Kar98k, Mini 14, M24, P90, S12K, AWM) through exact-name mappings; all other weapons retain an honest no-art state.
- [x] Combat DB detail, Range, TTK primary and A/B/C comparisons, Recoil and Attachments display the correct available weapon illustration from one shared catalogue.
- [x] Attachment optic tile follows selected magnification where available; Jammer Pack shows distinct artwork.
- [x] Nine-weapon registry test confirms every illustrated name occurs in the weapon database; [GitHub Actions run 40246179094](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40246179094) passed source sync, Node tests, real Chromium decode of all 9 SVGs, eight-tool smoke and responsive Hit Zone checks at commit `fed173e6`.
- [x] Vercel branch preview of `fed173e6` reported READY: https://help-clan-pubg-toolkit-fo0a7zhqk-acme-a675.vercel.app
- [ ] Higher-fidelity/photo-grade source-cleared art, real Xbox Edge/mobile screenshot verification and owner final approval before merge. Complete concept-art coverage alone does not finish photo-grade fidelity.

## Progress journal

- **2026-10-25 — visual foundation (commit `a82347e4`):** audited source/main, created the isolated feature branch, documented all seven visual tracks and set up the first asset manifest/testing infrastructure. Draft [PR #41](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/pull/41) is open. [GitHub Actions run 40242251840](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40242251840) passed source sync, Node tests including media registry, eight-tool Chromium smoke and responsive Hit Zone checks. Vercel preview reported READY. New non-Hit-Zone visuals are **not yet shipped**; the next step is the first Combat DB image pilot.

- **2026-10-25 — Combat DB illustrated pilot:** added a 960×320 original representative M416 field illustration (not official/photographic), responsive `visual-assets.css`, a visible image card and M416 detail art with clear fallback for all other weapons. Registered source/rights, kept every weapon statistic and Model 2 calculation untouched. Added art/manifest regression tests. After adding a correct SVG MIME mapping to the local test server, [CI run 40243494382](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40243494382) passed **134 Node tests, source sync, real Chromium image decoding/weapon modal fallback, all eight tool regressions and 320–1280px Hit Zone QA**. Vercel reported preview READY for commit `63093cd2`, at https://help-clan-pubg-toolkit-44ze3y6rf-acme-a675.vercel.app/#panel-combat. **Manual appearance review and production release are not complete.**

- **2026-10-25 — Batched six-panel original art pass:** optic illustrations for 1x/2x/3x/4x/6x/8x/15x with dynamic scope image; four attachment category tiles with current selection text; backpack and category art; reference graphics for Range, TTK and Recoil. All assets locally hosted and recorded in manifest. Scope/attachment/backpack visual state is presentation-only in `visual-controls.js`. These are representative SVG illustrations, **not** official equipment images or a complete visual catalogue. Full item-by-item artwork, device review and release remain unchecked. [Batch CI run 40244407117](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40244407117) passed and Vercel preview for commit `20e48831` reported READY.

- **2026-10-25 — Larger weapon/equipment art batch:** added original, non-official vector illustrations for AKM, Beryl M762, Kar98k, Mini 14, M24, P90, S12K, AWM (plus existing M416: **nine exact-name weapons total**), and distinct Jammer Pack artwork. Shared static `visual-catalog.js` contains exact-match mapping; Combat DB modal, Range, TTK primary/comparison, Recoil and Attachments show selected-weapon art without changing any calculation. Nonillustrated weapons explicitly display a missing-art state. Optic tile follows magnification; pack switches standard/Jammer art. Added browser and source tests; CI and preview must be verified after this commit. Full per-weapon artwork and photorealism, physical-device QA and final user approval remain open.

- **2026-10-25 — Nine-weapon batch verification:** [GitHub Actions #40246066002](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40246066002) passed source sync, Node registry checks, all eight tools in Chromium and mobile/desktop hit-zone checks. Vercel marked commit `fdda902a` READY. Additional Chromium test decoded **all nine** catalogue SVGs at 960×320; verified in Actions #40246179094. PR #41 remains **draft**, with no changes to live `main`.

- **2026-10-26 — full 45-weapon conceptual art batch:** 36 additional small original class-specific side-profile SVGs (45/45 named weapons illustrated), exact-name dictionary retained, decorative table thumbnails with lazy load and graceful error fallback, across Combat DB, TTK, Range, Recoil and Attachments. No calculator source or approved Model 2 imagery changed. Separate **photorealistic/canonical game art** still requires rights-cleared inputs. Automated test coverage expanded to every registered image and search/table interactions. [GitHub Actions #40250316674](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40250316674) passed the 45-weapon art batch; the new [7-tool, four-width geometry run #40250452348](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40250452348) also passed. Vercel READY for commit `aae3f44f`. **Do not merge without owner's explicit final preview approval.**

- **2026-10-26 — layout verification batch:** added real Chromium seven-panel media geometry tests at 320/390/768/1280 px, enforced as a pull-request CI step. Default Scope Matcher optic thumbnail now uses eager loading (only visible startup artwork), with remaining offscreen image files lazy-loaded. [GitHub Actions #40250452348](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40250452348) passed the new 320/390/768/1280px checks on all seven illustrated panels, alongside existing Node and Hit Zone regression checks.
