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
