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

The checked foundation items include the initial Combat DB **illustrated M416 pilot**; **all 7 target tools now have an initial original illustration pilot, 0 of 7 has a completed full artwork catalogue**. Photo-grade cataloguing and all other tools are pending.

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
- [ ] Document source/permission for any use of official or third-party PUBG imagery; otherwise use original assets labelled as representative where exact equipment appearance cannot be verified.
- [ ] Visual screenshot review at 320, 360, 390, 768, 1280 and 1440 pixels and Xbox Series S Edge where possible.

**Budgets for this rollout:** total committed images at most **1.5 MiB** without explicit budget revision; normal thumbnail **≤90 KiB**, icon **≤60 KiB**, hero/illustration **≤180 KiB**. Prefer WebP/AVIF, no remote hotlinked images, no autoplay, and use lazy loading for noncritical images. Respect mobile/Xbox network and memory. If showing many weapon thumbnails, use a staged catalogue/on-demand loading rather than eagerly downloading every weapon.

## P2. Scope Sensitivity Matcher (tool 01)

- [ ] Establish visual language: clean icon/thumbnail set for red dot/holographic/2×/3×/4×/6×/8× sights, clearly marked representative when not officially sourced.
- [ ] Place a corresponding scope image near the selected optic; do not obstruct editable sensitivity fields, conversion results or horizontal result table.
- [ ] Verify the scope selector maps to the correct image and graceful fallback if no image exists.
- [ ] Verify **original `pixelSpeed` / `matchedSens` functions and supplied A/B constants remain byte-for-byte unchanged**.
- [ ] Phone/Xbox keyboard/focus and layout regression.

## P3. Combat DB (tool 02)

- [x] Build an **original, representative M416 illustration pilot** and register it in the image manifest; local SVG is 960×320 and is not presented as an official game screenshot. A full source-backed weapon thumbnail catalogue remains pending.
- [x] Display the M416 artwork in its weapon detail and a visible Combat DB pilot card. Other weapons show a **no-artwork** fallback rather than the wrong rifle. A full per-weapon image lookup remains pending.
- [x] Provide an explicit no-image text state and broken-file fallback; art is labelled representative and never substituted for another weapon.
- [ ] Optionally add a small visual key for helmet/vest, but preserve precise damage/armour tables, numbers and stickied table header.
- [ ] Test all weapon names/image lookup and no missing source data; never substitute a different gun image.

## Hit Zone Damage Explorer (tool 03) — frozen approved reference

- [x] Original fictional adult Model 2 photo, 13 body zones, persistent damage labels, helmet/vest, damage/HTK/heatmap/theoretical shells have already shipped through PR #40.
- [ ] After any shared visual CSS changes, check figure alignment, all 13 labels, keyboard/touch interactions and tablet/mobile legibility.
- [ ] Keep the model artwork, geometry and formulas unchanged unless the owner specifically requests a separate change.

## P4. Attachments & Recoil (tool 07)

- [ ] Build compact original/licensed images for optics, muzzle devices, grips and magazines; use accurate type labels, not guessed model-specific stats.
- [ ] Display current attachment selection without crowding dependent controls.
- [ ] Handle incompatible attachments gracefully and preserve weapon-specific compatibility filters and recoil calculations.
- [ ] Ensure no images cover comparison values or controls at 320px.

## P5. Effective Range & Damage (tool 04)

- [ ] Create restrained range/ballistic or target imagery, preferably a compact background/diagram beside — not underneath — graphs and checkpoint values.
- [ ] Keep observed checkpoint and `No data` distinctions unambiguous.
- [ ] Test charts, input selection, weapon switching, shotgun theoretical labels and source warnings.

## P6. TTK Calculator (tool 05)

- [ ] Add weapon comparison thumbnails that clearly distinguish weapon A/B (where comparison is supported).
- [ ] Keep hits-to-kill, reload notes, comparison charts and tabular data dominant.
- [ ] Confirm changing weapon/armour updates image and results independently without stale placeholders.
- [ ] Do not change any HTK/TTK formula or weapon reload evidence.

## P7. Recoil Analyzer (tool 06)

- [ ] Introduce weapon imagery or a restraint-focused recoil diagram/trace key without fabricating per-shot data.
- [ ] Preserve prominent **COMING SOON / IN DEVELOPMENT** declaration for full shot-by-shot analysis.
- [ ] Keep existing evidence limits, charts and parameters readable; no deceptive illustrative spray pattern.
- [ ] Verify responsive chart behavior and reduced-motion preference.

