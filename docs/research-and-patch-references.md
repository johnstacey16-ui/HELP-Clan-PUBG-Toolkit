# HELP Clan — research, version and source references

**Internal project notes — not part of the public toolkit UI.**

This document replaces the previous “Data & Patch” tool tab. It preserves the research notes, patch history, provenance and outstanding accuracy issues in the repository, rather than displaying a documentation page to players. The original panel was archived here on 24 October 2026. Some older statements may be stale; re-verify them before making new accuracy claims.

For the current approach to both original, owner-authored formulas and measured game data, see [DATA_ACCURACY_POLICY.md](../DATA_ACCURACY_POLICY.md).

## Update 24 October 2026 — 43.1/43.2 LMG crouch recoil fix

- **M249 crouch recoil multiplier:** corrected **0.54 → 0.70**, as seen in the current game-derived 43.1–43.2 change log. Its derived reduction from standing changes from -46% to **-30%**.
- **MG3 crouch recoil multiplier:** corrected **0.50 → 0.60**, for derived -40% instead of -50%.
- **RPD:** verified .70 crouch factor already in the 43.2 record; filled the corresponding -30% derived display field rather than leaving it blank.
- Direct evidence: https://pubgplanet.com/wiki/changes (September 10, 2026 LMG modifications); https://pubg.gs/weapons/m249/ ; https://pubg.gs/weapons/mg3/ ; https://pubg.gs/weapons/rpd/ .
- These are weapon-level modifiers only. The full shot-by-shot recoil analyzer still has no measured trajectory and continues to show **Coming Soon**. No new artificial recoil curve, per-shot increase or guessed stance modifier was introduced.

## Update 24 October 2026 — verified magazine capacity and compatibility corrections

This follows the source-backed 43.2 inventory and attachment batch. It focuses on the **actual rounds loaded by specific weapons**, rather than a magazine attachment's own inventory-space weight. The public site remains concise.

- **Mk47 Mutant:** corrected supplied base capacity from 10 to **20** rounds; the official PUBG introduction says it can use an extended magazine up to 30. https://www.pubg.com/en/news/1733
- **Skorpion:** corrected supplied base from 10 to **20**, with an Extended Mag up to **40**. PUBG official console introduction confirms both. https://www.pubg.com/en/news/1728
- **M416:** official magazine rebalance documents **30 standard / 42 Extended / 40 Extended QuickDraw**. https://store.steampowered.com/news/posts/?appids=578080&enddate=1639957213&feed=steam_community_announcements
- **AWM and M24:** the 43.2 extracted DMR/SR item family lists an **8-round Extended** attachment versus **7-round Extended QuickDraw**. This applies to their 5-round base magazines; other DMRs use different per-weapon capacity multipliers. https://pubg.gs/attachments/
- **M249:** accepted AR/LMG magazine attachments were missing from the tool despite the game-file slot listing; restore them, with the sourced **75 standard / 150 Extended** capacity. The exact Extended QuickDraw count is left **No data** rather than assuming 150. https://pubg.gs/weapons/m249/ and https://pubg.wiki.gg/wiki/M249
- **RPD:** official Update 42.3 confirms **50 standard / up to 110 Extended**. Exact Extended QuickDraw capacity remains **No data**, and the toolkit's 3.5s placeholder reload time is now displayed as **No data** in the attachment screen, not a fabricated precise duration. https://pubg.com/en/news/10885
- **Tommy Gun, Vector, UMP9, MP5K, Micro Uzi, Skorpion, G18C/P18C, P92 and Desert Eagle:** legacy individual extended magazine figures continue to be represented as explicit weapon entries, not a universal percent. The documented SMG and pistol-capacity tables can be cross-checked here: https://pubg.wiki.gg/wiki/Extended_Mag_%28Handgun%2C_SMG%29
- **S12K:** the weapon-specific 5 → 10 extended magazine capacity is preserved. https://pubg.wiki.gg/wiki/S12K
- **Magazine compatibility corrected:** the Kar98k bolt-action rifle and R1895 revolver do not take an ordinary magazine attachment, and MG3 remains without one. The **M249** now correctly takes compatible AR/LMG magazines. https://pubg.gs/weapons/kar98k/ and https://pubg.gs/attachments/
- **For 30-round ARs without separate named entries**, a deliberately **modeled** 42/40 capacity comes from their shared 43.2 MagazineLarge attachment family. This is not independently verified per weapon: if a gun has an exception it must override the model. The attachment source lists 42 rounds for Extended and 40 rounds for Extended QuickDraw: https://pubg.gs/attachments/
- **For weapons where exact extended capacity isn't verified**, return No data instead of the previous universal +30%/+5 shortcut. QuickDraw without extension retains base capacity. Extended and Extended QuickDraw are calculated separately and the latter carries its documented +15% reload-speed bonus.
- The scope sensitivity, range/shotgun damage, damage multipliers and measured bullet-drop maths have **not** changed. Magazine rounds can affect weapon comparisons and reload-related calculations.

