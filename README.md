# HELP-Clan-PUBG-Toolkit

## Hit Zone Damage Explorer — work in progress

The feature's persistent plan is [HIT_ZONE_EXPLORER_ROADMAP.md](HIT_ZONE_EXPLORER_ROADMAP.md), with the technical specification at [docs/hit-zone-explorer-architecture.md](docs/hit-zone-explorer-architecture.md). The Hit Zone Explorer's calculations, SVG, controller and browser tests are implemented and documented. See the [roadmap](HIT_ZONE_EXPLORER_ROADMAP.md) for the currently verified release/deployment status; a passing branch test is not by itself proof of production deployment.

To continue in another chat: **"Continue the Hit Zone Damage Explorer in johnstacey16-ui/HELP-Clan-PUBG-Toolkit from HIT_ZONE_EXPLORER_ROADMAP.md. Work on the next unchecked task and update the roadmap when done."**


## Hit Zone Damage Explorer (eighth tool)

The Hit Zone Explorer was developed in [PR #39](https://github.com/johnstacey16-ui/HELP-Clan-PUBG-Toolkit/pull/39). It adds the eighth sidebar tool. Check the [roadmap](HIT_ZONE_EXPLORER_ROADMAP.md) for the latest deployment status.

Use the **Hit Zone Damage Explorer** sidebar tool to select a weapon, a **recorded distance**, a helmet level and a separate vest level. A single **front-facing body map** immediately shows the numeric result in **all 13 hit zones**, with left and right limb values mirrored. Clicking a zone is optional and reveals the multiplier breakdown. Screen-reader users have labelled keyboard-focusable SVG hit areas with announced selection state and an equivalent 13-row, captioned results table. HTK labels say “N hits” and explicitly assume 100 HP and repeated hits on the same region.

Available display modes:
- **Damage** — calculated damage to a single exact zone at the selected published checkpoint, or **No data** where unavailable.
- **Hits to kill** — theoretical repeated same-zone 100-HP hit count derived from that damage.
- **Heatmap + damage** — the same source-backed damage values with relative colouring.
- **Shotgun: theoretical minimum shells (all pellets hit)** — only selectable for sourced pellet shotguns; explicitly assumes *every pellet of every shell* hits one exact body region. This is **not** actual whole-shell damage, average shells to kill, or time to kill. For actual shotgun damage and HTK, the ordinary modes continue showing **No data**. Slug shotguns use the normal recorded damage model.

Model scope: the standard intact **helmet** covers the head and neck; the standard intact **vest** covers clavicle, chest, two stomach sections and pelvis; **neither protects limbs**. No interpolation or extrapolation between measured distances, armour-durability simulation, pellet spread simulation, or gameplay-dynamic movement assumptions. Per-weapon source disagreements are documented in [hit-zone-source-check](docs/hit-zone-source-check-2026-10-25.md), not silently overwritten.

Code: `src/calculators/00-damage-ballistics.part` contains the pure all-zone adapter, `src/calculators/45-hit-zone-explorer.part` handles the SVG interface, and `src/explorer/hit-zone-explorer.fragment.html` plus `.scaffold.css` define the viewer. `scripts/build-static.cjs` assembles the generated `js/toolkit-calculators.js` from the ordered parts.

Tests:
```sh
node scripts/build-static.cjs --check
node --test tests/*.test.cjs
node tests/browser-smoke.cjs
node tests/hit-zone-preview-smoke.cjs
```
The optional `node tests/hit-zone-visual-capture.cjs` developer helper captures a real Chrome mobile screenshot for design review; add `--desktop` for a 1440px screenshot. It is **not** part of default CI because it intentionally prints screenshot data for temporary inspection.

## Vercel Web Analytics

This is a static HTML/JavaScript site, **not** a Next.js/React application. Its analytics integration uses Vercel's official first-party script directly in `index.html`:

```html
<script defer src="/_vercel/insights/script.js"></script>
```

No npm install, React `<Analytics />` component, build dependency, or custom API key is required.

To start viewing traffic:

1. Open the Vercel project **help-clan-pubg-toolkit**, go to **Analytics**, and click **Enable** if that option is shown.
2. Deploy the version of `main` containing the HTML script. Enabling Analytics adds the tracking route to the following deployment, so redeploy after enabling if necessary.
3. Visit the production URL (`https://help-clan-pubg-toolkit.vercel.app`) after the new deployment is ready.
4. Return to Vercel **Analytics** to see visitors and page views. If the dashboard still has no data, inspect the browser Network panel for `/_vercel/insights/script.js` and a tracking request; blockers and privacy settings can prevent collection.

This toolkit has a single HTML page with eight client-side tool sections. Standard Web Analytics tracks the **site's page views**, not distinct clicks between its internal tools. Tracking internal tool usage would require separately designed events (subject to the Vercel plan's event support) or deliberate URL routing. Do not alter the Scope Sensitivity Matcher merely to create tracking events.

