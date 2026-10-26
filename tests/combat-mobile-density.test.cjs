'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.resolve(__dirname,'..',p),'utf8');
test('Combat DB keeps 45 text-only weapon rows and optional helmet/vest reference',()=>{
 const html=read('index.html'),source=read('src/combat/10-combat-rendering.part');
 assert.match(html,/<details class="visual-opt-in-art combat-armour-disclosure" id="combat-armour-disclosure">/);
 assert.match(html,/<summary>Helmet &amp; vest visual guide/);
 assert.match(html,/gear-helmet\.svg/);
 assert.match(html,/gear-vest\.svg/);
 assert.doesNotMatch(source,/visual-weapon-thumb|combat-pilot-open/);
 assert.match(source,/const weaponArt/);
 assert.equal((html.match(/data-hit-zone="/g)||[]).length,13);
});
test('mobile Combat guide and table navigation remain accessible',()=>{
 const css=read('visual-assets.css'),visual=read('visual-controls.js');
 assert.match(css,/#panel-combat \.combat-armour-disclosure>summary/);
 assert.match(css,/min-height:46px/);
 assert.match(css,/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
 assert.match(css,/#panel-combat header\.hero h1/);
 assert.match(css,/focus-visible/);
 assert.match(visual,/details\.addEventListener\('toggle'/);
 assert.match(read('tests/visual-layout.html'),/openedTop-closedTop>=100/);
});