### Outstanding magazine questions
Verify 43.2 *per-weapon* Extended QuickDraw capacities for RPD, M249 and other class exceptions, and decide whether to support both AR/DMR and DMR/SR magazines for DMRs with two compatible families. There is no universal exact "extended magazine capacity" for every rifle.

## Update 24 October 2026 — expanded muzzle velocity coverage

- Source: https://pubg.gs/ballistics/ , generated from the PUBG **Update 43.2** Steam build 26072644 (extracted 2026-10-21).
- Added an explicit `GAME_MUZZLE_VEL_43_2` mapping for **44 of 45** toolkit weapons, using original `Projectile muzzle velocity` in m/s and manually reconciled aliases (G18C = P18C, Sawn-off = Sawed-Off, AKM, etc.). The extraction lists Vector muzzle velocity as missing; preserve the older observed **389 m/s** for Vector rather than invent a replacement.
- The Range panel now displays current 43.2 muzzle velocity when known. It has **not** acquired measured bullet-drop readings for the other 24 weapons. `DROP_TABLES` remains 21 source-derived data sets; unsampled drop and flight times remain **No data**.
- The earlier WinnerMeta `MEASURED_MUZZLE_VEL` map remains as an explicitly separate historical measurement set. It can differ substantially from game asset values (e.g. AKM 762 vs 43.2 game file 715 m/s; M416 921 vs 880). The current live display intentionally prefers game-asset velocities and falls back to older WinnerMeta only when the asset source lacks a value.
- This change affects displayed **velocity only**, not damage, drop, HTK, TTK, pellet connection probabilities, Scope Matcher formulas or recoil paths.

## Update 24 October 2026 — confirmed game-data and official patch fixes

This batch updates the **live backpack and attachment calculators**, and fills selected **RPD/P18C recoil fields**, without changing the Scope Sensitivity Matcher, measured range tables or shot-by-shot Coming Soon behavior.

### Backpack / Jammer Pack

- Standard and Jammer Pack each grant identical +150, +200, +250 capacity by level, verified in official Update 41.1: https://pubg.com/en/news/9926
- The former +50 Utility Belt benefit became part of the character's innate capacity in Update 28.2: https://www.pubg.com/en/news/7083 ; the old 20 innate plus 50 belt yields **70 base**, so modeled totals for both pack types are **220, 270, 320**. These totals **do not add an unconfirmed vest capacity**. Historical wiki pages showing 170/220/270 without a utility belt predate its integration.
- Added **5.7mm / P90 ammunition** at 0.35 space per round from the 43.2 game-file item row: https://pubg.gs/ammo/5-7mm/ .
- Fixed Lynx AMR to **optics-only** and P90 to have no external magazine/grip/muzzle selectable in the attachment calculator: https://pubg.gs/weapons/lynx-amr/ and https://pubg.gs/attachments/ .
- 9mm per round 0.375→**0.30** after Update 33.1's 20% weight reduction: https://d3tpthp8lq9ou3.cloudfront.net/en-asia/news/7988 and https://pubg.gs/ammo/9mm/
- 7.62mm 0.70→**0.60** after Update 34.1: https://pubg.com/en/news/8170 and https://pubg.gs/ammo/7-62mm/
- Med Kit 20→**15**, Painkiller 10→**6**, Adrenaline 20→**10** from official Update 42.1: https://pubg.com/en/news/10179
- Frag 18→**27**, Molotov 18→**16**, C4 20→**35** from the **standard-mode** item records in PUBG Update 43.2 / Steam build 26072644 (extracted 21 Oct 2026): https://pubg.gs/throwables/ . Event variants sometimes have space 1; those are excluded.
- Existing matching item values remain unchanged. These are inventory-space units, not real-world weights. The calculation still excludes carried gun/armor/attachment weight.

