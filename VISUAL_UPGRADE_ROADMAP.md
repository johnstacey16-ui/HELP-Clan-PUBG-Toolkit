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
- [x] **P3 — Combat Database (original art / compact mobile UI pass)**: every weapon opens its exact illustration **only when selected**; searchable, sortable 45-row table stays image-free on mobile. Higher-fidelity artwork and physical device review remain separate release tasks.
- [x] **P4 — Attachments and Recoil (original artwork pass)**: five equipment tiles reflect selector choices, distinguish suppressors/compensators/grips/magazines, hide when None/disabled, and pass CI at six responsive widths. Photo-accurate game art remains separate.
- [ ] **P5 — Effective Range**.
- [ ] **P6 — TTK Calculator**.
- [ ] **P7 — Recoil Analyzer**.
- [x] **P8 — Tactical Loadout / Backpack (representative artwork and responsive-controls pass)**: standard/Jammer gear art, six categories, correct original carrying maths and accessible 44px stepper buttons passed Chromium; real Xbox and phone inspection still required before release.
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

- [x] Original red-dot/holographic/iron-sight and 1×/2×/3×/4×/6×/8×/15× representative optic illustrations added, explicitly non-official.
- [x] Matching reference optic displays beside the selector; 1× variant buttons change artwork only, not sensitivity values or conversion table.
- [x] Chromium tests verify scope and 1× variant art mapping, Red Dot/Holo/None attachment visuals, preserved pixel speed, all assets loading and scoped error fallback.
- [x] Original `pixelSpeed` / `matchedSens` functions and user-supplied A/B constants were not edited; the full source-sync and scope regressions passed in Actions.
- [ ] Phone/Xbox keyboard/focus and layout regression.

## P3. Combat DB (tool 02)

- [x] Build an **original, representative 45-weapon concept-art catalogue** (initial M416 pilot plus 44 additional exact-name entries). 960×320 SVG source, not official screenshots, registered with licensing/provenance notes; higher-fidelity licensed/photo art remains a separate unfinished task.
- [x] Display matching exact-name weapon concept art **inside weapon-detail popups only**. Following owner mobile screenshot feedback, removed the row thumbnails and unsolicited M416 featured card to reclaim table space; tapping/Enter on a row opens its selected artwork. Unknown asset names still use a no-art fallback.
- [x] Provide an explicit no-image text state and broken-file fallback; art is labelled representative and never substituted for another weapon.
- [x] Added compact helmet/vest visual reference key to Combat DB header; armour thresholds, weapon statistics and sticky table heading are unchanged.
- [x] Validated all 45 exact-name original weapon illustrations against the WEAPONS source; each image decodes and wrong-weapon art is never substituted.

## Hit Zone Damage Explorer (tool 03) — frozen approved reference

- [x] Original fictional adult Model 2 photo, 13 body zones, persistent damage labels, helmet/vest, damage/HTK/heatmap/theoretical shells have already shipped through PR #40.
- [x] Automated Chromium regression after shared image CSS changes verified Model 2 alignment, all 13 zones and phone/desktop layout; real Xbox Edge and physical-device verification remain separate unchecked release tasks.
- [x] Approved Model 2 image, the 13 hit-zone geometries and all calculation formulas remain unchanged during the full visual branch; source-sync and hit-zone checks pass.

## P4. Attachments & Recoil (tool 07)

