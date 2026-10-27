// Photo/overlay invariants. Arithmetic source and controls must be untouched.
'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const markup=read('src/explorer/hit-zone-explorer.fragment.html');
const live=read('index.html');
const css=read('src/explorer/hit-zone-explorer.scaffold.css');
const asset=path.join(root,'assets/hit-zone-model-2.webp');
test('photographic model is shipped as a small valid WebP with alpha',()=>{
  assert.ok(fs.existsSync(asset),'missing image');
  const bytes=fs.readFileSync(asset);
  assert.equal(bytes.subarray(0,4).toString(),'RIFF');
  assert.equal(bytes.subarray(8,12).toString(),'WEBP');
  assert.ok(bytes.length<150_000,'keep main image under 150 KB');
  assert.equal(bytes.subarray(12,16).toString(),'VP8X','extended WebP required for alpha check');
  assert.ok((bytes[20] & 0x10)!==0,'photo must declare transparency in VP8X header');
  const imageWidth=bytes.readUIntLE(24,3)+1;
  const imageHeight=bytes.readUIntLE(27,3)+1;
  assert.deepEqual([imageWidth,imageHeight],[500,750],'photo dimensions must match SVG coordinate mapping');
});
test('photo is beneath all 13 transparent focusable hit zone paths in both sources',()=>{
  assert.equal(live.match(/<svg id="hz_body"[\s\S]*?<\/svg>/)[0],markup.match(/<svg id="hz_body"[\s\S]*?<\/svg>/)[0],'Model 2 geometry must match the canonical fragment');
  const photo=markup.indexOf('class="hz-photo"');
  const region=markup.indexOf('data-hit-zone="head"');
  assert.ok(photo>0&&region>photo);
  assert.match(markup,/href="\/assets\/hit-zone-model-2\.webp"/);
  assert.equal((markup.match(/data-hit-zone="/g)||[]).length,13);
  assert.equal((markup.match(/data-hz-value="/g)||[]).length,13);
  assert.match(css,/\.hz-photo \{ pointer-events:none/);
  assert.equal((markup.match(/data-armour="(?:helmet|vest)"/g)||[]).length,2);
});