### Recoil data

- Added RPD weapon-level record from PUBG 43.2 game extraction: max vertical recoil 7.5, crouch multiplier 0.70, vertical speed 15.5, horizontal speed 11, horizontal minimum scalar 0.25→25%. https://pubg.gs/weapons/rpd/
- G18C's in-game data calls the gun **P18C** (Blueprint WeapG18, weapon tag G18). Added vertical speed 15, horizontal speed 12, horizontal min scalar 0.15→15%. https://pubg.gs/weapons/p18c/
- Leave *unknown* horizontal tendency, direction and full spray paths blank: no observed curve is claimed from these static values.

### Attachments

- Source: https://pubg.gs/attachments/ with class-specific, game-tooltip descriptions and slot-tag compatibility.
- Compensator AR/DMR/S12K = +15% vertical/+10% horizontal control; SMG = +25%/+20%; DMR/SR = +20%/+20%. Calculator uses weapon-class choice for a simplified representative compensator rather than treating all three as identical.
- Vertical Foregrip +15% vertical; Thumbgrip +10% vertical and +10% post-single-shot recovery; Halfgrip +8% vertical/+16% horizontal/+10% recovery; Lightweight +20% single-shot recovery; Tactical Stock +5% single-shot recovery; Heavy Stock +10% vertical/+10% horizontal/+5% recovery.
- Laser Sight affects hip-fire accuracy, **not recoil**; suppressors likewise have no verified recoil-control bonus. Flash Hiders contribute +10% horizontal/+10% vertical on the classes shown in the 43.2 attachment table.
- Replaced many broad class defaults for foregrip support using the source's weapon-specific slot tags. For example, AKM and Groza don't gain an imaginary foregrip; O12 and G18C/P18C do receive actual foregrip choices.
- QuickDraw Mag +60% reload **speed** translates to ×1/1.6 reload **duration**, and Extended QuickDraw +15% speed to ×1/1.15; don't confuse percentage speed increase with the same percentage time reduction. The toolkit's baseline gun reload times and older approximated extended magazine capacities remain separate caveats.
- Remaining unresolved: differences among multiple compensator families compatible with a single DMR; exact per-weapon extended capacities; shotgun choke/duckbill and folding/cheek-pad stocks; stacked modifier interactions. These are not all simulated in the simplified attachment calculator.

### Deliberate non-changes

- Do **not** replace published base weapon damage with pubg.gs's top-level headline damage: e.g. RPD has headline 67 versus 43 projectile hit damage.
- Do **not** add made-up bullet drop to the missing 24 recorded-drop weapons.
- Do **not** make RPD 3.5-second no-animation reload field a confirmed real reload animation.
- Full per-shot recoil and observed shotgun pellet-hit counts remain unverified.
- Remaining attachment and magazine approximations are tracked in `docs/missing-data-source-audit-2026-10-24.md`.

## October 2026 — Scope Sensitivity Matcher as the default

- Scope Sensitivity Matcher is the site's **first and default tool**. Combat Database is second in the sidebar.
- Within the Sensitivity page, Scope Sensitivity Matcher is tab **01**, Vertical Multiplier tab **02**, and Resolution tab **03**.
- The original empirical sensitivity formulas, scope constants and conversion functions remain unchanged. This ordering update is presentation-only for those calculations.
- Owner-created and empirically calibrated formulas are **permitted** without requiring official KRAFTON verification. Keep their logic and any assumptions in GitHub rather than making the public app a wall of citations.
- Previous language below is preserved as historical material, not an overriding ban on developer-authored calculators.

## Update — 24 October 2026: theoretical shotgun HTK restored

- The Effective Range and point-blank TTK panels now calculate a **best-case minimum shell count if all pellets hit the selected hitbox**. This uses per-pellet sampled damage, pellet count, existing hitbox/class/armour factors and a 100 HP target; source distance limits are unchanged.
- This is an idealized calculation, **not a verified expectation for actual shotgun fights**. Hit probability, spread and pellet geometry remain unknown; actual kill times are not calculated. The public site displays only a short clarification while full methodology stays in GitHub.
- The Sawn-off pellet count was corrected from 8 to 9 based on PUBG PC Update 4.3 patch notes, which explicitly changed it from 8 to 9: https://store.steampowered.com/news/posts/?appids=578080&enddate=1565443536
- There is conflicting community data: https://www.pubgsearch.com/weapons/sawed-off still says 8 whereas https://pubg.gs/weapons/sawed-off says 9. Because these independent sources disagree on current stats, the corrected 9-pellet count is grounded in the official historical update, **not a new current-patch extraction**. Reverify with datamined or live current-patch data before claiming more precision.
- Source per-pellet tables are maintained without any interpolated or post-cutoff extensions. The archived historical notes below are intentionally unchanged and may describe a previous version of the on-site UI.

