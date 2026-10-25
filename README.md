# HELP-Clan-PUBG-Toolkit

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

This toolkit has a single HTML page with seven client-side tool sections. Standard Web Analytics tracks the **site's page views**, not distinct clicks between its internal tools. Tracking internal tool usage would require separately designed events (subject to the Vercel plan's event support) or deliberate URL routing. Do not alter the Scope Sensitivity Matcher merely to create tracking events.

Further reference: https://vercel.com/docs/analytics/quickstart

## Code organization (25 October 2026)

The static site works without npm, bundling, or a framework. JavaScript now lives in five ordered files loaded synchronously at the end of `index.html`:

1. `js/app-navigation.js` — seven-tool sidebar, history and mobile menu.
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

Alongside `node --test tests/*.test.cjs`, run `node tests/browser-smoke.cjs` to launch an installed Chrome/Chromium browser against a temporary localhost server. No npm dependencies or external game data are required. This exercises the **actual committed HTML and JS** (including mobile navigation, scope matching, range, TTK, recoil evidence, magazine switching and Jammer backpack totals). GitHub Actions runs this on every pull request and push. Use `CHROME_BIN=/path/to/chromium` if Chrome is not on your PATH. The smoke page stays under `tests/` and is not linked from the public seven-tool app.

Chrome checks test the **static site**, not the status of a production Vercel deployment.
