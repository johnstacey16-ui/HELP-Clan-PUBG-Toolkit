// Source and markup invariants for the first Combat DB weapon-image pilot.
'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const source=read('src/combat/10-combat-rendering.part');
const html=read('index.html');
const style=read('visual-assets.css');
test('original M416 artwork is shipped locally with responsive assets',()=>{
  assert.ok(fs.existsSync(path.join(root,'assets/weapon-m416-field.svg')));
  assert.match(html,/href="visual-assets\.css"/);
  assert.match(style,/\.visual-media-card/);
  assert.match(style,/@media\(max-width:700px\)/);
  assert.doesNotMatch(style,/position:fixed|position:absolute/i);
});
test('only M416 uses the illustration; all other weapon details get an explicit fallback',()=>{
  assert.match(source,/id="combat-pilot-image" src="assets\/weapon-m416-field\.svg"/);
  assert.match(source,/loading="lazy" decoding="async"/);
  assert.match(source,/id="combat-pilot-open"/);
  assert.match(source,/w\.name === "M416"/);
  assert.match(source,/Artwork not available for this weapon yet/);
  assert.match(source,/const weaponArt/);
  assert.match(source,/\$\{weaponArt\}/);
  assert.match(source,/combat-pilot-image"\)\.addEventListener\("error"/);
});
test('numeric weapon data and all 13 hit zones retain their existing source boundaries',()=>{
  assert.match(html,/id="panel-combat"/);
  assert.match(html,/id="panel-hit-zone"/);
  assert.equal((html.match(/data-hit-zone="/g)||[]).length,13);
  assert.ok(!source.includes('updateDamageModel'));
  assert.match(read('src/explorer/hit-zone-explorer.fragment.html'),/hit-zone-model-2\.webp/);
});