## Source and patch notes (from the retired Data & Patch tab)

### Version

v1.4 — weapon/armor data from the original supplied dataset, cross-checked and extended against official PUBG patch notes and pubgstatistics.com

### Game & patch

PUBG: BATTLEGROUNDS, PC/console. Checked against Update 43.1 (2026-09-09) and the two patches before it (42.3, 41.1). Anything later than 43.1 hasn't been checked.

### Last opened

_Previously populated with the viewer's last-opened date; no static value._

### What this is

A reference built from a fixed dataset plus the patch notes and community tables cited below — not a live simulator. Treat every number as a snapshot, not a guarantee of the current patch.

### Sources

Base weapon stats (damage, RPM, velocity, magazine, recoil pattern, reload time) for the original 44 weapons: the supplied weapon dataset.

Damage falloff by distance: exact tables for 41 of 45 weapons plus per-pellet tables for the four pellet shotguns (DBS, S686, S12K, Sawn-off), all sourced from pubgstatistics.com and checked against patch 43.2 on 2026-10-22. Its measured ranges are finite (e.g. S12K to 70m, Sawn-off to 50m); the site states damage beyond them is unknown, and this toolkit does not extrapolate or retain the last measured damage.

Hit-area and per-class damage multipliers, all 13 body parts, by weapon class: pubgstatistics.com, cross-checked against several weapons' published damage tables.

Armor reduction (30/40/55% for L1/L2/L3): PUBG wiki/community guides. Only Level 3 helmets reduce face-shot damage.

Attachment modifiers, RPD, LMG rebalance, Tilted Grip, Half Grip, Angled Foregrip, Jammer Pack: official PUBG patch notes (pubg.com/en/news — 42.3, 41.1, 43.1).

Backpack and item weights: PUBG wiki, pubgmap.io, and community capacity lists.

Bullet drop and holdover (21 weapons): winnermeta.win real-match telemetry, currently in beta; values are estimated from measured flight time and drift a few percent between 14-day sampling windows.

Historical shotgun spread angles were once taken from a 2018 pubgmap.io build; they are not verified for the current patch and are no longer used to calculate hits, damage or TTK.

### Patch changes reflected here

**42.3** — RPD added (7.62mm LMG, 43 dmg, 750 RPM, 735 m/s, 50-round mag expandable to 110; no muzzle or foregrip; accepts AR/LMG mags and stocks; up to 6x scope). LMG reload times −25%, LMG max horizontal recoil −30% (M249, MG3, RPD).

**41.1** — Tilted Grip added (+12% vertical / +6% horizontal recoil control, +25% camera-shake control — shown as a note only, not modeled numerically). Angled Foregrip removed from world spawn, its role folded into Half Grip (now +16% horizontal, up from +8%). Jammer Pack: 3 tiers at 150/200/250 capacity with Low/Medium/High Blue Zone protection.

**43.1** — Exact firing-position recoil-control figures for RPD (standing −10%, crouching −17%, prone −27%), M249 (crouching −17%, prone −27%), and MG3 (standing −15%, crouching −17%), shown as a note in the Recoil Analyzer. Also adjusted LMG ADS speed and vehicle-damage multipliers — not modeled here.

### Shotguns

The range tool shows measured base damage **per pellet** for DBS, S686, S12K and Sawn-off, only at the source's published distance checkpoints. Measurement ends at DBS 70m, S686 80m, S12K 70m and Sawn-off 50m. Source data beyond those limits is unknown, not zero and not a flat continuation. Actual damage to a player, pellet impacts, hip-fire/ADS hit fractions, hits-to-kill and time-to-kill cannot be supported from per-pellet damage alone; the previous legacy-spread calculation has been removed from the effective-range results. O12 fires a slug and uses its measured single-projectile points (2–50m).

### Bullet drop