- [x] Built locally hosted, original representative optics, muzzle devices, grip styles, stocks and magazines with exact selected-option labels and no invented model-specific numbers.
- [x] Present selected attachment names in compact responsive tiles and a matching selected-weapon artwork strip, leaving compatibility selectors unaffected.
- [x] Weapon-specific attachment compatibility and recoil calculation modules were left unmodified; existing attachment and Chromium smoke regressions passed.
- [x] All five attachment image tiles fit a two-column 320px layout; Chromium six-width geometry and eight-tool interactions passed [Actions #40265140045](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40265140045). Manual Xbox Edge review remains open.

## P5. Effective Range & Damage (tool 04)

- [x] Added restrained original target reference and exact-name selected-weapon art to Effective Range, separate from charts and checkpoint values.
- [x] Keep observed checkpoints/`No data` distinct: source notes and existing readouts are unchanged and displayed before optional artwork; range and shotgun regressions passed GitHub Actions #40271693306.
- [ ] Test charts, input selection, weapon switching, shotgun theoretical labels and source warnings.

## P6. TTK Calculator (tool 05)

- [x] Add dynamic, exact-name weapon comparison thumbnails for A/B/C in TTK, with explicit missing-art fallback for nonillustrated weapons.
- [x] Primary TTK damage, hits-to-kill, reload notes and numerical A/B/C comparison table now appear before any optional, collapsed-by-default artwork; Chromium browser checks and responsive layout passed.
- [x] Decouple TTK single-weapon and A/B/C comparison images from calculations; exact name lookup and fallback are verified for illustrated and nonillustrated choices.
- [x] No HTK/TTK formula or weapon reload source was changed for the visual rollouts; source-sync and calculator smoke tests passed.

## P7. Recoil Analyzer (tool 06)

- [x] Add dynamically updated exact-name weapon illustration beside the existing abstract recoil-parameter reference (no fabricated shot pattern).
- [x] Preserved the prominent **COMING SOON / IN DEVELOPMENT** banner for unreleased shot-by-shot analysis; verified by existing launch-polish regression.
- [x] Recoil evidence/COMING SOON notice and weapon parameter table remain fully visible above an optional art expander. No synthetic recoil trace; Chromium verified the controls and layout.
- [ ] Verify responsive chart behavior and reduced-motion preference on real Xbox/mobile hardware (Chromium automated smoke passed; physical-device review remains).

## P8. Tactical Loadout & Backpack (tool 08)

- [x] Illustrated Standard backpack Levels 1/2/3, Jammer Pack, helmet/vest, ammunition, healing, boosters and throwables with original local vector images. This is a representative visual reference, not official inventory art.
- [x] Backpack selection heading follows Standard vs Jammer Pack and selected level; distinct art is labelled representative and does not replace the original capacity labels.
- [x] Left existing carry weight, capacity, +50 vest boost, Jammer mode maths and item list controls untouched; browser regressions passed.
- [x] Chromium tested every inventory stepper at all 320/360/390/768/1280/1440px widths, verified minimum 44×44px targets, item-specific accessible names, and +/- recalculation round-trip. Physical-device verification remains an open P10 gate.

## P9. Cross-tool polish

- [x] Artwork now uses bounded, aspect-contained tiles, consistent dark navy/cyan/gold borders and captions, accessible fallback text and responsive image geometry; CI validated 320/390/768/1280px.
- [x] Keep the navigation and dense Combat DB table **text-first**, deliberately avoiding images that shrink mobile hit targets; artwork is reserved for selected weapon details and helpful illustrations elsewhere.
- [x] Added `VISUAL_ARTWORK_CREDITS.md`, linked from README, documenting the origin and limitations of the original/representative media library and explicitly disclaiming official PUBG endorsement.
- [x] Visual-media CSS remains non-overlaying (no added fixed/absolute images); automated Chromium geometry verified the seven illustrated panels at 320, 360, 390, 768, 1280 and 1440px. Real Xbox visual inspection is still pending.

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

- **2026-10-26 — equipment illustration batch prepared:** new original Level 1 and Level 2 backpack graphics (existing Level 3 and Jammer art retained), booster/helmet/vest concept illustrations; six-category backpack strip with vest status following the unchanged equipment control; compact Combat DB helmet/vest explanation key. Added browser and asset/logic isolation regressions. [GitHub Actions #40254604267](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40254604267) passed source sync, unit tests, all eight tools in Chromium, and seven-panel geometry at 320/390/768/1280px. [GitHub Actions #40254725473](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40254725473) confirmed all 45 weapon and 5 newly added equipment SVGs decode in real Chromium, with all Node regressions, eight-tool interactions and seven-panel geometry checks passing. This is still fictional concept art and does not represent exact official PUBG equipment.

- **2026-10-26 — equipment media verification:** Completed the five-image backpack/armour/booster batch and checked off P3 helmet/vest visual key and P8 equipment visual categories. Real Chromium verified Standard Backpack L1/L2/L3, Jammer selection, vest selected/unselected captions, and 50 image decodes; [Actions #40254725473](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40254725473) passed, Vercel preview READY at `e6775dc0`. No formula changes or Model 2 changes; **PR #41 stays draft until owner approves full preview**.

- **2026-10-26 — Optic illustration fidelity and image-failure batch (pending CI):** added distinct original Red Dot, Holographic and Iron-sight thumbnails, with three purely visual 1× variants that do not change sensitivity; attachment optics now represent actual selected Red Dot / Holographic categories and hide art for None. Scoped accessible fallback for failed static illustrations and image restore after loading. Browser smoke expanded from a 50-image subset to **all manifest assets including Model 2**; MIME types for the test server include WebP. CI and production release statuses still require verification; PR #41 remains draft.

- **2026-10-26 — optic fidelity and image-fallback verification:** Created separate original Red Dot, Holographic and Iron 1× illustrations, with 1× visual-choice controls that do not affect sensitivity maths. Attachment optic artwork now represents the chosen Red Dot/Holo and hides on None. Accessible image-load failure text is scoped to visual-only elements. [GitHub Actions run 40259617005](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40259617005) passed source sync, Node tests, all eight browser tools, **all 72 registered image decodes (including Model 2)**, Hit Zone geometry and seven-panel responsive checks. Vercel reported preview READY at `d58bf768`. **Physical Xbox/mobile appearance review, higher-fidelity licensed art and owner approval are still outstanding; PR #41 remains draft.**

- **2026-10-26 — robust full-asset browser runner and cross-tool display polish (verification pending):** Chrome had emitted a complete passing DOM but failed to exit in Actions #40259761265 after 72 image decodes. The smoke runner now records a terminal complete DOM, allows a short Chrome shutdown grace period, accepts explicit harness shutdown only after a verified full passing document, and fails hard timeouts. Added 360px and 1440px geometry widths, focusable 44px optic style validation, error/recovery checks, image depth/contrast/reduced-motion styles and `VISUAL_ARTWORK_CREDITS.md`. Manual Xbox Edge/phone and high-fidelity rights-cleared photography still not done. [GitHub Actions #40261145509](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40261145509) passed the updated runner, 145+ Node regressions, eight-tool smoke, image decoding, Model 2 checks and all six widths.

- **2026-10-26 — full Chromium QA recovery confirmed:** [Actions #40261145509](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40261145509) **passed**: robust browser-runner shutdown after a completely verified DOM, all-eight-tool Chrome checks including complete local image manifest, Hit Zone and six media-layout widths **320/360/390/768/1280/1440**. Also checked keyboard focus/44px 1× optic style controls, art-failure/recovery visibility, added material-depth/high-contrast/reduced-motion CSS and documented source/fictional-image credits. Vercel preview READY for commit `58068f07`. Manual Xbox Series S Edge, physical-mobile/assistive-tech review, and high-fidelity/photo art remain unchecked; PR #41 still draft.

- **2026-10-26 — attachment-specific artwork batch (verified):** introduced original representative suppressor, compensator, flash hider, vertical/angled grip, rifle stock and extended-magazine silhouettes. The fifth Stock media tile completes five attachment categories. Category images now follow the existing selector values, hide when none/disabled, and update after weapon compatibility or presets without touching underlying attachment math. Two-column phone layout and extra Chromium behaviour checks added. [Actions #40265140045](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40265140045) passed 150+ Node tests, eight-tool Chromium smoke including all **79 registered images**, six viewport layouts and Hit Zone regression. All artwork remains non-official illustration.

- **2026-10-26 — user-requested compact Combat DB mobile correction (pending CI):** user screenshot showed illustrative 45-weapon thumbnails taking too much horizontal table space. Removed **all** row thumbnails, the automatic M416 pilot card and its event hooks; table is compact name/class/stat text. Illustrations remain in selected weapon detail popups (tap or keyboard Enter), including exact 45-weapon artwork. The separate helmet/vest explanation is retained. Updated browser keyboard/tap/search checks, six-viewport geometry and removed obsolete thumbnail CSS. Source/math, Model 2 and production untouched. Confirm passing CI before marking done.

- **2026-10-26 — owner screenshot feedback resolved:** removed all decorative weapon-row thumbnails and the unsolicited featured M416 image from Combat DB. Weapon name/class/damage/RPM rows remain clean, searchable, sortable and keyboard-operable; art is shown only when that weapon's details are opened. Cleaned up obsolete CSS and updated the credits; automated real Chromium clicked M416, Enter-opened AKM, tapped SKS, verified search returned one text-only row and then all 45, and passed source-sync/Node suites, Hit Zone, and 320/360/390/768/1280/1440px responsive layouts in [Actions #40266254659](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40266254659), commit `60de0746`. Vercel branch preview was READY. **No production merge, still pending owner final review and real Xbox/mobile visual signoff.**

- **2026-10-26 — selected-weapon popup controller/keyboard polish (verified):** opening a weapon row now focuses the modal close control, traps Tab there, and restores focus to the original row after Close or Escape. Expanded hit target to 44×44px; no weapon pictures appear in table rows. Real Chromium clicked M416, keyboard-opened AKM, checked Escape and focus return, verified exact selected art, and confirmed search/table rows stayed text-only. [GitHub Actions #40267136731](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40267136731) **passed** Node/source sync, eight-tool Chrome interactions, Model 2 geometry and six responsive widths for commit `c8db67d6`. Production and all calculations remain unchanged; physical Xbox/mobile review and owner release approval remain open.

- **2026-10-26 — Backpack controller/mobile controls batch (verified):** increased every existing inventory +/- button from 36×38 to at least 44×44 px, made quantity fields at least 44px high and gave all row input/stepper buttons precise, item-specific screen-reader/controller labels. Added dense-list geometry checks at 320/360/390/768/1280/1440px plus actual +/-/weight-recalculation round-trip tests in Chromium; did not edit the 70 base capacity, +50 vest bonus, capacity tiers or item weights. [Actions #40271148548](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40271148548) passed all Node/source checks, eight-tool real-Chromium interactions, Model 2 geometry and six-width layouts. Vercel preview was READY for code commit `f1641a45`. Real Xbox hardware remains unverified.

- **2026-10-26 — Data-first Range/TTK/Recoil batch (verified):** moved illustration banners and selected-weapon artwork into optional native `<details>` sections **after** the Range damage result, TTK damage/HTK/timing result, and Recoil evidence/parameter table. Moved the TTK A/B/C artwork after its numeric comparison table. Media is collapsed until intentionally expanded; 48px summaries work with keyboard, Xbox and touch. Browser and six-width geometry tests now check collapsed defaults and expanded art. No changes to Combat DB rows, Hit Zone geometry, damage formula or weapon data. [GitHub Actions #40271693306](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40271693306) passed all Node tests, eight-tool Chromium interaction tests, Model 2 geometry and seven illustrated-tool responsive checks at 320/360/390/768/1280/1440px; manual Xbox/mobile review still outstanding.