## P8. Tactical Loadout & Backpack (tool 08)

- [ ] Add compact category images for backpack levels, helmet/vest, ammunition, healing, boosters and throwables.
- [ ] Use visible sizes/capacity labels and exact selection state; distinguish representative art from verified game inventory art.
- [ ] Preserve carry weight, capacity, vest boost and Jammer calculations and all item list controls.
- [ ] Test dense mobile cards and tap targets.

## P9. Cross-tool polish

- [ ] Standardise image aspect ratios, rounded corners, borders, crop handling, placeholder colors, badge placement and responsive spacing.
- [ ] Ensure the nav/sidebar and headers benefit from imagery **only if** it improves recognition without shrinking navigation targets.
- [ ] Add consistent source/fictional-art attribution in project docs where appropriate; avoid official endorsement claims.
- [ ] No overlay/fixed image should cover controls or cause page horizontal overflow.

## P10. Verification, approval and release

- [ ] `node scripts/build-static.cjs --check`.
- [ ] `node --test tests/*.test.cjs` including the visual-asset registry test.
- [ ] `node tests/browser-smoke.cjs` for all eight existing tools.
- [ ] `node tests/hit-zone-preview-smoke.cjs` and any new visual screenshots for relevant seven tools.
- [ ] Verify broken asset fallback, alt text, lazy/eager priority, mobile/LCP performance budget and no layout shifts.
- [ ] Browser review on real desktop, mobile and Xbox Edge; include keyboard and contrast/reduced-motion checks.
- [ ] Publish a Vercel **preview** for the feature branch, record exact URL and commit here.
- [ ] Get explicit owner visual approval for the complete preview. **No merge to main before this.**
- [ ] Merge reviewed PR, confirm production Vercel READY and post-merge Actions green.
- [ ] Update this roadmap with release commit and what, if anything, needs manual follow-up.

## Implementation order and update discipline

The first on-screen pilot is **Combat DB (original M416 SVG plus reusable responsive pattern)**, then Scope Matcher, then Attachments, followed by Range, TTK, Recoil and Backpack. This reduces risk before expanding to a full artwork catalogue.

When a task is done, change its literal `- [ ]` to `- [x]` **in GitHub**, alongside the source/asset/test commit. State the exact commit, CI/preview status and any limitations in the PR or below. Never mark a browser preview or asset as delivered on the basis of a plan alone. Keep existing tool-specific [Hit Zone Explorer roadmap](HIT_ZONE_EXPLORER_ROADMAP.md) as an independent reference.

## Progress journal

- **2026-10-25 — visual foundation (commit `a82347e4`):** audited source/main, created the isolated feature branch, documented all seven visual tracks and set up the first asset manifest/testing infrastructure. Draft [PR #41](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/pull/41) is open. [GitHub Actions run 40242251840](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40242251840) passed source sync, Node tests including media registry, eight-tool Chromium smoke and responsive Hit Zone checks. Vercel preview reported READY. New non-Hit-Zone visuals are **not yet shipped**; the next step is the first Combat DB image pilot.

- **2026-10-25 — Combat DB illustrated pilot:** added a 960×320 original representative M416 field illustration (not official/photographic), responsive `visual-assets.css`, a visible image card and M416 detail art with clear fallback for all other weapons. Registered source/rights, kept every weapon statistic and Model 2 calculation untouched. Added art/manifest regression tests. After adding a correct SVG MIME mapping to the local test server, [CI run 40243494382](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/actions/runs/40243494382) passed **134 Node tests, source sync, real Chromium image decoding/weapon modal fallback, all eight tool regressions and 320–1280px Hit Zone QA**. Vercel reported preview READY for commit `63093cd2`, at https://help-clan-pubg-toolkit-44ze3y6rf-acme-a675.vercel.app/#panel-combat. **Manual appearance review and production release are not complete.**

- **2026-10-25 — Batched six-panel original art pass:** optic illustrations for 1x/2x/3x/4x/6x/8x/15x with dynamic scope image; four attachment category tiles with current selection text; backpack and category art; reference graphics for Range, TTK and Recoil. All assets locally hosted and recorded in manifest. Scope/attachment/backpack visual state is presentation-only in `visual-controls.js`. These are representative SVG illustrations, **not** official equipment images or a complete visual catalogue. Full item-by-item artwork, device review and release remain unchecked. Check CI status after commit.