Bullet drop is displayed only at explicitly provided WinnerMeta telemetry checkpoints for weapons that have them. At other distances, including past the last checkpoint, the tool displays No data rather than a power-law interpolation or flat continuation. Muzzle velocity by itself cannot establish actual flight time as the projectile slows; no estimated flight times are displayed.

### Known limitation

The measured falloff tables provide discrete checkpoints, not a continuous verified curve. Only isolated measurement markers are plotted; no damage line or intermediate values are asserted between source checkpoints. Player damage for pellet shotguns cannot be calculated without reliable pellet-impact evidence, so the tool does not provide one.

### Known gaps

- The Effective Range panel shows only source-published damage checkpoints. Distances outside each weapon’s table and distances without a published sample are No data, not inferred.

- RPD has no published recoil-pattern data; the Recoil Analyzer shows it as incomplete rather than guessing. G18C is missing its recovery-speed and minimum-horizontal% figures for the same reason.

- RPD's reload time (3.5s) is this toolkit's own placeholder — it wasn't in the original dataset like every other weapon's reload time is.

- Attachment slot access is assigned by weapon class plus named exceptions (AKM has no grip/stock; RPD has no muzzle/grip); weapons not individually named follow the class default rather than being verified one by one. Sights aren't modeled as a slot.

- Attachment recoil/reload modifiers not tied to a specific patch note above are approximate community figures and may drift from the current patch.

- Magazine capacities use exact figures where supplied (Vector, UMP, MP5K, Micro Uzi, pistols, RPD); everything else is a generic +30% (AR/DMR/S12K, SMG/Pistol) or +5 rounds (DMR/SR) approximation.

- Frag grenade and Molotov weights are listed as either 16 or 18 depending on the source; this toolkit uses 18 for both.

## Other research notes moved out of the visible tool

### Original Combat DB footer

Source: supplied weapon DataAssets/BallisticData and manually computed armor crossover tables. Not a PUBG game engine simulation.

### Effective Range

- Measured damage falloff came from the published checkpoints on **pubgstatistics.com**, with strict source limits. No unsampled damage or shotgun pellet-hit totals should be fabricated.
- Bullet-drop checkpoints were sourced from WinnerMeta beta telemetry, which may change between sampling windows. Unrecorded distances show **No data**.
- Base pellet damage is **per pellet**, not real damage to a player. See the data accuracy policy for shotgun measurement limits.

### Recoil

- Earlier universal 5%-per-shot recoil growth was removed as unsupported. The tool shows provided weapon-level fields only, with unknown shot-by-shot paths.
- LMG recoil peak/recovery context: https://pubg.com/en/news/10874
- SLR early/middle recoil context: https://pubg.com/en/news/10179
- MP5K gradual recoil context: https://pubg.com/en-asia/news/7424
- Evidence does not establish universal recoil jumps at exactly bullet 10, 20 and 30.

### Attachment and loadout calculations

- The tool's attachment slot matrix is based on class defaults and explicit exceptions; this is not an individually verified compatibility list for every weapon.
- Several attachment modifiers and magazine extension capacities are estimates and require revalidation for the latest patch.
- The RPD reload value in the supplied weapon dataset was a placeholder; don't silently present it as measured.
- Jammer Pack levels are mapped to low/medium/high protection without claiming an exact Blue Zone absorption percentage.
- Original Frag/Molotov item weights were taken as 18 despite some community references listing 16.

## Research URLs

- https://pubg.com/en/news/10874
- https://pubg.com/en/news/10179
- https://pubg.com/en-asia/news/7424
- https://pubgstatistics.com/weapons
- https://winnermeta.win

## Original Data & Patch HTML (full archival copy)

The block below is retained verbatim to avoid losing any original wording and for future audit/comparison. **It is not injected into the live website.**