Further reference: https://vercel.com/docs/analytics/quickstart

## Code organization (25 October 2026)

The static site works without npm, bundling, or a framework. JavaScript now lives in five ordered files loaded synchronously at the end of `index.html`:

1. `js/app-navigation.js` — eight-tool sidebar, history and mobile menu.
2. `js/shared.js` — the shared `PT` namespace.
3. `js/combat-database.js` — weapon and recoil registries, Combat DB and armor logic.
4. `js/sensitivity.js` — unchanged owner-built sensitivity calculations.
5. `js/toolkit-calculators.js` — damage/range/TTK, attachments and backpack models.

Keep this order: downstream calculators use the Combat DB's `PT.WBYNAME` and `PT.WEAPONS`. Plain `<script src>` (without async/defer) preserves the original execution sequence. Tests hydrate the actual external files for existing formula checks. Run `node --test tests/*.test.cjs` after code changes.

## Editing source files

For safer data and calculator work, the two larger browser scripts are also divided into **editable, ordered source sections**:

- `src/combat/00-weapon-data-armor.part` and `10-combat-rendering.part` separate weapon/recoil registries and armor maths from the Combat DB interface.
- `src/calculators/` separates damage/ballistics, effective range, TTK, recoil evidence, attachments, and backpack maths.

These `.part` files intentionally share the original lexical closure, so **they are source fragments, not independently loadable browser scripts**. After changing one, run `node scripts/build-static.cjs` to regenerate the two committed browser files; `node scripts/build-static.cjs --check` (also covered by tests) detects out-of-sync outputs. Vercel still directly serves plain `index.html` and static assets with no dependencies, build command or analytics changes. Do not edit the generated `js/combat-database.js` or `js/toolkit-calculators.js` in isolation.

## Real-browser regression checks

Alongside `node --test tests/*.test.cjs`, run `node tests/browser-smoke.cjs` to launch an installed Chrome/Chromium browser against a temporary localhost server. No npm dependencies or external game data are required. This exercises the **actual committed HTML and JS** (including mobile navigation, scope matching, range, TTK, recoil evidence, magazine switching and Jammer backpack totals). GitHub Actions runs this on every pull request and push. Use `CHROME_BIN=/path/to/chromium` if Chrome is not on your PATH. The smoke page stays under `tests/` and is not linked from the public toolkit app.

Chrome checks test the **static site**, not the status of a production Vercel deployment.

## Weapon data evidence checks

`node --test tests/magazine-recoil-evidence-invariants.test.cjs` guards weapon-specific magazine rules and missing recoil values. The full `tests/browser-smoke.cjs` run now switches through all 45 weapons and tests available magazine choices and the absence of fabricated recoil traces. `MAG_CAP_EVIDENCE` distinguishes official examples from cross-source reconciliations in the development code. Research and evidence classifications remain in `DATA_ACCURACY_POLICY.md`, not a new public research tab.
