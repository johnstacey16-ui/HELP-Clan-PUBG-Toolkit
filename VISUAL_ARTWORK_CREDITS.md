# HELP Clan PUBG Toolkit — Visual Artwork Credits

Last audited: 2026-10-26 · Draft PR #41 (`feature/toolkit-visual-upgrade`).

## What the imagery represents

The illustration library consists of **original, non-official conceptual graphics made for the toolkit**. They are not photographs, exact 3D models, official game screenshots, or evidence of PUBG weapon appearance or attachment compatibility.

- **45 stylised weapon side profiles**: local artwork mapped by exact database weapon names in `visual-catalog.js`. **Combat DB is text-only until a specific weapon row is opened**; its detail popup then loads that weapon's art. No thumbnails or unsolicited M416 image occupy the table. Different weapon classes may reuse a general silhouette style. Labels, damage values and performance data come only from the existing combat database, never from the illustrations.
- **Representative optics**: magnifications 1×–15×, with distinct Red Dot, Holographic and Iron-sight art. The additional 1× artwork chooser is strictly visual; sensitivity calculations do not change.
- **Equipment categories**: backpacks (levels 1, 2 and 3), Jammer Pack, ammunition, medical supplies, booster, grenade, helmet and vest, plus grip, muzzle and magazine concept illustrations. These do not establish item availability or equipped damage reduction.
- **Abstract reference diagrams**: range target, timer and recoil parameter board are illustrative, not sourced ballistic or measured per-shot spray patterns.
- **Model 2 Hit Zone Explorer**: the approved original fictional adult portrait remains an independent asset on which existing 13 interactive damage zones are overlaid.

Each asset's identifier, file size policy, expected dimensions, accessibility intent and creation/rights note is tracked in [`assets/visual-manifest.json`](assets/visual-manifest.json).

## Visual usage and player expectations

All images are served from `assets/` and do not link to third-party hosts. Informational illustrations have descriptive `alt` text; decorative row thumbnails use empty alternatives when adjacent weapon text provides the same information. Missing images must not suppress statistics or controls.

The toolkit's artwork is **not sponsored, authorised, endorsed or supplied by KRAFTON/PUBG Studios**. Product and weapon names are used to describe the related game data in the toolkit, not to suggest an official relationship. If official/licensed media is introduced later, record rights and attribution separately and do not replace originals without explicit project review.

Artwork remains secondary to readable text and numbers, 44px focusable optic variant controls, reduced-motion and high-contrast preferences, and compatibility with Xbox Edge and mobile browsers.

## Release note

PR #41 is in draft. Automated browser/geometry tests are not a substitute for **hands-on** Xbox Series S Edge, phone, and screen-reader verification. Only the repo owner can sign off on the completed visual preview; do not merge into `main` until they explicitly approve it.