```html
<!-- ================= DATA & PATCH INFO ================= -->
<div id="panel-data" class="hub-main">
<div class="wrap">
  <div class="eyebrow">Reference · Version &amp; Sources</div>
  <h1>Data &amp; Patch Info</h1>
  <p class="sub">What this toolkit is, what it isn't, and where every number in it comes from.</p>

  <div class="card">
    <dl class="datalist">
      <dt>Version</dt>
      <dd id="dp_version">v1.4 — weapon/armor data from the original supplied dataset, cross-checked and extended against official PUBG patch notes and pubgstatistics.com</dd>
      <dt>Game &amp; patch</dt>
      <dd>PUBG: BATTLEGROUNDS, PC/console. Checked against Update 43.1 (2026-09-09) and the two patches before it (42.3, 41.1). Anything later than 43.1 hasn't been checked.</dd>
      <dt>Last opened</dt>
      <dd id="dp_updated"></dd>
      <dt>What this is</dt>
      <dd>A reference built from a fixed dataset plus the patch notes and community tables cited below — not a live simulator. Treat every number as a snapshot, not a guarantee of the current patch.</dd>
      <dt>Sources</dt>
      <dd>
        Base weapon stats (damage, RPM, velocity, magazine, recoil pattern, reload time) for the original 44 weapons: the supplied weapon dataset.<br>
        Damage falloff by distance: exact tables for 41 of 45 weapons plus per-pellet tables for the four pellet shotguns (DBS, S686, S12K, Sawn-off), all sourced from pubgstatistics.com and checked against patch 43.2 on 2026-10-22. Its measured ranges are finite (e.g. S12K to 70m, Sawn-off to 50m); the site states damage beyond them is unknown, and this toolkit does not extrapolate or retain the last measured damage.<br>
        Hit-area and per-class damage multipliers, all 13 body parts, by weapon class: pubgstatistics.com, cross-checked against several weapons' published damage tables.<br>
        Armor reduction (30/40/55% for L1/L2/L3): PUBG wiki/community guides. Only Level 3 helmets reduce face-shot damage.<br>
        Attachment modifiers, RPD, LMG rebalance, Tilted Grip, Half Grip, Angled Foregrip, Jammer Pack: official PUBG patch notes (pubg.com/en/news — 42.3, 41.1, 43.1).<br>
        Backpack and item weights: PUBG wiki, pubgmap.io, and community capacity lists.<br>
        Bullet drop and holdover (21 weapons): winnermeta.win real-match telemetry, currently in beta; values are estimated from measured flight time and drift a few percent between 14-day sampling windows.<br>
        Historical shotgun spread angles were once taken from a 2018 pubgmap.io build; they are not verified for the current patch and are no longer used to calculate hits, damage or TTK.
      </dd>
      <dt>Patch changes reflected here</dt>
      <dd>
        <b>42.3</b> — RPD added (7.62mm LMG, 43 dmg, 750 RPM, 735 m/s, 50-round mag expandable to 110; no muzzle or foregrip; accepts AR/LMG mags and stocks; up to 6x scope). LMG reload times −25%, LMG max horizontal recoil −30% (M249, MG3, RPD).<br>
        <b>41.1</b> — Tilted Grip added (+12% vertical / +6% horizontal recoil control, +25% camera-shake control — shown as a note only, not modeled numerically). Angled Foregrip removed from world spawn, its role folded into Half Grip (now +16% horizontal, up from +8%). Jammer Pack: 3 tiers at 150/200/250 capacity with Low/Medium/High Blue Zone protection.<br>
        <b>43.1</b> — Exact firing-position recoil-control figures for RPD (standing −10%, crouching −17%, prone −27%), M249 (crouching −17%, prone −27%), and MG3 (standing −15%, crouching −17%), shown as a note in the Recoil Analyzer. Also adjusted LMG ADS speed and vehicle-damage multipliers — not modeled here.
      </dd>
      <dt>Shotguns</dt>
      <dd>The range tool shows measured base damage <b>per pellet</b> for DBS, S686, S12K and Sawn-off, only at the source's published distance checkpoints. Measurement ends at DBS 70m, S686 80m, S12K 70m and Sawn-off 50m. Source data beyond those limits is unknown, not zero and not a flat continuation. Actual damage to a player, pellet impacts, hip-fire/ADS hit fractions, hits-to-kill and time-to-kill cannot be supported from per-pellet damage alone; the previous legacy-spread calculation has been removed from the effective-range results. O12 fires a slug and uses its measured single-projectile points (2–50m).</dd>
      <dt>Bullet drop</dt>
      <dd>Bullet drop is displayed only at explicitly provided WinnerMeta telemetry checkpoints for weapons that have them. At other distances, including past the last checkpoint, the tool displays No data rather than a power-law interpolation or flat continuation. Muzzle velocity by itself cannot establish actual flight time as the projectile slows; no estimated flight times are displayed.</dd>
      <dt>Known limitation</dt>
      <dd>The measured falloff tables provide discrete checkpoints, not a continuous verified curve. Only isolated measurement markers are plotted; no damage line or intermediate values are asserted between source checkpoints. Player damage for pellet shotguns cannot be calculated without reliable pellet-impact evidence, so the tool does not provide one.</dd>
      <dt>Known gaps</dt>
      <dd>
        <ul class="gaps">
          <li>The Effective Range panel shows only source-published damage checkpoints. Distances outside each weapon’s table and distances without a published sample are No data, not inferred.</li>
          <li>RPD has no published recoil-pattern data; the Recoil Analyzer shows it as incomplete rather than guessing. G18C is missing its recovery-speed and minimum-horizontal% figures for the same reason.</li>
          <li>RPD's reload time (3.5s) is this toolkit's own placeholder — it wasn't in the original dataset like every other weapon's reload time is.</li>
          <li>Attachment slot access is assigned by weapon class plus named exceptions (AKM has no grip/stock; RPD has no muzzle/grip); weapons not individually named follow the class default rather than being verified one by one. Sights aren't modeled as a slot.</li>
          <li>Attachment recoil/reload modifiers not tied to a specific patch note above are approximate community figures and may drift from the current patch.</li>
          <li>Magazine capacities use exact figures where supplied (Vector, UMP, MP5K, Micro Uzi, pistols, RPD); everything else is a generic +30% (AR/DMR/S12K, SMG/Pistol) or +5 rounds (DMR/SR) approximation.</li>
          <li>Frag grenade and Molotov weights are listed as either 16 or 18 depending on the source; this toolkit uses 18 for both.</li>
        </ul>
      </dd>
    </dl>
  </div>
</div>
</div>

```


