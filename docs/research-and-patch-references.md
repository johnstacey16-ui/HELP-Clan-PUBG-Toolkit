# HELP Clan — research, version and source references

**Internal project notes — not part of the public toolkit UI.**

This document replaces the previous “Data & Patch” tool tab. It preserves the research notes, patch history, provenance and outstanding accuracy issues in the repository, rather than displaying a documentation page to players. The original panel was archived here on 24 October 2026. Some older statements may be stale; re-verify them before making new accuracy claims.

For the no-assumptions policy, also see [DATA_ACCURACY_POLICY.md](../DATA_ACCURACY_POLICY.md).

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