## Additional developer notes removed from the visible interface

### Sensitivity scope matching

The original sensitivity UI displayed this empirical conversion model:

- \`pixel_speed = 3840 × (C + B) / ((A/60) × (10 + B))\`
- \`C = (A/60) × (10 + B) × pixel_speed / 3840 − B\`
- A/B are scope-specific empirical constants, **not officially documented engine constants**.
- “Out of range” means the chosen scope cannot match the target turn rate within the game's available slider settings.
- The original UI attributed the logic to “HELP clan manual v1.0,” stated the interactive build was assembled by Claude, and noted that the tool was not an official KRAFTON/PUBG product. That credit has been archived rather than displayed next to controls.

### Combat database caveats

- Armor crossover calculations are based on provided data rather than live match telemetry.
- Head/chest values are source base damage multiplied by hit-area/class factors; these are calculated figures.
- “Always keep” means that, within the supplied rows, fresh lower-tier armor did not beat the higher tier.
- Shotguns without supplied armor crossover figures are deliberately omitted rather than guessed.
- G18C has missing recoil recovery/minimum-horizontal fields.
- Earlier on-screen text reminded users that armor crossovers are point-blank calculations; that caution is now condensed to a one-line reminder.

### Range and TTK generated explanations

- Range damage was restricted to actual published checkpoints. Previously the UI displayed the exact website name, limits, explanatory mathematics and separate source-status cards every time an input changed. Those details are retained here and in the accuracy policy; only the available distance and meaningful “No data” messages remain visible.
- WinnerMeta gravity-drop data is beta telemetry, not directly measured in-game scope holdover. The mrad value displayed in the tool is calculated from the recorded drop and range.
- Shotgun pellet count does not establish hits-to-kill or time-to-kill. Without measured pellet impacts those values remain unavailable.
- The RPD reload duration is a placeholder and must not be described as sourced.

### Attachment and backpack UI notes

- Toolkit slot access is a combination of weapon-class rules and exceptions, not a fully validated per-weapon inventory.
- Modifier percentages should not be described as official without a matching patch note. The interface retains the short warning “Attachment percentages are estimates.”
- Angled Foregrip was removed from normal world loot in Update 41.1; its earlier modifier remains in the calculator's historical data. The update-history text was removed from the user-facing selector.
- Tilted Grip, Half Grip, LMG recoil/reload balancing and Jammer Pack development history remain in the archived Data & Patch section above.
- Jammer Pack protection is a qualitative Low/Medium/High level, not an exact damage-absorption percentage.
- Original visible note about uncertain Frag/Molotov weight values (16 or 18 in various community lists) moved here; the calculator still uses 18.

